import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { BookList } from './features/books/book-list/book-list';
import { BookForm } from './features/books/book-form/book-form';
import { QuoteList } from './features/quotes/quote-list/quote-list';
import { QuoteForm } from './features/quotes/quote-form/quote-form';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'books', component: BookList, canActivate: [authGuard] },
  { path: 'books/new', component: BookForm, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookForm, canActivate: [authGuard] },

  { path: 'quotes', component: QuoteList, canActivate: [authGuard] },
  { path: 'quotes/new', component: QuoteForm, canActivate: [authGuard] },
  { path: 'quotes/edit/:id', component: QuoteForm, canActivate: [authGuard] },
];