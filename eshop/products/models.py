from django.db import models

    

class Categories(models.Model):
    
    type_categories = models.CharField(max_length=255)
    

class SubCategories(models.Model):
    
    type_subcategory = models.CharField(max_length=255)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    
    
class SubCategoriesType(models.Model):

    type_category = models.CharField(max_length=255, null=True)
    subcategory = models.ForeignKey(SubCategories, on_delete=models.CASCADE)


class Produs(models.Model):

    EUR = 0
    USD = 1
    MDL = 2

    CURRENCY_CHOICES = [
        (EUR, 'EUR'),
        (USD, 'USD'),
        (MDL, 'MDL'),
    ]
    
    nume = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=255)
    price = models.PositiveSmallIntegerField()
    product_description = models.JSONField(null=True)
    currency = models.IntegerField(choices=CURRENCY_CHOICES, default=MDL)
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(null=True)
    checkout = models.BooleanField(default=False)
    SubCategoriesType = models.ForeignKey(SubCategoriesType, on_delete= models.CASCADE)
    
    
class Images(models.Model):
    
    produs = models.ForeignKey(Produs,  on_delete=models.CASCADE, related_name = "images")
    image = models.ImageField(upload_to="media/products", max_length=100, null=True, default='')
    
    