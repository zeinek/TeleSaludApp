import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilDetailPageRoutingModule } from './perfil-detail-routing.module';
import { PerfilDetailPage } from './perfil-detail.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilDetailPageRoutingModule
  ],
  declarations: [PerfilDetailPage]
})
export class PerfilDetailPageModule {}





