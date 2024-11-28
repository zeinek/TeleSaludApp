import { Component, OnInit } from '@angular/core';
import { CitasService, Cita } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: Cita[] = [];
  newCita: Cita = { nombre: '', fecha: '', hora: '' };
  isEditing: boolean = false;
  editingCitaId: number | null = null;

  // Variables para mensajes de error
  errorMessages = {
    nombre: '',
    fecha: '',
    hora: '',
  };

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data;
    });
  }

  validateCita(): boolean {
    let isValid = true;

    // Validar nombre
    if (!this.newCita.nombre.trim()) {
      this.errorMessages.nombre = 'El nombre no puede estar vacío.';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(this.newCita.nombre)) {
      this.errorMessages.nombre = 'El nombre solo puede contener letras y espacios.';
      isValid = false;
    } else {
      this.errorMessages.nombre = '';
    }

    // Validar fecha
    if (!this.newCita.fecha) {
      this.errorMessages.fecha = 'La fecha no puede estar vacía.';
      isValid = false;
    } else {
      const today = new Date();
      const selectedDate = new Date(this.newCita.fecha);
      if (selectedDate < today) {
        this.errorMessages.fecha = 'La fecha debe ser futura.';
        isValid = false;
      } else {
        this.errorMessages.fecha = '';
      }
    }

    // Validar hora
    if (!this.newCita.hora) {
      this.errorMessages.hora = 'La hora no puede estar vacía.';
      isValid = false;
    } else {
      this.errorMessages.hora = '';
    }

    return isValid;
  }

  addCita() {
    if (this.validateCita()) {
      this.citasService.addCita(this.newCita).subscribe((cita) => {
        this.citas.push(cita);
        this.resetForm();
      });
    }
  }

  editCita(cita: Cita) {
    this.newCita = { ...cita };
    this.isEditing = true;
    this.editingCitaId = cita.id !== undefined ? cita.id : null;
  }

  confirmUpdateCita() {
    if (this.validateCita() && this.isEditing && this.editingCitaId !== null) {
      this.citasService.updateCita(this.editingCitaId, this.newCita).subscribe((updatedCita) => {
        const index = this.citas.findIndex((c) => c.id === this.editingCitaId);
        if (index !== -1) {
          this.citas[index] = updatedCita;
        }
        this.resetForm();
      });
    }
  }

  deleteCita(id: number) {
    this.citasService.deleteCita(id).subscribe(() => {
      this.citas = this.citas.filter((c) => c.id !== id);
    });
  }

  resetForm() {
    this.newCita = { nombre: '', fecha: '', hora: '' };
    this.isEditing = false;
    this.editingCitaId = null;
    this.errorMessages = { nombre: '', fecha: '', hora: '' };
  }
}
