import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarcitaPageRoutingModule } from './agendarcita-routing.module';

import { AgendarcitaPage } from './agendarcita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarcitaPageRoutingModule
  ],
  declarations: [AgendarcitaPage]
})
export class AgendarcitaPageModule {}
