import { Component, OnInit } from '@angular/core';
import { ClPerfil } from '../model/ClPerfil';


@Component({
  selector: 'app-perfil-all',
  templateUrl: './perfil-all.page.html',
  styleUrls: ['./perfil-all.page.scss'],
})
export class PerfilAllPage implements OnInit {


  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  perfil: ClPerfil = { id: 0, fechanacimiento: new Date(0), usuario: '', correo: '', clave:'' };;


  constructor() { }
  ngOnInit() {  }
  public id: string = '';




  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }


}





