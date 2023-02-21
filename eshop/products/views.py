from rest_framework import generics, status
from products import models, serializers
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
import django_filters

class ProdusFilter(django_filters.FilterSet):
    
    # cautarea mai multe produse odata
    nume = django_filters.ChoiceFilter(choices=models.Produs.objects.order_by('nume').values_list('nume', 'nume').distinct())
    manufacturer = django_filters.ChoiceFilter(choices=models.Produs.objects.order_by('manufacturer').values_list('manufacturer', 'manufacturer').distinct())
    price = django_filters.RangeFilter()
    class Meta:
        model = models.Produs

        fields = ['nume', 'manufacturer', 'price']


        
# class SearchView(APIView):
#     serializer_classes = {
#         'categories': serializers.CategoriesSerializer,
#         'subcategories': serializers.SubCategoriesSerializer,
#         'subcategoriestype': serializers.SubCategoriesTypeSerializer,
#         'produs': serializers.ProdusSerializer,
#     }
#     model_classes = {
#         'categories': models.Categories,
#         'subcategories': models.SubCategories,
#         'subcategoriestype': models.SubCategoriesType,
#         'produs': models.Produs,
#     }
#         # introtudem mai mute q concomitent
#     def get(self, request, format=None):
#         search_query = request.query_params.get('q', '').strip()
#         # strip() este utilizat pentru a elimina orice spații albe de la începutul sau sfârșitul acestui șir.
#         queryset = None
#         # actualizată mai târziu pentru a stoca rezultatele căutării.
#         results = {}
#         # un dicționar gol care va fi populat cu rezultatele căutării și returnat mai târziu ca răspuns la cerere.
        
#         # search in Categories
#         serializer_class = self.serializer_classes['categories']
#         model_class = self.model_classes['categories']
#         queryset = model_class.objects.filter(type_categories__icontains=search_query)
#         results['categories'] = serializer_class(queryset, many=True).data

#         # search in SubCategories
#         serializer_class = self.serializer_classes['subcategories']
#         model_class = self.model_classes['subcategories']
#         queryset = model_class.objects.filter(type_subcategory__icontains=search_query)
#         results['subcategories'] = serializer_class(queryset, many=True).data

#         # search in SubCategoriesType
#         serializer_class = self.serializer_classes['subcategoriestype']
#         model_class = self.model_classes['subcategoriestype']
#         queryset = model_class.objects.filter(type_category__icontains=search_query)
#         results['subcategoriestype'] = serializer_class(queryset, many=True).data

#         # search in Produs
#         serializer_class = self.serializer_classes['produs']
#         model_class = self.model_classes['produs']
#         queryset = model_class.objects.filter(nume__icontains=search_query) | \
#                    model_class.objects.filter(manufacturer__icontains=search_query) | \
#                    model_class.objects.filter(product_description__icontains=search_query)
#         results['produs'] = serializer_class(queryset, many=True).data

#         return Response(results, status=status.HTTP_200_OK)


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
        keywords = [keyword.strip() for keyword in search_query.split(',')]
        queryset = None
        results = {}

        # search in Categories
        serializer_class = self.serializer_classes['categories']
        model_class = self.model_classes['categories']
        queryset = model_class.objects.none()
        for keyword in keywords:
            queryset |= model_class.objects.filter(type_categories__icontains=keyword)
        results['categories'] = serializer_class(queryset, many=True).data

        # search in SubCategories
        serializer_class = self.serializer_classes['subcategories']
        model_class = self.model_classes['subcategories']
        queryset = model_class.objects.none()
        for keyword in keywords:
            queryset |= model_class.objects.filter(type_subcategory__icontains=keyword)
        results['subcategories'] = serializer_class(queryset, many=True).data

        # search in SubCategoriesType
        serializer_class = self.serializer_classes['subcategoriestype']
        model_class = self.model_classes['subcategoriestype']
        queryset = model_class.objects.none()
        for keyword in keywords:
            queryset |= model_class.objects.filter(type_category__icontains=keyword)
        results['subcategoriestype'] = serializer_class(queryset, many=True).data

        # search in Produs
        serializer_class = self.serializer_classes['produs']
        model_class = self.model_classes['produs']
        queryset = model_class.objects.none()
        for keyword in keywords:
            queryset |= model_class.objects.filter(nume__icontains=keyword) | \
                        model_class.objects.filter(manufacturer__icontains=keyword) | \
                        model_class.objects.filter(product_description__icontains=keyword)
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
    
 

