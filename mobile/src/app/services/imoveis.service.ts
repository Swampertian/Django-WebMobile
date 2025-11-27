import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { imovel } from '../interfaces/imoveis';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService {
    private apiUrl = `http://127.0.0.1:8000/home/api/imoveis`;
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        });

        if (token) {
        headers = headers.set('Authorization', `Token ${token}`);
        }

        return headers;
    }

    getImoveis(): Observable<imovel[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<imovel[]>(`${this.apiUrl}/`, { headers }).pipe(
        tap((response) => console.log('Imóveis carregados:', response)),
        catchError((error) => {
            console.error('Erro ao carregar imóveis:', error);
            throw error;
        })
        );
    }
    createImovel(imovel: Partial<imovel>): Observable<imovel> {
        const headers = this.getAuthHeaders();
        return this.http.post<imovel>(`${this.apiUrl}/`, imovel, { headers }).pipe(
        tap((response) => console.log('Imóvel criado:', response)),
        catchError((error) => {
            console.error('Erro ao criar imóvel:', error);
            throw error;
        })
        );
    }

    updateImovel(id: number, imovel: Partial<imovel>): Observable<imovel> {
        const headers = this.getAuthHeaders();
        return this.http
        .put<imovel>(`${this.apiUrl}/${id}/`, imovel, { headers })
        .pipe(
            tap((response) => console.log('Imóvel atualizado:', response)),
            catchError((error) => {
            console.error('Erro ao atualizar imóvel:', error);
            throw error;
            })
        );
    }

    deleteImovel(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete(`${this.apiUrl}/deletar/${id}/`, { headers }).pipe(
        tap((response) => console.log('Imóvel deletado:', response)),
        catchError((error) => {
            console.error('Erro ao deletar imóvel:', error);
            throw error;
        })
        );
    }
}
