from django.urls import path, include
from . import views, authentication

urlpatterns = [
    path('', views.home, name='home'),
    path('diagnosis/', views.diagnosis, name='diagnosis'),
    
    path('auth/login/', authentication.login, name='login'),
    path('register/', authentication.register, name='register'),
    path('forgot-password/', authentication.forgot_password, name='forgot_password'),
    path('logout/', authentication.logout, name='logout'),

    path('accounts/', include('allauth.urls')),
    path('accounts/login/success/', authentication.login_success, name='login_success'),    
]