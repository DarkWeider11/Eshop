from rest_framework import generics, response, status
from authen import serializers
from rest_framework import decorators
from users import models
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import random
import string
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime



class RegisterView(generics.CreateAPIView):

    serializer_class = serializers.RegisterSerializer


@decorators.api_view(['POST'])
def login_view(request):

#verificarea email si parola
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        user = models.Users.objects.get(email=request.data['email'])
    except models.Users.DoesNotExist:
        msg = {'User does not exist'}
        return response.Response(msg, status=status.HTTP_404_NOT_FOUND)
    if user.check_password(request.data['password']) is False:
        msg = {'Wrong password'}
        return response.Response(msg, status=status.HTTP_400_BAD_REQUEST)

#generarea token
    token = RefreshToken.for_user(user) 
    try:
        user_token, _ = models.UserToken.objects.get_or_create(
            user_id=user.pk,
            access_token=str(token.access_token),
            refresh_token=str(token),
            created=datetime.now()
            )
    except models.UserToken.DoesNotExist: 
        msg = {'No tokens were created for user'} 
        return response.Response(msg ,status.HTTP_404_NOT_FOUND) 

    user.last_login = datetime.now() 
    user.save(update_fields=['last_login'])
    data = {
        'user_id': user.pk,
        'username': user.username,
        'access_token': user_token.access_token
    }
    msg = {'Successfully login'}
    return response.Response(data=data, status=status.HTTP_200_OK)



@decorators.api_view(['POST'])
@decorators.authentication_classes([SessionAuthentication, BasicAuthentication])
def logout_view(request):
    user_id = request.data.get('user_id')
    if user_id is None:
        return response.Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_token = models.UserToken.objects.filter(user_id=user_id).first()
    if user_token is None:
        return response.Response({'error': 'user_token not found'}, status=status.HTTP_404_NOT_FOUND)
    
    user_token.access_token = None
    user_token.refresh_token = None
    user_token.created = datetime.now()
    user_token.save()
    
    return response.Response({'message': 'logged out successfully'}, status=status.HTTP_200_OK)

# @decorators.api_view(['POST'])
# @decorators.authentication_classes([SessionAuthentication, BasicAuthentication])
# def logout_view(request):
#     msg = {'Logout successfully'}
#     return response.Response(msg, status=status.HTTP_204_NO_CONTENT)





@decorators.api_view(['POST'])
def reset_password(request):
    email = request.data['email']
    try:
        user = models.Users.objects.get(email=email)
    except models.Users.DoesNotExist:
         return response.Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if models.Users.objects.filter(email=email).exists():
        characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choice(characters) for i in range(8))
        user.set_password(password)
        user.save()
        send_mail(
          'reset_password',
          f'You can find your password here:  {password}',
          'admin@admin.com',
          [email],
        )
        return response.Response({'message': 'Password reset email sent successfully'}, status=status.HTTP_200_OK)

