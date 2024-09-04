import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: string = '';
  saludo: string='';
  username: string='usuario';
  constructor(private userService: UserService) {}

  ngOnInit() {
    const username = this.userService.getNombreUsuario();
    if (username) {
      this.saludo = `Hola, ${username}`;
    } else {
      this.saludo = `Hola, ${username} bienvenido a TeleSalud`;
    }
  }
}
