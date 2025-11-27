from django.shortcuts import render

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, View
from .models import Funcionarios
from .forms import FuncionariosForm
from django.urls import reverse_lazy

from rest_framework.generics import ListAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework. permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .serializers import FuncionariosSerializer

class CadastrarFuncionarios(LoginRequiredMixin, CreateView):
    model = Funcionarios
    form_class = FuncionariosForm
    contexto = 'funcionarios'
    template_name = 'funcionarios/cadastrar_funcionarios.html'
    success_url = reverse_lazy('home')

class FuncionariosAPIListar(ListCreateAPIView):
    serializer_class = FuncionariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Funcionarios.objects.all()
    

class FuncionariosAPIDeletar(DestroyAPIView):
    serializer_class = FuncionariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Funcionarios.objects.all()
    