from django.urls import path
from products import views



urlpatterns = [
    path('get-categories', views.CategoriesList.as_view()),
    path('get-subcategories', views.SubCategoriesList.as_view()),
    path('get-subcategoriestype', views.SubCategoriesTypeList.as_view()),
    path('get-produs', views.ProdusList.as_view()),
    
    path('produs-filter', views.ProdusList.as_view()),
    
    path('search', views.SearchView.as_view()),
    
    path('get-produs/''<int:pk>', views.ProdusListDetaliedView.as_view()),
    path('get-categories/''<int:pk>', views.CategoriesListDetaliedView.as_view()),
    path('get-subcategories/''<int:pk>', views.SubCategoriesListDetaliedView.as_view()),
    path('get-subcategoriestype/''<int:pk>', views.SubCategoriesTypeListDetaliedView.as_view())
     
]