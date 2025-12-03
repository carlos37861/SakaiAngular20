import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token'); // Ejemplo básico
}
}
