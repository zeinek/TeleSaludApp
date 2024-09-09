import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: string = '';
  saludo: string='';
  username: string='usuario';
  //constructor(private userService: UserService) {}

  //ngOnInit() {
    //const username = this.userService.getNombreUsuario();
    //if (username) {
      //this.saludo = `Hola, ${username}`;
    //} else {
      //this.saludo = `Hola, ${username} bienvenido a TeleSalud`;
    //}
  //}
  constructor(private userService: UserService, private storage: Storage) {}

  async ngOnInit() {
    // Inicializar el Storage si no lo has hecho antes
    await this.storage.create();

    // Intentar obtener el nombre del usuario del servicio
    let username = this.userService.getNombreUsuario();

    // Si no está disponible en el servicio, obtenerlo del Storage
    if (!username) {
      username = await this.storage.get('loggedInUser');
    }

    // Personalizar el saludo
    if (username) {
      this.saludo = `Bienvenido a TeleSalud ${username}`;
    } else {
      this.saludo = 'Hola, bienvenido a TeleSalud';
    }
  }
}
