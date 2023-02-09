from rest_framework import generics
from users import models, serializers



class UserList(generics.ListCreateAPIView):
    
    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer
    
    
class UserDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer
    
   
class AddressList(generics.ListCreateAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer
    
    
class ProfilesList(generics.ListCreateAPIView):
    
    queryset = models.Profiles.objects.all()
    serializer_class = serializers.ProfilesSerializer
