import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  public isAdmin = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private dbService: DatabaseService // Inyección del servicio de base de datos
  ) {}

  async authenticate(rut: string, password: string): Promise<boolean> {
    await this.storage.create();

    // Verificación del usuario ADMIN usando un RUT y contraseña específicos en Storage
    if (rut === '1234-5' && password === 'Admin1234#') {
      this.isAdmin = true;
      this.isAuthenticated = true;
      return true;
    }

    // Verificación para otros usuarios almacenados en SQLite
    const users = await this.storage.get('usuarios') as { [key: string]: any } || {};
    const user = users[rut];

    if (user && user.contrasena === password && user.activo === 1) {
    this.isAuthenticated = true;
    this.isAdmin = false;
    return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
}

  // Método para iniciar sesión (si deseas activarlo manualmente en otros contextos)
  login() {
    this.isAuthenticated = true;
    this.isAdmin = true;
  }

  // Método para cerrar sesión
  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
