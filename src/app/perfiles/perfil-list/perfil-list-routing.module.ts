import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilListPage } from './perfil-list.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilListPageRoutingModule {}
