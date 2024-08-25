import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';


import { PerfilListPageRoutingModule } from './perfil-list-routing.module';


import { PerfilListPage } from './perfil-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilListPageRoutingModule
  ],
  declarations: [PerfilListPage]
})
export class PerfilListPageModule {}





