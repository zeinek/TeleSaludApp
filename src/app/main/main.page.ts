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
    // Verificar si el estado de la navegación está definido
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
    } else {
      console.log('No se encontraron datos de usuario en el estado de la navegación.');
    }
  }
}
