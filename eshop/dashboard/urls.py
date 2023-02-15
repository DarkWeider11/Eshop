from django.urls import path
from dashboard import views



urlpatterns = [
    #users
    path('users/', views.AdminUserListView.as_view()),
    path('users/<int:pk>', views.AdminUserDetaliedView.as_view()),

    #address
    path('address/', views.AdminAddressListView.as_view()),
    path('address/<int:pk>', views.AdminAddressDetaliedView.as_view()),


    
]