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

  get passwordHasNumberAndSymbol(): boolean {
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(this.password);
    return hasNumber && hasSymbol;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.validationMessage = '';

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
        } else if (error.error?.errors) {
          this.validationMessage = Object.values(error.error.errors).flat().join(' ');
        } else {
          this.errorMessage = 'Register failed. Please check your username and password.';
        }
      }
    });
  }
}