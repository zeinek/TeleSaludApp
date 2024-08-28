import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAllPage } from './perfil-all.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAllPageRoutingModule {}
