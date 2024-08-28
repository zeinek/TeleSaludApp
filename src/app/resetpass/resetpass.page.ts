import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage {
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  enviarCorreo() {
    if (!this.isValidEmail(this.email)) {
      this.mostrarToast('Por favor, ingresa una dirección de correo electrónico válida.');
      return;
    }
    this.mostrarToast(
      'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.'
    );
    this.regresarAlLogin(); // Agrega esta línea para redirigir al login
  }

  regresarAlLogin() {
    this.router.navigate(['/login']);
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top',
    });
    await toast.present();
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
