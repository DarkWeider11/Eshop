from django.urls import path, include 
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', include('dashboard.urls')),

    path('api/', include ([
        
        path('users/', include('users.urls')),
        path('products/', include('products.urls')),
        path('cart/', include('cart.urls')),
        path('authen/', include('authen.urls')),
    
        
        ]))
    ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

