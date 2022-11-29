import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard], // Secure all child pages
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'edit-menu/:id',
    loadChildren: () => import('./edit-menu/edit-menu.module').then( m => m.EditMenuPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'tambah-menu',
    loadChildren: () => import('./tambah-menu/tambah-menu.module').then( m => m.TambahMenuPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'carts',
    loadChildren: () => import('./carts/carts.module').then( m => m.CartsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canLoad: [AutoLoginGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
