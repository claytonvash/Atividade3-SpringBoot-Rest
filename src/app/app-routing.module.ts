import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { componentFactoryName } from '@angular/compiler';
import { ProductsComponent } from './views/products/products.component';
import { UserComponent } from './views/user/user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'principal',
    component: HomeComponent,
    children:
      [
        {
          path: 'product',
          component: ProductsComponent
        },
        {
          path: 'user',
          component: UserComponent
        }
      ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
