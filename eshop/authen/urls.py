from django.urls import path
from authen import views


urlpatterns = [
    path('register', views.RegisterView.as_view()),
    path('login', views.login_view),
    path('logout', views.logout_view),
    path('reset-password', views.reset_password),
]