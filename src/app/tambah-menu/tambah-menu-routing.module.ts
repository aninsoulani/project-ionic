import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahMenuPage } from './tambah-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TambahMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahMenuPageRoutingModule {}
