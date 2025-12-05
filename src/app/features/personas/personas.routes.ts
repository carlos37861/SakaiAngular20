import { Routes } from '@angular/router';
import { PersonasFormPage } from './pages/personas-form-page/personas-form-page';
import { PersonasListPage } from './pages/personas-list-page/personas-list-page';


export const PERSONAS_ROUTES: Routes = [
  {
    path: '',
    component: PersonasListPage
  },
  {
    path: 'nuevo',
    component: PersonasFormPage
  },
  {
    path: 'editar/:id',
    component: PersonasFormPage
  }
];