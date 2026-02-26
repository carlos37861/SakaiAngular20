import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { AuthStore } from './auth.store';
import { ApiResponse, LoginRequest, LoginResult } from '../models/auth.models';
import { ApiEndpointsService } from '@/core/services/http/api-endpoints.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private endpoints: ApiEndpointsService,
    private store: AuthStore
  ) {}

  login(username: string, password: string, app: string = '3'): Observable<LoginResult> {
    const body: LoginRequest = { Username: username, Password: password, App: app };

    return this.http.post<ApiResponse<LoginResult>>(this.endpoints.login(), body).pipe(
      map(res => {
        if (!res?.IsSuccess) throw new Error(res?.ErrorMessage || 'Login falló');
        return res.Result;
      }),
      tap(result => this.store.setTokens(result.Token, result.RefreshToken))
    );
  }

  logout() {
    this.store.clear();
  }

  get token(): string | null {
    return this.store.getToken();
  }
}
