import { Auth } from '@/features/auth/services/auth';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const AuthGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};