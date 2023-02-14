from rest_framework import permissions
from users import models


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False


class IsAdmin(permissions.BasePermission):
   def has_permission(self, request, view):
        breakpoint()
        if request.user.is_superuser:
            return True
        return False










