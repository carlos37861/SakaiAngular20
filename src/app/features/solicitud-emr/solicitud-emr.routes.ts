import { Routes } from '@angular/router';

export const SOLICITUDEMR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/solicitud-emr-list.page/solicitud-emr-list.page')
        .then(m => m.SolicitudEmrListPage),
  },

  
  {
    path: 'ver/:id',
    loadComponent: () =>
      import('./pages/solicitud-emr-view.page/solicitud-emr-view.page')
        .then(m => m.SolicitudEmrViewPage),
  },

  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/create/solicitud-emr-create.shell/solicitud-emr-create.shell')
        .then(m => m.SolicitudEmrCreateShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'paso-1' },
      {
        path: 'paso-1',
        loadComponent: () =>
          import('./pages/create/steps/step-1-info/step-1-info')
            .then(m => m.Step1Info),
      },
      {
        path: 'paso-2',
        loadComponent: () =>
          import('./pages/create/steps/step-2-detalle/step-2-detalle')
            .then(m => m.Step2Detalle),
      },
    ],
  },

  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./pages/create/solicitud-emr-create.shell/solicitud-emr-create.shell')
        .then(m => m.SolicitudEmrCreateShell),
  },
];