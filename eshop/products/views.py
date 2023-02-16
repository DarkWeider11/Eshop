from rest_framework import generics, status
from products import models, serializers
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response

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
        

class SearchView(APIView):
    serializer_classes = {
        'categories': serializers.CategoriesSerializer,
        'subcategories': serializers.SubCategoriesSerializer,
        'subcategoriestype': serializers.SubCategoriesTypeSerializer,
        'produs': serializers.ProdusSerializer,
    }
    model_classes = {
        'categories': models.Categories,
        'subcategories': models.SubCategories,
        'subcategoriestype': models.SubCategoriesType,
        'produs': models.Produs,
    }

    def get(self, request, format=None):
        search_query = request.query_params.get('q', '').strip()
        # strip() este utilizat pentru a elimina orice spații albe de la începutul sau sfârșitul acestui șir.
        queryset = None
        # actualizată mai târziu pentru a stoca rezultatele căutării.
        results = {}
        # un dicționar gol care va fi populat cu rezultatele căutării și returnat mai târziu ca răspuns la cerere.
        
        # search in Categories
        serializer_class = self.serializer_classes['categories']
        model_class = self.model_classes['categories']
        queryset = model_class.objects.filter(type_categories__icontains=search_query)
        results['categories'] = serializer_class(queryset, many=True).data

        # search in SubCategories
        serializer_class = self.serializer_classes['subcategories']
        model_class = self.model_classes['subcategories']
        queryset = model_class.objects.filter(type_subcategory__icontains=search_query)
        results['subcategories'] = serializer_class(queryset, many=True).data

        # search in SubCategoriesType
        serializer_class = self.serializer_classes['subcategoriestype']
        model_class = self.model_classes['subcategoriestype']
        queryset = model_class.objects.filter(type_category__icontains=search_query)
        results['subcategoriestype'] = serializer_class(queryset, many=True).data

        # search in Produs
        serializer_class = self.serializer_classes['produs']
        model_class = self.model_classes['produs']
        queryset = model_class.objects.filter(nume__icontains=search_query) | \
                   model_class.objects.filter(manufacturer__icontains=search_query) | \
                   model_class.objects.filter(product_description__icontains=search_query)
        results['produs'] = serializer_class(queryset, many=True).data

        return Response(results, status=status.HTTP_200_OK)


class ProdusList(generics.ListCreateAPIView):
    
    queryset = models.Produs.objects.all()
    serializer_class = serializers.ProdusSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProdusFilter
    
class CategoriesList(generics.ListCreateAPIView):
    
    queryset = models.Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    
class SubCategoriesList(generics.ListCreateAPIView):
    
    queryset = models.SubCategories.objects.all()
    serializer_class = serializers.SubCategoriesSerializer
  
class SubCategoriesTypeList(generics.ListCreateAPIView):
    
    queryset = models.SubCategoriesType.objects.all()
    serializer_class = serializers.SubCategoriesTypeSerializer
    

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
    
 

