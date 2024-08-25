import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';


import { PerfilAllPageRoutingModule } from './perfil-all-routing.module';


import { PerfilAllPage } from './perfil-all.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAllPageRoutingModule
  ],
  declarations: [PerfilAllPage]
})
export class PerfilAllPageModule {}





