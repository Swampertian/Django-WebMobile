from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, View
from .models import Imoveis
from .forms import ImoveisForm
from django.urls import reverse_lazy

from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework. permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .serializers import ImovelSerializer
class ListarImoveis(ListView,LoginRequiredMixin):
    model = Imoveis
    template_name = 'home.html'
    context_object_name = 'imoveis'
    paginate_by = 9  # 9 imóveis por página (3x3 grid)

class DetalhesImovel(LoginRequiredMixin, View):
     def get(self,request,pk):
        context={}
        imovel = Imoveis.objects.get(id=pk)
        context['imovel'] = imovel
        return render(request,'imoveis/detalhes.html',context)
class CadastrarImovel(LoginRequiredMixin, CreateView):
    model = Imoveis
    form_class = ImoveisForm
    contexto = 'imoveis'
    template_name = 'imoveis/cadastrar_imovel.html'
    success_url = reverse_lazy('home')

class EditarImovel(LoginRequiredMixin, UpdateView):
    model = Imoveis
    form_class = ImoveisForm
    contexto = 'imoveis'
    template_name = 'imoveis/editar_imovel.html'
    success_url = reverse_lazy('home')

class ExcluirImovel(LoginRequiredMixin,DeleteView):
    model = Imoveis
    contexto = 'imoveis'
    template_name = 'alert.html'
    success_url = reverse_lazy('home')

class FotosImoveis(View):
    def get(self, request, pk):
        imovel = Imoveis.objects.get(pk=pk)
        contexto = {
            'imovel': imovel
        }
        return render(request, 'imoveis/fotos_imovel.html', contexto)
    

### API

class ImovelAPIListar(ListAPIView):
    serializer_class = ImovelSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Imoveis.objects.all()
    
class ImovelAPIDeletar(DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Imoveis.objects.all()