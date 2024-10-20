import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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
  mostrarContrasena: boolean = false; // Para alternar visibilidad de la contraseña

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  async login() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;
    const usernamePattern = /^[a-zA-Z]+$/;

    // Validar nombre de usuario
    if (this.username.length < 3 || this.username.length > 8 || !usernamePattern.test(this.username)) {
      this.usernameErrorL = 'El nombre de usuario debe tener entre 3 y 8 caracteres y solo puede contener letras.';
      return;
    } else {
      this.usernameErrorL = '';
    }

    // Validar contraseña
    if (!passwordPattern.test(this.password)) {
      this.passwordErrorL = 'La contraseña debe cumplir con los requisitos.';
      return;
    } else {
      this.passwordErrorL = '';
    }

    // Obtener los usuarios guardados en el almacenamiento
    const usuarios = await this.storage.get('usuarios');
    if (!usuarios) {
      this.showToast('No hay usuarios registrados.');
      return;
    }

    // Verificar si el usuario existe y la contraseña coincide
    const usuarioGuardado = usuarios[this.username];
    if (usuarioGuardado && usuarioGuardado.contrasena === this.password) {
      // Autenticación exitosa
      await this.storage.set('loggedInUser', this.username); // Guardar el usuario logueado en el storage
      this.showToast('Inicio de sesión exitoso');
      this.router.navigate(['/main']); // Redirigir a la página principal
    } else {
      // Credenciales incorrectas
      this.showToast('Credenciales incorrectas.');
    }
  }

  // Alternar visibilidad de la contraseña
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  // Mostrar mensaje emergente
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  // Redirigir al registro
  crearCuenta() {
    this.router.navigate(['/register']);
  }

  // Redirigir a la página de recuperación de contraseña
  olvidasteContrasena() {
    this.navCtrl.navigateForward(['/resetpass']);
  }
}
