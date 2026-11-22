import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './front-office/navbar/navbar';
import { AdminNavbar } from './back-office/admin-navbar/admin-navbar';
import { filter } from 'rxjs';
import { Footer } from './front-office/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, AdminNavbar,Footer],
  template: `
    @if (isAdmin && !isLogin) {
      <app-admin-navbar />
    } @else {
      <app-navbar />
    }
    <main class="page-content">
      <router-outlet />
    </main>
    @if (!isLogin && !isAdmin) {
      <app-footer />
    }
  `,
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);
  isAdmin = false;
  isLogin = false;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url.split('?')[0];
        this.isLogin = url === '/login';
        this.isAdmin = url.startsWith('/admin') && !this.isLogin;
      });
  }
}