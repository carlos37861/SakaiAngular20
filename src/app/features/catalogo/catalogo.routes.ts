import { Routes } from '@angular/router';
import { CatalogoListPage } from './pages/list/catologo-list.page/catologo-list.page';
import { CatalogoCreatePage } from './pages/create/catalogo-create.page/catalogo-create.page';
import { CatalogoViewPage } from './pages/catalogo-view.page/catalogo-view.page';



export const CATALOGO_ROUTES: Routes = [
  {
    path: '',
    component: CatalogoListPage
  },
  {
    path: 'create',
    component: CatalogoCreatePage
  },
{ path: 'view/:codigo', component: CatalogoViewPage }, 
];