from rest_framework import generics
from products import models, serializers



class CategoriesList(generics.ListCreateAPIView):
    
    queryset = models.Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    
class SubCategoriesList(generics.ListCreateAPIView):
    
    queryset = models.SubCategories.objects.all()
    serializer_class = serializers.SubCategoriesSerializer
  
  
class SubCategoriesTypeList(generics.ListCreateAPIView):
    
    queryset = models.SubCategoriesType.objects.all()
    serializer_class = serializers.SubCategoriesTypeSerializer
    
class ProdusList(generics.ListCreateAPIView):
    
    queryset = models.Produs.objects.all()
    serializer_class = serializers.ProdusSerializer
    
    
    
    
class ProdusListDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Produs.objects.all()
    serializer_class = serializers.ProdusSerializer

class CategoriesListDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    
class SubCategoriesListDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.SubCategories.objects.all()
    serializer_class = serializers.SubCategoriesSerializer
    
class SubCategoriesTypeListDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.SubCategoriesType.objects.all()
    serializer_class = serializers.SubCategoriesTypeSerializer