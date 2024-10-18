import { Component, OnInit } from '@angular/core';
import { CitasService, Cita } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: Cita[] = [];
  newCita: Cita = { nombre: '', fecha: '', hora: '' }; // Inicializar una nueva cita vacía
  isEditing: boolean = false; // Estado para saber si estamos en modo de edición
  editingCitaId: number | null = null; // Almacenar el ID de la cita que se está editando

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.loadCitas(); // Cargar todas las citas al iniciar la página
  }

  // Método para cargar todas las citas desde el servicio
  loadCitas() {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data; // Asignar las citas obtenidas a la variable del componente
    });
  }

  // Método para agregar o editar una cita
  addCita() {
    if (this.isEditing && this.editingCitaId !== null) {
      // Si estamos editando, llamamos a updateCita
      this.citasService.updateCita(this.editingCitaId, this.newCita).subscribe((updatedCita) => {
        const index = this.citas.findIndex(c => c.id === this.editingCitaId);
        if (index !== -1) {
          this.citas[index] = updatedCita; // Actualizamos la cita en la lista
        }
        this.resetForm(); // Limpiar el formulario y salir del modo de edición
      });
    } else {
      // Si no estamos editando, agregamos una nueva cita
      this.citasService.addCita(this.newCita).subscribe((cita) => {
        this.citas.push(cita); // Añadir la nueva cita a la lista de citas
        this.resetForm(); // Limpiar el formulario después de agregar
      });
    }
  }

  // Método para seleccionar una cita y pasar a modo de edición
  editCita(cita: Cita) {
    this.newCita = { ...cita }; // Hacer una copia de la cita seleccionada para evitar modificar el original directamente
    this.isEditing = true; // Activar el modo de edición
    this.editingCitaId = cita.id !== undefined ? cita.id : null; // Asignar el ID de la cita, o null si no existe
  }

  // Método para eliminar una cita
  deleteCita(id: number) {
    this.citasService.deleteCita(id).subscribe(() => {
      this.citas = this.citas.filter(c => c.id !== id); // Filtrar la lista local para remover la cita eliminada
    });
  }

  // Método para resetear el formulario y salir del modo de edición
  resetForm() {
    this.newCita = { nombre: '', fecha: '', hora: '' }; // Limpiar los campos del formulario
    this.isEditing = false; // Desactivar el modo de edición
    this.editingCitaId = null; // Resetear el ID de edición
  }
}
