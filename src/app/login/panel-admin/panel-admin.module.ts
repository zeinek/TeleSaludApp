import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PanelAdminPageRoutingModule } from './panel-admin-routing.module';

import { PanelAdminPage } from './panel-admin.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PanelAdminPageRoutingModule
  ],
  declarations: [PanelAdminPage]
})
export class PanelAdminPageModule {}
