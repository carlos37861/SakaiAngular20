import { Routes } from '@angular/router';
import { LoteListPage } from './pages/lote-list.page/lote-list.page';
import { LoteCreatePage } from './pages/lote-create.page/lote-create.page';
import { LoteViewPage } from './pages/lote-view.page/lote-view.page';
import { LoteCreateEmrsPage } from './pages/lote-create-emrs.page/lote-create-emrs.page';

export const LOTE_ROUTES: Routes = [
  {
    path: '',
    component: LoteListPage
  },
  {
    path: 'create',
    children: [
      {
        path: '',
        component: LoteCreatePage   // Paso 1
      },
      {
        path: 'emrs',
        component: LoteCreateEmrsPage  // Paso 2
      }
    ]
  },
  {
    path: 'view/:codigo',
    component: LoteViewPage
  }
];