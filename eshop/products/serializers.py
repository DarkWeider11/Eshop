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



class ImagesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Images
        fields = '__all__'
          

class ProdusSerializer(serializers.ModelSerializer):
    
    subcategoriestype = SubCategoriesTypeSerializer(read_only=True)
    
    images = ImagesSerializer(many=True, read_only=True)
    
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000, allow_empty_file = False, use_url = False), 
        write_only = True )

    class Meta:
        model = models.Produs
        fields = '__all__'
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        produs = models.Produs.objects.create(**validated_data)
        for image in uploaded_images:
   
            models.Images.objects.create(produs=produs, image=image)
        return produs


# to reprezentation 
