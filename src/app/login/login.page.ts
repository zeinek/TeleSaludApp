import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'; // Asegúrate de importar NavigationExtras
import { AuthService } from 'src/app/services/auth-service.service'; // Asegúrate de que la ruta sea correcta
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessages: string[] = [];
  username: string = '';
  password: string = '';
  usernameErrorL: string = '';
  passwordErrorL: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private AuthService: AuthService,
    private storage: Storage,
    private userService: UserService
  ) {}

  async login() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;
    const usernamePattern = /^[a-zA-Z]+$/;

    if (this.username.length < 3 || this.username.length > 8 || !usernamePattern.test(this.username)) {
      this.usernameErrorL = 'El nombre de usuario debe tener entre 3 y 8 caracteres y solo puede contener letras.';
      return;
    } else {
      this.usernameErrorL = '';
    }

    if (!passwordPattern.test(this.password)) {
      this.passwordErrorL = 'La contraseña debe cumplir con los requisitos.';
      return;
    } else {
      this.passwordErrorL = '';
    }

    const isAuthenticated = await this.AuthService.authenticate(this.username, this.password);

    if (isAuthenticated) {
      // Si la autenticación es exitosa, almacenar el nombre de usuario en Storage
      await this.storage.set('loggedInUser', this.username);

      // Usar NavigationExtras para pasar el nombre de usuario a la página main
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.username
        }
      };

      // Redirigir a la página main pasando el nombre de usuario
      this.router.navigate(['/main'], navigationExtras);
    } else {
      // Mostrar un mensaje de error si las credenciales son incorrectas
      this.showToast('Credenciales incorrectas');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  crearCuenta() {
    this.showToast('Crea tu cuenta gratis ahora mismo.');
    this.router.navigate(['/register']);
  }

  olvidasteContrasena() {
    this.navCtrl.navigateForward(['/resetpass']);
  }
}
