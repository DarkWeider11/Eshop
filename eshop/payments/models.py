from django.db import models
from cart.models import Cart
from users import models as user_models

class Payment(models.Model):
    
    user = models.ForeignKey(user_models.Users, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    receipt_email = models.EmailField()
    unit_amount = models.IntegerField(null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    payment_method = models.CharField(blank=True, max_length=255)
