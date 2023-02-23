from rest_framework import generics, response
from users import models, serializers
from helpers import permissions as helper_permissions


class AdminUserListView(generics.ListCreateAPIView):
    
    serializer_class = serializers.UserSerializer
    queryset = models.Users.objects.all()
    queryset = models.UserToken.objects.all()
    permission_classes = [helper_permissions.IsSuperAdmin]
    authentication_classes = [models.TokenAuthentication]

    def get_queryset(self):
        breakpoint()
        users_count = models.Users.objects.all().count()
        is_superuser = models.Users.objects.filter(is_superuser=True).count()
        is_online = models.UserToken.objects.filter(logout_time=None).count()


class AdminUserDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer


class AdminAddressListView(generics.ListCreateAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer


class AdminAddressDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer





