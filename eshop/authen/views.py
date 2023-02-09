from rest_framework import generics, response, status
from authen import serializers
from rest_framework import decorators
from users import models
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import random
import string
from django.core.mail import send_mail


class RegisterView(generics.CreateAPIView):

    serializer_class = serializers.RegisterSerializer


@decorators.api_view(['POST'])
def login_view(request):

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
    token = Token.objects.create(user_id=user.pk)
    data = {
        'user_id': user.pk,
        'username': user.username,
        'token': token.key
    }
    msg = {'Successfully login'}
    return response.Response(data=data, status=status.HTTP_200_OK)





@decorators.api_view(['POST'])
@decorators.authentication_classes([SessionAuthentication, BasicAuthentication])
def logout_view(request):
    msg = {'Logout successfully'}
    breakpoint()
    return response.Response(msg, status=status.HTTP_204_NO_CONTENT)


@decorators.api_view(['POST'])
def reset_password(request):
    email = request.data['email']
    try:
        user = models.Users.objects.get(email=email)
    except models.Users.DoesNotExist:
        msg = {'User does not exist'}
        return response.Response(msg, status=status.HTTP_404_NOT_FOUND)
    if models.Users.objects.filter(email=email).exists():
        characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choice(characters) for i in range(8))
        password.set_password = password
        password.save()
        send_mail(
          'reset_password',
          f'You can find your password here:  {password}',
          'admin@admin.com',
          [email],
        )
        msg={'Email Sent Successfully'}
        return response.Response(msg, status=status.HTTP_200_OK)

