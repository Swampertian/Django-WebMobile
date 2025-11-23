from django import forms
from .models import Imoveis

class ImoveisForm(forms.ModelForm):
    
    class Meta:
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control'}),
            'tipo': forms.Select(attrs={'class': 'form-control'}),
            'preco': forms.NumberInput(attrs={'class': 'form-control'}),
            'endereco': forms.TextInput(attrs={'class': 'form-control'}),
            'cidade': forms.TextInput(attrs={'class': 'form-control'}),
            'estado': forms.TextInput(attrs={'class': 'form-control'}),
            'quartos': forms.NumberInput(attrs={'class': 'form-control'}),
            'banheiros': forms.NumberInput(attrs={'class': 'form-control'}),
            'area': forms.NumberInput(attrs={'class': 'form-control'}),
            'cep': forms.TextInput(attrs={'class': 'form-control'}),
            'imagem': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

        model = Imoveis
        fields = ['titulo', 'tipo', 'preco', 'endereco', 'cidade', 'estado', 'quartos', 'banheiros', 'area', 'cep', 'imagem']