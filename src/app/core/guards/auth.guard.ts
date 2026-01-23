
import { AuthStore } from '@/features/auth/services/auth.store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


// export const AuthGuard: CanActivateFn = () => {
//   const authService = inject(AuthStore);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     return true;
//   }

//   router.navigate(['/auth/login']);
//   return false;
// };

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  const logged = localStorage.getItem('FAKE_LOGIN') === '1';

  if (logged) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};