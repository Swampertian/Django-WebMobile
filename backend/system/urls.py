
from django.contrib import admin
from django.urls import path,include 
from django.conf import settings
from django.conf.urls.static import static
from system.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',Login.as_view(), name='login'),
    path('logout/',Logout.as_view(), name='logout'),
    path('home/', include('imoveis.urls')),
    path('funcionarios/', include('funcionarios.urls')),
    path('api/auth/',LoginAPI.as_view(), name='api_login'),
]

# Serve arquivos de mídia em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

