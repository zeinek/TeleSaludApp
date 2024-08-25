import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  public isAdmin = false; // Propiedad para controlar si el usuario es administrador

  constructor(private router: Router,private storage: Storage) {
    
  }




  // async authenticate(username: string, password: string): Promise<boolean> {
  //   await this.storage.create(); // Asegúrate de inicializar el storage

  //   const users = await this.storage.get('users') as any[] || [];
  //   const user = users.find(u => u.username === username && u.password === password);

  //   return user !== undefined;
  // }

  // async authenticate(username: string, password: string): Promise<boolean> {
  //   await this.storage.create();
  //   const users = await this.storage.get('usuarios') as {[key: string]: any} || {};
  //   const user = users[username];
  //   return user && user.contrasena === password;

    
  // }

  async authenticate(username: string, password: string): Promise<boolean> {
    await this.storage.create();
  
    // Verificación del usuario ADMIN
    if (username === 'ADMIN' && password === '#Kevinperedo00') {
      this.isAdmin = true;
      this.isAuthenticated = true; // Asumiendo que tienes esta propiedad para controlar la autenticación
      return true;
    }
  
    // Verificación para otros usuarios
    const users = await this.storage.get('usuarios') as {[key: string]: any} || {};
    const user = users[username];
  
    if (user && user.contrasena === password) {
      this.isAuthenticated = true; // Establecer que el usuario está autenticado
      this.isAdmin = false; // Asegurarse de que no es el usuario ADMIN
      return true;
    } else {
      this.isAuthenticated = false; // El usuario no está autenticado
      return false;
    }
  }
  

  


  // Método para iniciar sesión
  login() {
    this.isAuthenticated = true;
    this.isAdmin = true;
    // ... cualquier otra lógica de inicio de sesión
  }

  // Método para cerrar sesión
  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    // ... cualquier otra lógica de cierre de sesión
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}

