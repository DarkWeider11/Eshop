from django.urls import path, include 

urlpatterns = [
    path('api/', include ([
        
        path('users/', include('users.urls')),
        path('products/', include('products.urls')),
        path('cart/', include('cart.urls')),
        path('authen/', include('authen.urls'))
        ]))
    ]

