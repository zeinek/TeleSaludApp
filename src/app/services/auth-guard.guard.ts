import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';  // Ajusta el path si es necesario

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {  // Método que verifica si el usuario está autenticado
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
      return false;
    }
  }
}
