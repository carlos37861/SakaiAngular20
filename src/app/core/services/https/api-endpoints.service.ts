import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiEndpointsService {
  private base = environment.apiBaseUrl;
  
  login(): string {
    return `${this.base}usuario/userlogin`;
  }
  // Auth
  auth = {
    login: '/auth/login',
    logout: '/auth/logout'
  };

  // Clientes
  clientes = {
    base: '/clientes',
    buscar: '/clientes/buscar'
  };

  // Personas
  personas = {
    base: '/personas',
    porCliente: '/personas/cliente/'
  };
}