import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/core/guards/auth.guard'; // si aún no lo tienes, lo creamos luego

export const appRoutes: Routes = [

    // 🔹 Rutas públicas (sin layout)
    {
        path: 'auth',
        loadChildren: () =>
            import('./app/features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    // 🔹 Rutas protegidas (todas usan AppLayout)
    {
        path: '',
        component: AppLayout,
        //canActivate: [AuthGuard],   // si no lo has creado, lo hacemos después
        children: [
             // ⭐ Tus Features
            {
                path: 'personas',
                loadChildren: () =>
                    import('./app/features/personas/personas.routes')
                    .then(m => m.PERSONAS_ROUTES)
            }
        ]
    },

    // Fallback
    { path: '**', redirectTo: 'auth/login' }
];
