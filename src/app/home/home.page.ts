import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'TeleSalud DICE:',
      message: 'Bienvenido, Tu CESFAM más cerca de ti. Aquí podrás solicitar atenciones presenciales o remotas de profesionales de tu CESFAM',
      buttons: ['Comenzar'],
    });

    await alert.present();
  }
}