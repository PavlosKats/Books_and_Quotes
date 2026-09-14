import { Component, signal, inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('books-and-quotes-frontend');
  
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  closeNavbar(): void {
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector<HTMLButtonElement>('.navbar-toggler');

    if (!navbar || !toggler) {
      return;
    }

    if (navbar.classList.contains('show')) {
      toggler.click();
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');

    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  isDarkTheme(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}
