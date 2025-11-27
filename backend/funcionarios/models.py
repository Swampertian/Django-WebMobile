from django.db import models
from datetime import datetime
from imoveis.models import Imoveis
from .consts import *

class Funcionarios(models.Model):
    nome = models.CharField(max_length=100)
    imovel = models.ForeignKey(Imoveis, on_delete=models.CASCADE, related_name='funcionarios')
    cargo = models.CharField(max_length=100, choices=CARGO_CHOICES)
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    data_contratacao = models.DateField(default=datetime.now)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)


    def __str__(self):
        return self.nome
    @property
    def funcionario_novo(self):
        return self.data_contratacao.year == datetime.now().year
   
    class Meta:
        ordering = ['-id']
