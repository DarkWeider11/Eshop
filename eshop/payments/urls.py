from django.urls import path 
from payments import views


urlpatterns = [
    path(r'payment', views.payment),
]   
