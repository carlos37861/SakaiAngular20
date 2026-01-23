import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const REFRESH_KEY = 'auth_refresh';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  setTokens(token: string, refresh: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_KEY, refresh);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}