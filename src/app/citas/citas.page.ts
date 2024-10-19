import { Component, OnInit } from '@angular/core';
import { CitasService, Cita } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: Cita[] = []; // Almacena todas las citas cargadas
  newCita: Cita = { nombre: '', fecha: '', hora: '' }; // Modelo de la nueva cita o cita editada
  isEditing: boolean = false; // Estado de edición
  editingCitaId: number | null = null; // ID de la cita que se está editando

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.loadCitas(); // Cargar las citas cuando la página se inicializa
  }

  // Cargar todas las citas desde el servidor
  loadCitas() {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data; // Asignar las citas obtenidas a la variable del componente
    });
  }

  // Añadir una nueva cita
  addCita() {
    if (!this.isEditing) {
      // Si no estamos editando, creamos una nueva cita
      this.citasService.addCita(this.newCita).subscribe((cita) => {
        this.citas.push(cita); // Añadimos la nueva cita a la lista local
        this.resetForm(); // Limpiar el formulario después de crear
      });
    }
  }

  // Seleccionar una cita para editar
  editCita(cita: Cita) {
    this.newCita = { ...cita }; // Copiar la cita seleccionada al modelo del formulario
    this.isEditing = true; // Activar el modo edición
    this.editingCitaId = cita.id !== undefined ? cita.id : null; // Asignar el ID de la cita seleccionada
  }

  // Confirmar la actualización de la cita
  confirmUpdateCita() {
    if (this.isEditing && this.editingCitaId !== null) {
      this.citasService.updateCita(this.editingCitaId, this.newCita).subscribe((updatedCita) => {
        const index = this.citas.findIndex(c => c.id === this.editingCitaId);
        if (index !== -1) {
          this.citas[index] = updatedCita; // Actualizamos la cita en el array local
        }
        this.resetForm(); // Limpiar el formulario después de la actualización
      });
    }
  }

  // Eliminar una cita
  deleteCita(id: number) {
    this.citasService.deleteCita(id).subscribe(() => {
      this.citas = this.citas.filter(c => c.id !== id); // Filtrar la lista local para eliminar la cita
    });
  }

  // Resetear el formulario y salir del modo edición
  resetForm() {
    this.newCita = { nombre: '', fecha: '', hora: '' }; // Limpiar el formulario
    this.isEditing = false; // Desactivar el modo edición
    this.editingCitaId = null; // Resetear el ID de la cita en edición
  }
}
