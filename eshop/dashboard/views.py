from rest_framework import generics
from users import models, serializers
from helpers import permissions as helper_permissions


class AdminUserListView(generics.ListCreateAPIView):
    
    
    serializer_class = serializers.UserSerializer
    # permission_classes = 
    authentication_classes = [models.TokenAuthentication]
    def get_queryset(self):
        
        users_count = models.Users
        return super().get_queryset()


class AdminUserDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer


class AdminAddressListView(generics.ListCreateAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer


class AdminAddressDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer





