from django.db import models
from users.models import Users



class Cart(models.Model):
    
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    produs = models.JSONField()
    
    
class PaymentCart(models.Model):
    
    SelfPickUp = 0
    Delivery = 1

    Store_Pickup_CHOICES = [
        (SelfPickUp, 'SelfPickUp'),
        (Delivery, 'Delivery'),
    ]
    
    Cash = 0
    Card = 1

    Payment_CHOICES = [
        (Cash, 'Cash'),
        (Card, 'Card'),
    ]
    
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)
    payment = models.IntegerField(choices=Payment_CHOICES, default=0)
    delivery = models.IntegerField(choices=Store_Pickup_CHOICES, default=0)
    
    