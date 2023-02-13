from rest_framework import serializers
from users import models


class RegisterSerializer(serializers.Serializer):

    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError('Your password does not match')
        elif len(attrs['password']) < 8:
            raise serializers.ValidationError('Your password is too short')
        elif len(attrs['password']) > 16:
            raise serializers.ValidationError('Your password is too long')
        return attrs

    def create(self, validated_data):
        validated_data['email'] = self.initial_data.get('email')
        validated_data.popitem()
        user = models.Users.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()
    

# class ChangePasswordSerializer(serializers.Serializer):

#     old_password = serializers.CharField(required=True)
#     password = serializers.CharField(required=True)
#     confirm_password = serializers.CharField(required=True)


#     def validate(self, attrs):

#         if not user.check_password(attrs):
#             raise serializers.ValidationError(('Your old password was entered incorrectly. Please enter it again.'))
#         if attrs['old_password'] == attrs['password']:
#             raise serializers.ValidationError('Your old password is match whith your current password')
#         if attrs['password'] != attrs['confirm_password']:
#             raise serializers.ValidationError('Your password does not match')
#         elif len(attrs['password']) < 8:
#             raise serializers.ValidationError('Your password is too short')
#         elif len(attrs['password']) > 16:
#             raise serializers.ValidationError('Your password is too long')
#         return attrs


#     def update(self, instance, validate_data):
#         user_data = validate_data.pop('user')
#         user = instance.user

#         instance.password = validate_data.get('password', instance.password)
#         instance.confirm_password = validate_data.get('confirm_password', instance.confirm_password)
#         instance.save()

#         return instance




