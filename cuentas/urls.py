from django.urls import path
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView  # <-- 1. Importa esto
from . import views
from rest_framework.routers import DefaultRouter
from .views import api_login, api_dashboard, AlertaViewSet

router = DefaultRouter()
router.register(r'api/alertas', AlertaViewSet, basename='alerta')

urlpatterns = [
    # 2. Redirige la raíz ('') directamente a la vista de login
    path('', RedirectView.as_view(url='login/', permanent=False)),
    
    # Rutas existentes
    #path('login/', auth_views.LoginView.as_view(template_name='cuentas/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    #path('dashboard/', views.dashboard_view, name='dashboard'),

    path('api/login/', api_login, name='api_login'),
        path('api/dashboard/', api_dashboard, name='api_dashboard'),
    ] + router.urls




