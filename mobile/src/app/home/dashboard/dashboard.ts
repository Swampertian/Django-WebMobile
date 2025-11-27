import { Component, OnInit } from '@angular/core';
import { ImoveisService } from '../../services/imoveis.service';
import { imovel } from '../../interfaces/imoveis';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule, NgIf, NgFor, ReactiveFormsModule],
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

  constructor(private imoveisService: ImoveisService, private fb: FormBuilder) {}

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

}
