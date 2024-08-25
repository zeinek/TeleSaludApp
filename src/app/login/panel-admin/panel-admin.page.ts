import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.page.html',
  styleUrls: ['./panel-admin.page.scss'],
})
export class PanelAdminPage {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}
