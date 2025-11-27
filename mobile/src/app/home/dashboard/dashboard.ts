import { Component, OnInit } from '@angular/core';
import { ImoveisService } from '../../services/imoveis.service';
import { imovel } from '../../interfaces/imoveis';
import { IonicModule } from '@ionic/angular';


import { CommonModule, NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule, NgIf, NgFor],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {

  imoveis: imovel[] = [];
  carregando = true;
  erro = false;

  constructor(private imoveisService: ImoveisService) {}

  ngOnInit() {
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

}
