import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ImoveisService } from '../../services/imoveis.service';
import { imovel } from '../../interfaces/imoveis';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon],
  templateUrl: './metrics.html',
  styleUrls: ['./metrics.scss']
})
export class MetricsComponent implements OnInit {
  private imoveisService = inject(ImoveisService);
  private router = inject(Router);
  imoveis: imovel[] = [];
  precos: number[] = [];

  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor() {
    addIcons({ 'arrow-back': arrowBack });
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.imoveisService.getImoveis().subscribe({
      next: (dados) => {
        this.imoveis = dados;
        this.precos = dados
          .map(d => Number(d.preco))
          .filter(v => !isNaN(v));
        setTimeout(() => this.desenharGrafico(), 0);
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis para métricas', err);
      }
    });
  }

  desenharGrafico() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Sem dados
    if (this.precos.length === 0) {
      ctx.fillStyle = '#888';
      ctx.font = '16px Arial';
      ctx.fillText('Sem dados de preço', 20, height / 2);
      return;
    }

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const max = Math.max(...this.precos);
    const min = Math.min(...this.precos);

    // Eixos
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    // eixo Y
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.stroke();
    // eixo X
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();

    // Barras
    const barCount = this.precos.length;
    const barGap = 6;
    const barWidth = Math.max(8, (chartWidth - barGap * (barCount - 1)) / barCount);

    for (let i = 0; i < barCount; i++) {
      const val = this.precos[i];
      const norm = (val - min) / (max - min || 1);
      const barHeight = norm * chartHeight;
      const x = padding + i * (barWidth + barGap);
      const y = padding + chartHeight - barHeight;

      // gradiente
      const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
      grad.addColorStop(0, '#667eea');
      grad.addColorStop(1, '#764ba2');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Labels min/máx
    ctx.fillStyle = '#555';
    ctx.font = '12px Arial';
    ctx.fillText(`Min: ${this.formatBRL(min)}`, padding, padding - 10);
    ctx.textAlign = 'right';
    ctx.fillText(`Máx: ${this.formatBRL(max)}`, padding + chartWidth, padding - 10);
    ctx.textAlign = 'left';
  }
  voltar() {
    this.router.navigate(['/dashboard']);
  }
  formatBRL(v: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);
  }
}
