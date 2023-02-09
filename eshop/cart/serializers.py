from users.serializers import UserSerializer
from rest_framework import serializers
from cart import models 


class  CartSerializer(serializers.ModelSerializer):
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = models.Cart
        fields = '__all__'
        
       
    def create(self, validated_data):
        validated_data['user_id'] = self.initial_data.get('user_id')
        return models.Cart.objects.create(**validated_data)
        
    
class  PaymentCartSerializer(serializers.ModelSerializer):
    
    cart = CartSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = models.PaymentCart
        fields = '__all__'
        
        
    def create(self, validated_data):
        validated_data['cart_id'] = self.initial_data.get('cart_id')
        validated_data['user_id'] = self.initial_data.get('user_id')
        return models.PaymentCart.objects.create(**validated_data)