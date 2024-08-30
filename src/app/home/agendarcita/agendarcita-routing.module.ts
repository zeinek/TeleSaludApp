import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarcitaPage } from './agendarcita.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarcitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarcitaPageRoutingModule {}
