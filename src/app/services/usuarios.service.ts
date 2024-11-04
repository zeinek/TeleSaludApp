import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  rut: string; // Puedes ajustar los tipos según tu necesidad
  nombreCompleto: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  contrasena: string;
  activo:number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL de tu servidor JSON o API REST

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Añadir un nuevo usuario
  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Actualizar un usuario existente
  updateUsuario(rut: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${rut}`, usuario); // Petición PUT para actualizar
  }

  // Eliminar un usuario
  deleteUsuario(rut: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${rut}`);
  }

  // Verificar si el usuario ya existe
  checkUserExists(rut: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${rut}`);
  }
}
