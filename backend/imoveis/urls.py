from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *


urlpatterns = [
    
    path('', login_required(ListarImoveis.as_view(),login_url='login'), name='home'),
    path('cadastrar/',login_required(CadastrarImovel.as_view(),login_url='login'), name='cadastrar-imoveis'),
    path('editar/<int:pk>/',login_required(EditarImovel.as_view(),login_url='login'), name='editar-imoveis'),
    path('excluir/<int:pk>/',login_required(ExcluirImovel.as_view(),login_url='login'), name='excluir-imoveis'),
    path('fotos/<int:pk>/',FotosImoveis.as_view(), name='fotos-imoveis'),
    path('detalhes/<int:pk>/', login_required(DetalhesImovel.as_view(), login_url='login'), name='detalhes-imoveis'),

    path('api/imoveis/', ImovelAPIListar.as_view(), name='api-listar-imoveis'),
    path('api/imoveis/deletar/<int:pk>/', ImovelAPIDeletar.as_view(), name='api-deletar-imovel'),

]