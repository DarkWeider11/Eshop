from rest_framework import generics 
from products import models, serializers
from django_filters import rest_framework as filters


class CategoriesList(generics.ListCreateAPIView):
    
    queryset = models.Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    
class SubCategoriesList(generics.ListCreateAPIView):
    
    queryset = models.SubCategories.objects.all()
    serializer_class = serializers.SubCategoriesSerializer
  
  
class SubCategoriesTypeList(generics.ListCreateAPIView):
    
    queryset = models.SubCategoriesType.objects.all()
    serializer_class = serializers.SubCategoriesTypeSerializer
    

class ProdusFilter(filters.FilterSet):
    
    class Meta:
        model = models.Produs
        fields =  {
            'nume': ['icontains'],
            # icontains, verifica numele dupa fiecare element din sirul de string
            'manufacturer': ['icontains'],
         'price': ['gte', 'lte'] 
         # 'gte' reprezintă „mai mare decât sau egal cu', si 'lte' reprezintă „mai mic sau egal cu'
        }

class ProdusList(generics.ListCreateAPIView):
    
    queryset = models.Produs.objects.all()
    serializer_class = serializers.ProdusSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProdusFilter

    
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
    
 

