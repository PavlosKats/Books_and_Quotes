import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';

export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
  isbn: string;
  coverImageUrl?: string | null;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  yearPublished: number;
  isbn: string;
  coverImageUrl?: string | null;
}

export interface UpdateBookRequest {
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
  private readonly baseUrl = `${environment.apiBaseUrl}/books`;

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

  createBook(data: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, data, {
      headers: this.getHeaders(),
    });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateBook(id: number, data: UpdateBookRequest): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, data, {
      headers: this.getHeaders(),
    });
  }

  deleteBook(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, {
      headers: this.getHeaders(),
    });
  }
}