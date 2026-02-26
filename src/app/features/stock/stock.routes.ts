import { Routes } from '@angular/router';
import { StockListPage } from './pages/stock-list.page/stock-list.page';
import { StockCreatePage } from './pages/stock-create.page/stock-create.page';
import { StockViewPage } from './pages/stock-view.page/stock-view.page';



export const STOCK_ROUTES: Routes = [
  {
    path: '',
    component: StockListPage
  },
  {
    path: 'create',
    component: StockCreatePage
  },
  {
     path: 'view/:codigo', component: StockViewPage 
    }, 
  

];