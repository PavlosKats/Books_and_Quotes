import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote, QuoteService } from '../../../core/services/quote.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.scss',
})
export class QuoteList implements OnInit {
  private quoteService = inject(QuoteService);

  quotes: Quote[] = [];
  errorMessage = '';
  pendingDeleteQuote: Quote | null = null;

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load quotes.';
      },
    });
  }

  askDeleteQuote(quote: Quote): void {
    this.pendingDeleteQuote = quote;
  }

  cancelDelete(): void {
    this.pendingDeleteQuote = null;
  }

  confirmDelete(): void {
    if (!this.pendingDeleteQuote) {
      return;
    }

    const quoteId = this.pendingDeleteQuote.id;

    this.quoteService.deleteQuote(quoteId).subscribe({
      next: () => {
        this.pendingDeleteQuote = null;
        this.loadQuotes();
      },
      error: () => {
        this.errorMessage = 'Failed to delete quote.';
        this.pendingDeleteQuote = null;
      },
    });
  }
}