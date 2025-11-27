from rest_framework import serializers
from imoveis.models import Imoveis



class FuncionariosSerializer(serializers.ModelSerializer):

    nome = serializers.SerializerMethodField()
    cargo = serializers.SerializerMethodField()
    telefone = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = Imoveis
        fields = ['id', 'nome', 'cargo', 'telefone', 'email']

    def nome(self, obj):
        return obj.nome
    def cargo(self, obj):
        return obj.cargo
    def telefone(self,obj):
        return obj.telefone
    def email(self,obj):
        return obj.email