import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAddPage } from './perfil-add.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAddPageRoutingModule {}
