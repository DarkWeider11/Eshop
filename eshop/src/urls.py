from django.urls import path, include 
from django.contrib import admin

urlpatterns = [
        path('admin/', include('dashboard.urls')),

    path('api/', include ([
        
        path('users/', include('users.urls')),
        path('products/', include('products.urls')),
        path('cart/', include('cart.urls')),
        path('authen/', include('authen.urls')),
        ]))
    ]

