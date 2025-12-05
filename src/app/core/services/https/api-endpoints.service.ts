import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiEndpointsService {

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