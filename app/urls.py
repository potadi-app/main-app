from django.urls import path, include, re_path
from . import views, authentication

urlpatterns = [
    path('', views.home, name='home'),
    path('diagnosis/', views.diagnosis, name='diagnosis'),
    path('history/', views.history, name='history'),
    path('detail-history/<int:id>', views.history, name='detail_history'),
    path('del-history/<int:id>', views.delete_history, name='delete_history'),
    path('del-sel-history/', views.delete_sel_history, name='delete_sel_history'),
    path('download-sample-img/<str:filename>', views.download_sample_img, name='download_sample_img'),
        
    path('auth/login/', authentication.login, name='login'),
    path('register/', authentication.register, name='register'),
    path('forgot-password/', authentication.forgot_password, name='forgot_password'),
    path('logout/', authentication.logout, name='logout'),

    path('accounts/', include('allauth.urls')),
    path('accounts/login/success/', authentication.login_success, name='login_success'),
]