from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone

from imoveis.models import Imoveis


class ListarImoveisViewTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="teste",
            password="123456"
        )

        Imoveis.objects.create(
            titulo="Casa A",
            tipo=1,
            preco=100000,
            endereco="Rua 1",
            cidade="Cidade",
            cep="12345-000",
            data_publicacao=timezone.now()
        )

        self.url = reverse("home")

    def test_listar_imoveis_requer_login(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 302)

    def test_listar_imoveis_autenticado(self):
        self.client.login(username="teste", password="123456")
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "home.html")
        self.assertIn("imoveis", response.context)


class DetalhesImovelViewTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="teste",
            password="123456"
        )

        self.imovel = Imoveis.objects.create(
            titulo="Casa Detalhe",
            tipo=1,
            preco=200000,
            endereco="Rua 2",
            cidade="Cidade",
            cep="65432-000",
            data_publicacao=timezone.now()
        )

        self.url = reverse("detalhes-imoveis", args=[self.imovel.pk])

    def test_detalhes_requer_login(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 302)

    def test_detalhes_autenticado(self):
        self.client.login(username="teste", password="123456")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "imoveis/detalhes_imovel.html")
        self.assertEqual(response.context["imovel"].pk, self.imovel.pk)
