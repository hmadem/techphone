import { Routes } from '@angular/router';
import { Home } from './front-office/home/home';
import { ProductList } from './front-office/product-list/product-list';
import { ProductDetail } from './front-office/product-detail/product-detail';
import { Compare } from './front-office/compare/compare';
import { Dashboard } from './back-office/dashboard/dashboard';
import { AddTelephone } from './back-office/add-telephone/add-telephone';
import { PurchaseRequests } from './back-office/purchase-requests/purchase-requests';
import { AdminTelephones } from './back-office/admin-telephones/admin-telephones';
import { EditTelephone } from './back-office/edit-telephone/edit-telephone';
import { ChangePassword } from './back-office/change-password/change-password';
import { Login } from './back-office/login/login';
import { about } from './front-office/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'about', component: about },
  { path: 'compare', component: Compare },
  {path: 'admin',
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'telephones', component: AdminTelephones },
      { path: 'add-telephone', component: AddTelephone },
      { path: 'requests', component: PurchaseRequests },
      { path: 'change-password', component: ChangePassword },
      { path: 'edit-telephone/:id', component: EditTelephone }
    ]
  },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];