import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  username: string = ''; // Variable para almacenar el nombre de usuario

  constructor(private router: Router) { }

  ngOnInit() {
    // Verifica si existe una navegación actual y si el estado está definido
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      // Extrae el nombre de usuario de los datos de navegación
      this.username = navigation.extras.state['username'];
    } else {
      // Puedes manejar el caso en que no hay datos de navegación (por ejemplo, redirigir o mostrar un mensaje por defecto)
      console.log('No username found in navigation state');
    }
  }

}
