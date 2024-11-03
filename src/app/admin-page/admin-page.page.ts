import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    await this.loadUsuarios();
  }

  async loadUsuarios() {
    this.usuarios = await this.databaseService.getAllUsers();
  }

  async deactivateUser(rut: string) {
    await this.databaseService.deactivateUser(rut);
    await this.loadUsuarios();
  }

  async activateUser(rut: string) {
    await this.databaseService.activateUser(rut);
    await this.loadUsuarios();
  }

  async deleteUser(rut: string) {
    await this.databaseService.deleteUser(rut);
    await this.loadUsuarios();
  }
}
