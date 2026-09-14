import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from '../../../core/services/book.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {
  private bookService = inject(BookService);

  books: Book[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load books.';
      },
    });
  }

  deleteBook(id: number): void {
  const confirmed = window.confirm('Are you sure you want to delete this book?');
  if (!confirmed) {
    return;
  }

  this.bookService.deleteBook(id).subscribe({
    next: () => this.loadBooks(),
    error: () => {
      this.errorMessage = 'Failed to delete book.';
    },
  });
}
}