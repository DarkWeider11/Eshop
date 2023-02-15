from rest_framework import permissions
from users import models


class BlockAnonymousUser(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False


class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superadmin:
            return True
        return False
