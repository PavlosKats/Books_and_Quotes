import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  errorMessage = '';
  validationMessage = '';
  submitted = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  get passwordMeetsPolicy(): boolean {
    const hasLength = this.password.length >= 8;
    const hasNumber = /[0-9]/.test(this.password);
    const hasLowercase = /[a-z]/.test(this.password);
    const hasUppercase = /[A-Z]/.test(this.password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(this.password);
    return hasLength && hasNumber && hasLowercase && hasUppercase && hasSymbol;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.validationMessage = '';

    if (!this.username || !this.password) {
      return;
    }

    if (!this.passwordMeetsPolicy) {
      this.validationMessage = 'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol.';
      return;
    }

    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (error: HttpErrorResponse) => {
        if (typeof error.error === 'string') {
          this.validationMessage = error.error;
        } else if (Array.isArray(error.error)) {
          this.validationMessage = error.error
            .map((item: { description?: string; Description?: string }) => item.description ?? item.Description ?? '')
            .filter(Boolean)
            .join(' ');
        } else if (error.error?.errors) {
          this.validationMessage = Object.values(error.error.errors).flat().join(' ');
        } else {
          this.errorMessage = 'Register failed. Please check your username and password.';
        }
      }
    });
  }
}