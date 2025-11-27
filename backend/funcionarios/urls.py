from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *


urlpatterns = [
    path('cadastrar/',login_required(CadastrarFuncionarios.as_view(),login_url='login'), name='cadastrar-funcionarios'),
    
    path('api/funcionarios/', FuncionariosAPIListar.as_view(), name='api-listar-funcionarios'),
    path('api/funcionarios/deletar/<int:pk>/', FuncionariosAPIDeletar.as_view(), name='api-deletar-funcionario'),

]