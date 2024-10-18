import { Component } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage {
  citas: any[] = [];
  newCita = { nombre: '', fecha: '', hora: '' };
  editingIndex: number | null = null; 

  constructor() {}

  // Agregar o editar cita
  addCita() {
    if (this.newCita.nombre && this.newCita.fecha && this.newCita.hora) {
      if (this.editingIndex !== null) {
        this.citas[this.editingIndex] = { ...this.newCita };
        this.editingIndex = null; // Reiniciamos el índice de edición
      } else {
        // Si no estamos editando, agregamos una nueva cita
        this.citas.push({ ...this.newCita });
      }

      this.newCita = { nombre: '', fecha: '', hora: '' }; // Limpiar los campos después de agregar o editar
    } else {
      // Manejar validación si alguno de los campos está vacío
      console.log('Por favor, complete todos los campos.');
    }
  }

  // Preparar la cita para editarla
  editCita(cita: any, index: number) {
    this.newCita = { ...cita }; // Cargar los datos de la cita en el formulario
    this.editingIndex = index; // Guardar el índice de la cita que se va a editar
  }

  // Eliminar cita
  deleteCita(index: number) {
    this.citas.splice(index, 1); // Eliminar cita en el índice dado
    if (this.editingIndex === index) {
      // Si estamos editando la misma cita que eliminamos, limpiar el formulario
      this.newCita = { nombre: '', fecha: '', hora: '' };
      this.editingIndex = null;
    }
  }
}
