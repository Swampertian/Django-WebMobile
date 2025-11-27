import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ImoveisService } from '../../services/imoveis.service';
import { AuthService } from '../../services/auth.service';
import { imovel } from '../../interfaces/imoveis';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonChip,
  IonSkeletonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonChip,
    IonSkeletonText,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  private router = inject(Router);
  private imoveisService = inject(ImoveisService);
  private authService = inject(AuthService);

  imoveis: imovel[] = [];
  isLoading = true;
  currentUser: any;

  // Métricas calculadas
  get totalImoveis(): number {
    return this.imoveis.length;
  }

  get valorTotalPortfolio(): number {
    return this.imoveis.reduce((total, imovel) => total + Number(imovel.preco), 0);
  }

  get precoMedio(): number {
    return this.totalImoveis > 0 ? this.valorTotalPortfolio / this.totalImoveis : 0;
  }

  get imovelMaisCaro(): imovel | null {
    return this.imoveis.length > 0 
      ? this.imoveis.reduce((max, imovel) => 
          Number(imovel.preco) > Number(max.preco) ? imovel : max
        )
      : null;
  }

  get imovelMaisBarato(): imovel | null {
    return this.imoveis.length > 0
      ? this.imoveis.reduce((min, imovel) => 
          Number(imovel.preco) < Number(min.preco) ? imovel : min
        )
      : null;
  }

  get distribucaoPorTipo(): { [key: number]: number } {
    return this.imoveis.reduce((acc, imovel) => {
      acc[imovel.tipo] = (acc[imovel.tipo] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
  }

  get distribucaoPorCidade(): { [key: string]: number } {
    return this.imoveis.reduce((acc, imovel) => {
      acc[imovel.cidade] = (acc[imovel.cidade] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  get imoveisRecentes(): imovel[] {
    return this.imoveis
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }

  ngOnInit() {
    this.currentUser = { nome: 'Administrador' };
    this.carregarImoveis();
  }

  carregarImoveis() {
    this.isLoading = true;
    this.imoveisService.getImoveis().subscribe({
      next: (data) => {
        this.imoveis = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar imóveis:', error);
        this.isLoading = false;
      },
    });
  }

  onRefresh(event: any) {
    this.carregarImoveis();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  getTipoLabel(tipo: number): string {
    const tipos: { [key: number]: string } = {
      1: 'Casa',
      2: 'Apartamento',
      3: 'Terreno',
      4: 'Comercial',
    };
    return tipos[tipo] || 'Outro';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  verDetalhesImovel(id: number) {
    console.log('Ver detalhes do imóvel:', id);
  }
}