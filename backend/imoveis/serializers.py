from rest_framework import serializers
from imoveis.models import Imoveis


class ImovelSerializer(serializers.ModelSerializer):
    imagem = serializers.SerializerMethodField()

    class Meta:
        model = Imoveis
        fields = [
            'id', 'titulo', 'tipo', 'preco', 'cidade', 'estado',
            'imagem', 'banheiros', 'quartos', 'area', 'cep'
        ]

    def get_imagem(self, obj):
        request = self.context.get('request')
        if not obj.imagem:
            return None
        url = obj.imagem.url
        return request.build_absolute_uri(url) if request else url