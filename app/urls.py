from django.urls import path
from . import views, auth

urlpatterns = [
    path('', views.home, name='home'),
    path('auth/login/', auth.login, name='login'),
    path('register/', auth.register, name='register'),
    path('forgot-password/', auth.forgot_password, name='forgot_password'),
    # path('logout/', views.logoutUser, name='logout'),
]