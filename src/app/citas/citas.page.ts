import { Component, OnInit } from '@angular/core';
import { CitasService } from '../services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: any[] = [];
  form = { paciente: '', motivo: '', fecha: '', hora: '' };
  editingId: number | null = null;

  constructor(private citasService: CitasService) {}

  async ngOnInit() {
    await this.citasService.initializeDatabase();
    this.loadCitas();
  }

  async loadCitas() {
    this.citas = await this.citasService.getCitas();
  }

  async addOrUpdateCita() {
    if (this.editingId) {
      await this.citasService.updateCita(
        this.editingId,
        this.form.paciente,
        this.form.motivo,
        this.form.fecha,
        this.form.hora
      );
      this.editingId = null;
    } else {
      await this.citasService.addCita(
        this.form.paciente,
        this.form.motivo,
        this.form.fecha,
        this.form.hora
      );
    }
    this.form = { paciente: '', motivo: '', fecha: '', hora: '' };
    this.loadCitas();
  }

  editCita(cita: any) {
    this.editingId = cita.id;
    this.form = {
      paciente: cita.paciente,
      motivo: cita.motivo,
      fecha: cita.fecha,
      hora: cita.hora,
    };
  }

  async deleteCita(id: number) {
    await this.citasService.deleteCita(id);
    this.loadCitas();
  }
}