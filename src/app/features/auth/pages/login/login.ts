import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';


import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CommonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
  templateUrl: './login.html' // (si lo tienes inline, igual funciona)
})
export class Login {
  email = '';     // aquí será Username
  password = '';
  checked = false;

  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

//   onSubmit() {
//     this.errorMsg = '';

//     if (!this.email.trim() || !this.password.trim()) {
//       this.errorMsg = 'Ingrese usuario y password.';
//       return;
//     }

//     this.loading = true;
//     this.auth.login(this.email.trim(), this.password.trim(), '3').subscribe({
//       next: () => {
//         this.loading = false;
//         this.router.navigateByUrl('/personas');
//       },
//       error: (err) => {
//         this.loading = false;
//         this.errorMsg = err?.message ?? 'Error al iniciar sesión';
//       }
//     });
//   }

  onSubmit() {
  localStorage.setItem('FAKE_LOGIN', '1');
  this.router.navigateByUrl('/personas');
}
logout() {
  localStorage.removeItem('FAKE_LOGIN');
  this.router.navigateByUrl('/login');
}
}