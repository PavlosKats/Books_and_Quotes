import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  validationMessage = '';
  submitted = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.validationMessage = '';

    this.authService.login({
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
          this.errorMessage = 'Login failed. Please check your username and password.';
        }
      }
    });
  }
}