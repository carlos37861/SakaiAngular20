import { AuthStore } from '@/features/auth/services/auth.store';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const token = store.getToken();

  // opcional: no meter token en el login
  if (!token || req.url.includes('/usuario/userlogin')) return next(req);

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};