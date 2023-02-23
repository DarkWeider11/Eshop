from rest_framework import serializers
from payments import models
from users import serializers as user_serializers
from cart import serializers as cart_serializers

class PaymentSerializer(serializers.ModelSerializer):
    
    user_id = user_serializers.UserSerializer
    cart_id = cart_serializers.CartSerializer
    
    class Meta:
        model = models.Payment
        fields = ['user_id', 'amount', 'receipt_email', 'created', 'cart_id']
        extra_kwargs = {'receipt_email': {'read_only': True}}
