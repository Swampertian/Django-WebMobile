from django.views.generic import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

@method_decorator(csrf_protect, name='dispatch')
class Login(View):

    def get(self,request):
        contexto ={'mensagem': ''}
        if request.user.is_authenticated:
            return redirect("home")
        else:
            return render(request, 'login/login.html', contexto)

    def post(self, request):
        usuario = request.POST.get('email', None)
        senha = request.POST.get('password', None)
        

        if not usuario or not senha:
            return render(request, 'login/login.html', {'mensagem':'Por favor, preencha todos os campos!'})
        
        user = authenticate(request, username=usuario, password=senha)
        
      
        if user is None:
            try:
                from django.contrib.auth.models import User
                user_obj = User.objects.get(email=usuario)
                user = authenticate(request, username=user_obj.username, password=senha)
            except User.DoesNotExist:
                user = None
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect("home")
            else:
                return render(request, 'login/login.html', {'mensagem':'Usuário inativo!'})
        else:
            return render(request, 'login/login.html', {'mensagem':'Usuário e senha inválidos!'})

class Logout(View):
    def get(self, request):
        logout(request)
        return redirect("login")
    
@method_decorator(csrf_exempt, name='dispatch')
class LoginAPI(ObtainAuthToken):
    
    def post(self,request,*args,**kwargs):
        serializer = self.serializer_class(
            data = request.data,
            context ={
                'request':request
            }
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token,created = Token.objects.get_or_create(user=user)
        return Response({'id':user.id, 'nome':user.first_name,'email':user.email,'token':token.key})