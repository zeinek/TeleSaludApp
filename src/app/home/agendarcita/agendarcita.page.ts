import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendarcita',
  templateUrl: './agendarcita.page.html',
  styleUrls: ['./agendarcita.page.scss'],
})
export class AgendarcitaPage {
  nombre: string = '';
  correo: string = '';
  fecha: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  async agendarCita() {
    if (this.nombre && this.correo && this.fecha) {
      const alert = await this.alertController.create({
        header: `Cita Agendada para ${this.nombre}`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.resetForm();
              this.presentToast('Has sido redirigido al inicio.');
              this.router.navigate(['/home']);
            },
          },
        ],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario Incompleto',
        message: 'Por favor, complete todos los datos antes de agendar su cita.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  resetForm() {
    this.nombre = '';
    this.correo = '';
    this.fecha = '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    toast.present();
  }
}
