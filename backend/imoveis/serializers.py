from rest_framework import serializers
from imoveis.models import Imoveis


class ImovelSerializer(serializers.ModelSerializer):

    titulo = serializers.SerializerMethodField()
    tipo = serializers.SerializerMethodField()
    preco = serializers.SerializerMethodField()
    cidade = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()


    class Meta:
        model = Imoveis
        fields = ['id', 'titulo', 'tipo', 'preco', 'cidade', 'estado', 'imagem']

    def get_titulo(self, obj):
        return obj.titulo
    
    def get_tipo(self, obj):
        return obj.get_tipo
    
    def get_cidade(self,obj):
        return obj.cidade
    
    def get_estado(self,obj):
        return obj.estado