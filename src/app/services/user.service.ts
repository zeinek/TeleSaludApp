import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nombreUsuario: string = '';

  constructor() {}

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
}
