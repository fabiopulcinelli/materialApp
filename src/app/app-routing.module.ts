import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'list',
    component: ListUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pagina2',
    component: Pagina2Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id/:mode',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id/:mode',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
