export class ClProducto {
  idProducto: number;
  codigo: string;
  nombreprod: string;
  precio: number;
  cantidad: number;
  fechaNacimiento: string;
  rut: string | null;
  dv: string;
  enfermedad: string;
  fonocontacto: number;
  categoria: string;
  editorial: string;
  raza: string;
  edad: number;
  altura: number;
  hrini: string;
  hrfin: string;
  direccion: string;
  fCreacion: string;


  constructor(obj: any) {
    this.idProducto = obj && obj.idProducto || null;
    this.codigo = obj && obj.codigo || "";
    this.nombreprod = obj && obj.nombreprod || "";
    this.precio = obj && obj.precio || null;
    this.cantidad = obj && obj.cantidad || null;
    this.fechaNacimiento = obj && obj.fechaNacimiento || "";
    this.rut = obj && obj.rut || null;
    this.dv = obj && obj.dv || "";
    this.enfermedad = obj && obj.enfermedad || "";
    this.fonocontacto = obj && obj.fonocontacto || null;
    this.categoria = obj && obj.categoria || "";
    this.editorial = obj && obj.editorial || "";
    this.raza = obj && obj.raza || "";
    this.edad = obj && obj.edad || null;
    this.altura = obj && obj.altura || null;
    this.hrini = obj && obj.hrini || "";
    this.hrfin = obj && obj.hrfin || "";
    this.direccion = obj && obj.direccion || "";
    this.fCreacion = obj && obj.fCreacion || "";
  }
 
}
























