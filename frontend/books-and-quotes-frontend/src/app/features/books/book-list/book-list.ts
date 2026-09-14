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
  pendingDeleteBook: Book | null = null;

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

  askDeleteBook(book: Book): void {
    this.pendingDeleteBook = book;
  }

  cancelDelete(): void {
    this.pendingDeleteBook = null;
  }

  confirmDelete(): void {
    if (!this.pendingDeleteBook) {
      return;
    }

    const bookId = this.pendingDeleteBook.id;

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.pendingDeleteBook = null;
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'Failed to delete book.';
        this.pendingDeleteBook = null;
      },
    });
  }
}