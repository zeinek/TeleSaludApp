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

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data;
    });
  }

  addCita() {
    this.citasService.addCita(this.newCita).subscribe((cita) => {
      this.citas.push(cita);
      this.newCita = { nombre: '', fecha: '', hora: '' }; // Resetear el formulario
    });
  }

  editCita(cita: Cita) {
    this.newCita = cita;
  }

  deleteCita(id: number) {
    this.citasService.deleteCita(id).subscribe(() => {
      this.citas = this.citas.filter(c => c.id !== id);
    });
  }
}
