import { Component, OnInit } from '@angular/core';
import { ClProducto } from '../model/ClProducto';
@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  producto: ClProducto = {
    idProducto: 0,
    codigo: '09-G01',
    nombreprod: '',
    precio: 0,
    cantidad: 0, // Nueva propiedad
    fechaNacimiento: '', // Nueva propiedad
    rut:'',
    dv: '', // Nueva propiedad
    enfermedad: '0', // Nueva propiedad
    fonocontacto: 0, // Nueva propiedad
    categoria: '0', // Nueva propiedad
    editorial: '0', // Nueva propiedad
    raza: '0', // Nueva propiedad
    edad: 0, // Nueva propiedad
    altura: 0, // Nueva propiedad
    hrini: '0', // Nueva propiedad
    hrfin: '0', // Nueva propiedad
    direccion: '0', // Nueva propiedad
    fCreacion: '', // Nueva propiedad
  };;


  constructor() { }
  ngOnInit() {  }
  public id: string = '';




  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}




