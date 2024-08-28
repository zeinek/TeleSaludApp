import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDetailPage } from './perfil-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDetailPageRoutingModule {}
