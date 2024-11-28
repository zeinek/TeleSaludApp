import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../services/user.service';
import { Geolocation } from '@capacitor/geolocation';  // Importar Geolocation

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

  mostrarContrasena: boolean = false; // Controla la visibilidad de la contraseña

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private AuthService: AuthService,
    private storage: Storage,
    private userService: UserService
  ) {}

  // Alterna la visibilidad de la contraseña
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async login() {
    // Nueva expresión regular para validar la contraseña
    const passwordPattern = /^(?=(.*\d){4})(?=(.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    const usernamePattern = /^[a-zA-Z]+$/;
  
    // Validación del nombre de usuario
    if (this.username.length < 3 || this.username.length > 8 || !usernamePattern.test(this.username)) {
      this.usernameErrorL = 'El nombre de usuario debe tener entre 3 y 8 caracteres y solo puede contener letras.';
      return;
    } else {
      this.usernameErrorL = '';
    }
  
    // Validación de la contraseña
    if (!passwordPattern.test(this.password)) {
      this.passwordErrorL = 'La contraseña debe contener al menos 4 números, 3 letras y 1 mayúscula.';
      return;
    } else {
      this.passwordErrorL = '';
    }
  
    // Intento de autenticación con las credenciales ingresadas
    const isAuthenticated = await this.AuthService.authenticate(this.username, this.password);
  
    if (isAuthenticated) {
      // Guardar el nombre de usuario en Storage
      await this.storage.set('loggedInUser', this.username);
  
      // Obtener la ubicación del usuario
      this.getCurrentLocation();  // Llamar a la función de ubicación
  
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.username
        }
      };
  
      // Redirigir a la página main
      this.router.navigate(['/main'], navigationExtras);
    } else {
      this.showToast('Credenciales incorrectas');
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Ubicación actual:', coordinates);  // Aquí puedes manejar la ubicación

      // Si necesitas almacenar la ubicación o enviarla al servidor, hazlo aquí
      const { latitude, longitude } = coordinates.coords;
      console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);

      // Aquí puedes guardar las coordenadas en el almacenamiento o en la base de datos
      await this.storage.set('userLocation', { latitude, longitude });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.showToast('No se pudo obtener la ubicación');
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
