import { Injectable } from '@angular/core';
import { ClPerfil } from './model/ClPerfil';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';




// Importamos  las librerías necesarias
// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/usuarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class PerfilServiceService {
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient) { }


  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }


  // Método Agregar perfil, y devuelve un observable del tipo perfil
  // Debe ser un Observable si deses suscribir este método en otro lado
  addPerfil(perfil: ClPerfil): Observable<ClPerfil> {
    console.log("Res-api Enviando AddPerfil : ", perfil);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<ClPerfil>(apiUrl, perfil, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((perfil: ClPerfil) => console.log('added perfil w/:', perfil)),
        // En caso de que ocurra Error
        catchError(this.handleError<ClPerfil>('addPerfil'))
      );
  }


  // Obtenemos todos los Productos
  getPerfils(): Observable<ClPerfil[]> {
    console.log("getPerfils ()");
    return this.http.get<ClPerfil[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched perfils')),
        catchError(this.handleError('getPerfils', []))
      );
  }




  //  Obtener un Producto
  getPerfil(id: number): Observable<ClPerfil> {


    //const url = '${apiUrl}/${id}';
    //return this.http.get<Perfil>(url).pipe(
    console.log("getPerfil ID:" + id);
    return this.http.get<ClPerfil>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched perfil id=${id}')),
        catchError(this.handleError<ClPerfil>('getPerfil id=${id}'))
      );
  }


  deletePerfil(id: number): Observable<ClPerfil> {
    //const url = '${apiUrl}/${id}';
    //return this.http.delete<Perfil>(url, httpOptions).pipe(
    return this.http.delete<ClPerfil>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted perfil id=${id}')),
        catchError(this.handleError<ClPerfil>('deletePerfil'))
      );
  }


  updatePerfil(id: number, perfil: ClPerfil): Observable<ClPerfil> {
    return this.http.put<ClPerfil>(apiUrl + "/" + id, perfil, httpOptions)
      .pipe(
        tap(_ => console.log('updated perfil id=${id}')),
        catchError(this.handleError<any>('updatePerfil'))
      );
  }




}

