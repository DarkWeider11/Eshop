from django.urls import path
from cart import views



urlpatterns = [
    path('', views.CartList.as_view()),
    path('<int:pk>', views.CartListDetaliedView.as_view()),
    path('payment-cart',views.PaymentCartList.as_view())
   
]