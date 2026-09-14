import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, CreateBookRequest, UpdateBookRequest } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss'
})
export class BookForm implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  title = '';
  author = '';
  yearPublished = new Date().getFullYear();
  isbn = '';
  coverImageUrl = '';
  errorMessage = '';
  validationMessage = '';
  submitted = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);

      this.bookService.getBook(this.id).subscribe({
        next: (book) => {
          this.title = book.title;
          this.author = book.author;
          this.yearPublished = book.yearPublished;
          this.isbn = book.isbn;
          this.coverImageUrl = book.coverImageUrl ?? '';
        },
        error: () => {
          this.errorMessage = 'Failed to load book.';
        }
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.validationMessage = '';

    const payload: CreateBookRequest | UpdateBookRequest = {
      title: this.title,
      author: this.author,
      yearPublished: Number(this.yearPublished),
      isbn: this.isbn,
      coverImageUrl: this.coverImageUrl || null
    };

    const handleSuccess = () => {
      this.router.navigate(['/books']);
    };

    const handleError = (error: HttpErrorResponse) => {
      if (typeof error.error === 'string') {
        this.validationMessage = error.error;
      } else if (error.error?.errors) {
        this.validationMessage = Object.values(error.error.errors).flat().join(' ');
      } else {
        this.errorMessage = 'Failed to save book.';
      }
    };

    if (this.id === null) {
      this.bookService.createBook(payload).subscribe({
        next: handleSuccess,
        error: handleError
      });
    } else {
      this.bookService.updateBook(this.id, payload).subscribe({
        next: handleSuccess,
        error: handleError
      });
    }
  }
}