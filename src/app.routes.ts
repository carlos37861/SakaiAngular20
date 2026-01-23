import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from '@/core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./app/features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES),
  },

  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'solicitudemr',
        loadChildren: () =>
          import('./app/features/solicitud-emr/solicitud-emr.routes')
            .then(m => m.SOLICITUDEMR_ROUTES),
      },
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];
