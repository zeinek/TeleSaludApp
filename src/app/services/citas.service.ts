import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number; // El ID es opcional porque cuando creamos una cita nueva aún no tiene ID
  nombre: string;
  fecha: string;
  hora: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://localhost:3000/citas'; // URL de tu servidor JSON o API REST

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  // Añadir una nueva cita
  addCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  // Actualizar una cita existente
  updateCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita); // Petición PUT para actualizar
  }

  // Eliminar una cita
  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

