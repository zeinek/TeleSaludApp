// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios
// al menos que se declare como opcional con signo de pregunta


export class ClPerfil {
    id: number
    fechanacimiento: Date
    usuario: string
    correo: string  
    clave: string
 


 
    // si no Inicializo los valores, da Error
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.fechanacimiento = obj && obj.fechanacimiento || null
          this.usuario = obj && obj.usuario || null
          this.correo = obj && obj.correo || null
          this.clave = obj && obj.clave || null
         
         
      }
  }







