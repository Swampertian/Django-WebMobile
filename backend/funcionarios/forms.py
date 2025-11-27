from django import forms
from .models import Funcionarios


class FuncionariosForm(forms.ModelForm):
	class Meta:
		model = Funcionarios
		fields = [
			'nome',
			'imovel',
			'cargo',
			'salario',
			'data_contratacao',
			'email',
			'telefone',
		]

		widgets = {
			'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nome completo'}),
			'imovel': forms.Select(attrs={'class': 'form-control'}),
			'cargo': forms.Select(attrs={'class': 'form-control'}),
			'salario': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
			'data_contratacao': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
			'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'email@exemplo.com'}),
			'telefone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '(00) 00000-0000'}),
		}

		labels = {
			'nome': 'Nome',
			'imovel': 'Imóvel',
			'cargo': 'Cargo',
			'salario': 'Salário',
			'data_contratacao': 'Data de contratação',
			'email': 'E-mail',
			'telefone': 'Telefone',
		}

	def clean_salario(self):
		salario = self.cleaned_data.get('salario')
		if salario is not None and salario < 0:
			raise forms.ValidationError('O salário deve ser positivo.')
		return salario

	def clean_email(self):
		email = self.cleaned_data.get('email')
		if email and '@' not in email:
			raise forms.ValidationError('Informe um e-mail válido.')
		return email
