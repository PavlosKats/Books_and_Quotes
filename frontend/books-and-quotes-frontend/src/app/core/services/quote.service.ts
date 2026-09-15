import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';

export interface Quote {
  id: number;
  content: string;
  author?: string | null;
  bookId?: number | null;
}

export interface CreateQuoteRequest {
  content: string;
  author?: string | null;
  bookId?: number | null;
}

export interface UpdateQuoteRequest {
  content: string;
  author?: string | null;
  bookId?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly baseUrl = `${environment.apiBaseUrl}/quotes`;

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.baseUrl, {
      headers: this.getHeaders(),
    });
  }

  getQuote(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createQuote(data: CreateQuoteRequest): Observable<Quote> {
    return this.http.post<Quote>(this.baseUrl, data, {
      headers: this.getHeaders(),
    });
  }

  updateQuote(id: number, data: UpdateQuoteRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
