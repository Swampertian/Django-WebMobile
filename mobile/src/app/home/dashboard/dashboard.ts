import { Component, OnInit } from '@angular/core';
import { ImoveisService } from '../../services/imoveis.service';
import { imovel } from '../../interfaces/imoveis';
import { 
  IonContent, 
  IonSpinner, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton, 
  IonIcon, // Importação do componente de ícone
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonToast, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonSelect, 
  IonSelectOption 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { addIcons } from 'ionicons';

import { 
  refresh, 
  add, 
  close,
  statsChart
} from 'ionicons/icons';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    IonContent,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonToast,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {

  imoveis: imovel[] = [];
  carregando = true;
  erro = false;
  // Modal/Formulário de novo imóvel
  addOpen = false;
  addForm!: FormGroup;
  enviando = false;
  sucesso = false;
  // Toast de métricas
  metricsOpen = false;
  metricsText = '';

  constructor(private imoveisService: ImoveisService, private fb: FormBuilder) {
    addIcons({
      'refresh': refresh,
      'add': add,
      'close': close,
      'stats-chart': statsChart
    });
  }

  ngOnInit() {
    this.criarFormulario();
    this.buscarImoveis();
  }

  buscarImoveis() {
    this.carregando = true;
    this.imoveisService.getImoveis().subscribe({
      next: (dados) => {
        this.imoveis = dados;
        this.carregando = false;
        console.log("Imóveis recebidos:", dados);
      },
      error: (err) => {
        console.error("Erro ao carregar imóveis:", err);
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  criarFormulario() {
    this.addForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      tipo: [null, [Validators.required]],
      preco: [null, [Validators.required, Validators.min(0)]],
      endereco: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      quartos: [null],
      banheiros: [null],
      area: [null],
      // cep intencionalmente não incluído por ser informação privada
    });
  }

  abrirAdicionar() {
    this.addOpen = true;
  }

  fecharAdicionar() {
    this.addOpen = false;
    this.addForm.reset();
  }

  salvarImovel() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    this.enviando = true;
    const payload = this.addForm.value;
    this.imoveisService.createImovel(payload).subscribe({
      next: (novo) => {
        this.sucesso = true;
        this.fecharAdicionar();
        this.buscarImoveis();
        this.enviando = false;
      },
      error: (err) => {
        console.error('Erro ao criar imóvel', err);
        this.enviando = false;
      }
    });
  }

  // Calcula e exibe métricas de preço dos imóveis
  mostrarMetricas() {
    if (!this.imoveis || this.imoveis.length === 0) {
      this.metricsText = 'Sem imóveis para calcular métricas.';
      this.metricsOpen = true;
      return;
    }
    const precos = this.imoveis
      .map(i => Number(i.preco))
      .filter(v => !isNaN(v));
    if (precos.length === 0) {
      this.metricsText = 'Sem preços válidos.';
      this.metricsOpen = true;
      return;
    }
    const qtd = precos.length;
    const min = Math.min(...precos);
    const max = Math.max(...precos);
    const soma = precos.reduce((a, b) => a + b, 0);
    const media = soma / qtd;
    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);
    this.metricsText = `Qtd: ${qtd} • Min: ${fmt(min)} • Méd: ${fmt(media)} • Máx: ${fmt(max)}`;
    this.metricsOpen = true;
  }

}
