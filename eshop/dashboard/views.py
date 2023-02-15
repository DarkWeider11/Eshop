from rest_framework import generics
from users import models, serializers
from helpers import permissions as helper_permissions


class AdminUserListView(generics.ListCreateAPIView):
    
    def count(request):
        users = request.data.get("users")
        users_id = []
        breakpoint()
        for user in users:
            users_id.append(user.get("id"))

        len_users = len(users_id)
        msg = {'cati utilizatori sau inregistrat:': len_users}
        return(msg)
    
    def anonymous(request):
        number_anonymoys_users = 0
        if request.user.is_anonymous:
            number_anonymoys_users=number_anonymoys_users+1
        return(number_anonymoys_users)

    

    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer
    

class AdminUserDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Users.objects.all()
    serializer_class = serializers.UserSerializer


class AdminAddressListView(generics.ListCreateAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer


class AdminAddressDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer





