import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agendarcita',
  templateUrl: './agendarcita.page.html',
  styleUrls: ['./agendarcita.page.scss'],
})
export class AgendarcitaPage {
  cita = {
    nombre: '',
    fecha: '',
    hora: '',
    descripcion: ''
  };

  constructor(private navCtrl: NavController) {}

  agendarCita() {
    console.log('Cita agendada:', this.cita);
    // Aquí puedes manejar la lógica para guardar la cita, enviar a un backend, etc.
    this.navCtrl.back(); // Regresar a la página anterior después de agendar
  }
}

