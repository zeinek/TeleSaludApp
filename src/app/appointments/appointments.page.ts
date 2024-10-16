import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointments: any[] = [];
  newAppointment = {
    name: '',
    date: '',
    description: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  async ngOnInit() {
    await this.appointmentService.initDB();
    await this.loadAppointments();
  }

  async loadAppointments() {
    this.appointments = await this.appointmentService.getAppointments() || [];
  }

  async addAppointment() {
    const { name, date, description } = this.newAppointment;
    await this.appointmentService.addAppointment(name, date, description);
    this.newAppointment = { name: '', date: '', description: '' };
    await this.loadAppointments();
  }

  async deleteAppointment(id: number) {
    await this.appointmentService.deleteAppointment(id);
    await this.loadAppointments();
  }
}
