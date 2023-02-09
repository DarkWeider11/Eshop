from rest_framework import serializers
from products import models 


class  CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categories
        fields = '__all__'
        #fields = ['email', 'is_superuser']
   
class  SubCategoriesSerializer(serializers.ModelSerializer):
    
    categories = CategoriesSerializer(read_only=True)
    
    class Meta:
        model = models.SubCategories
        fields = '__all__'


class  SubCategoriesTypeSerializer(serializers.ModelSerializer):
    
    subcategories = SubCategoriesSerializer(read_only=True)
    
    class Meta:
        model = models.SubCategoriesType
        fields = '__all__'
          

class  ProdusSerializer(serializers.ModelSerializer):
    
    subcategoriestype = SubCategoriesTypeSerializer(read_only=True)
    
    class Meta:
        model = models.Produs
        fields = '__all__'