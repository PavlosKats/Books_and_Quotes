import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService, CreateQuoteRequest, UpdateQuoteRequest } from '../../../core/services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss'
})
export class QuoteForm implements OnInit {
  private quoteService = inject(QuoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  content = '';
  author = '';
  bookId: number | null = null;
  errorMessage = '';
  validationMessage = '';
  submitted = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);

      this.quoteService.getQuote(this.id).subscribe({
        next: (quote) => {
          this.content = quote.content;
          this.author = quote.author ?? '';
          this.bookId = quote.bookId ?? null;
        },
        error: () => {
          this.errorMessage = 'Failed to load quote.';
        }
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.validationMessage = '';

    const payload: CreateQuoteRequest | UpdateQuoteRequest = {
      content: this.content,
      author: this.author || null,
      bookId: this.bookId
    };

    const handleSuccess = () => {
      this.router.navigate(['/quotes']);
    };

    const handleError = (error: HttpErrorResponse) => {
      if (typeof error.error === 'string') {
        this.validationMessage = error.error;
      } else if (error.error?.errors) {
        this.validationMessage = Object.values(error.error.errors).flat().join(' ');
      } else {
        this.errorMessage = 'Failed to save quote.';
      }
    };

    if (this.id === null) {
      this.quoteService.createQuote(payload).subscribe({
        next: handleSuccess,
        error: handleError
      });
    } else {
      this.quoteService.updateQuote(this.id, payload).subscribe({
        next: handleSuccess,
        error: handleError
      });
    }
  }
}