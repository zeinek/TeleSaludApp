import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../services/usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  deactivateUser(rut: string) {
    const usuario = this.usuarios.find(u => u.rut === rut);
    if (usuario) {
      usuario.activo = 0;
      this.usuariosService.updateUsuario(rut, usuario).subscribe(() => {
        this.loadUsuarios(); // Recargar la lista de usuarios después de actualizar
      });
    }
  }

  activateUser(rut: string) {
    const usuario = this.usuarios.find(u => u.rut === rut);
    if (usuario) {
      usuario.activo = 1;
      this.usuariosService.updateUsuario(rut, usuario).subscribe(() => {
        this.loadUsuarios(); // Recargar la lista de usuarios después de actualizar
      });
    }
  }

  deleteUser(rut: string) {
    this.usuariosService.deleteUsuario(rut).subscribe(() => {
      this.loadUsuarios(); // Recargar la lista de usuarios después de eliminar
    });
  }
}
