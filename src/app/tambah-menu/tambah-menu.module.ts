import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahMenuPageRoutingModule } from './tambah-menu-routing.module';

import { TambahMenuPage } from './tambah-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahMenuPageRoutingModule
  ],
  declarations: [TambahMenuPage]
})
export class TambahMenuPageModule {}
