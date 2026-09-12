import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote, QuoteService } from '../../../core/services/quote.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule],
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
}