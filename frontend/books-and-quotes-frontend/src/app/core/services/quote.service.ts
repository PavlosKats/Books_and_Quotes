import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Quote {
  id: number;
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
  private readonly baseUrl = 'http://localhost:5295/api/quotes';

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
}