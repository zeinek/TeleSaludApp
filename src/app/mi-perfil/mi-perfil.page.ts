import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  username: string = '';
  correo: string = '';
  fechaNacimiento: string = '';

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento

    // Obtener el usuario logueado
    const loggedInUser = await this.storage.get('loggedInUser');
    if (loggedInUser) {
      this.username = loggedInUser;
      // Obtener los datos completos del usuario
      const usuarios = await this.storage.get('usuarios');
      if (usuarios && usuarios[loggedInUser]) {
        const user = usuarios[loggedInUser];
        this.correo = user.correo;
        this.fechaNacimiento = user.fechaNacimiento;
      }
    } else {
      this.router.navigate(['/login']); // Si no está logueado, redirigir al login
    }
  }
}

