from rest_framework import serializers
from imoveis.models import Imoveis


class ImovelSerializer(serializers.ModelSerializer):

    titulo = serializers.SerializerMethodField()
    tipo = serializers.SerializerMethodField()
    preco = serializers.SerializerMethodField()
    cidade = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()
    imagem = serializers.ImageField()

    class Meta:
        model = Imoveis
        fields = ['id', 'titulo', 'tipo', 'preco', 'cidade', 'estado', 'imagem','banheiros','quartos','area','cep']

    def titulo(self, obj):
        return obj.titulo
    def tipo(self, obj):
        return obj.tipo
    def cidade(self,obj):
        return obj.cidade
    def preco(self,obj):
        return obj.preco
    def estado(self,obj):
        return obj.estado
    def imagem(self,obj):
        return obj.imagem