import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
  isbn: string;
  coverImageUrl?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly baseUrl = 'http://localhost:5295/api/books';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl, {
      headers: this.getHeaders(),
    });
  }
}