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

  deleteQuote(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this quote?');
    if (!confirmed) {
      return;
    }

    this.quoteService.deleteQuote(id).subscribe({
      next: () => this.loadQuotes(),
      error: () => {
        this.errorMessage = 'Failed to delete quote.';
      },
    });
  }
}