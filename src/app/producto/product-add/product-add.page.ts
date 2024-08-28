import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from 'src/app/producto/producto-service.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
 
  nombreprodErrorL: string ="";
  precioErrorL: string ="";
  direccionErrorL: string = "";


  productForm!: FormGroup;
  // Generalmente se usa una interface, sin embargo para jugar utilizaremos  una clase
  producto: ClProducto = {
    idProducto: 0,
    codigo: '09-G01',
    nombreprod: '',
    precio: 0,
    cantidad: 0, // Nueva propiedad
    fechaNacimiento: '', // Nueva propiedad
    rut:'0',
    dv: '0', // Nueva propiedad
    enfermedad: '0', // Nueva propiedad
    fonocontacto: 0, // Nueva propiedad
    categoria: '0', // Nueva propiedad
    editorial: '0', // Nueva propiedad
    raza: '0', // Nueva propiedad
    edad: 0, // Nueva propiedad
    altura: 0, // Nueva propiedad
    hrini: '0', // Nueva propiedad
    hrfin: '0', // Nueva propiedad
    direccion: '', // Nueva propiedad
    fCreacion: '', // Nueva propiedad
  };


  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones                        
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) { }


  // Antes que inicie en pantalla
  // especificamos las validaciones,
  //    por medio de formBuilder injectado en el constructor
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.productForm = this.formBuilder.group({
      "prod_name": [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
    });
  }




async onFormSubmit(form: NgForm) {
  // Reset de mensajes de error
  this.nombreprodErrorL = '';
  this.precioErrorL = '';
  this.direccionErrorL = '';




  // Validación para el nombre del producto (solo letras)
  if (!/^[A-Za-z]+$/.test(this.producto.nombreprod)) {
    this.nombreprodErrorL = 'El nombre del producto debe contener solo letras.';
    return;
  }


  // Validación para el precio (solo números)
  if (!/^\d+$/.test(this.producto.precio.toString())) {
    this.precioErrorL = 'El precio del producto debe ser un número entero válido.';
    return;
  }


    // Validación para el precio (solo números)
    if (!/^[A-Za-z]+$/.test(this.producto.direccion)) {
      this.direccionErrorL = 'La descripcion del producto debe contener solo letras.';
      return;
    }
 


  // Crear un Loading Controller
  const loading = await this.loadingController.create({
    message: 'Cargando...'
  });


  // Mostrar el Loading Controller
  await loading.present();


  // Antes de realizar la solicitud
  console.log("Datos que se van a enviar:", this.producto);


  // Ejecutar el método del servicio y suscribirse
  await this.restApi.addProduct(this.producto)
    .subscribe({
      next: (res) => {
        console.log("Next AddProduct Page", res);
        loading.dismiss(); // Eliminar el mensaje de espera
        if (res == null) { // No hay respuesta del registro
          console.log("Next No se agregó, Res es Null");
          return;
        }
        // Si hay respuesta
        console.log("Next ¡Se agregó correctamente! Navegaré a la lista de productos;", this.router);
        this.router.navigate(['/product-list']);
      },
      complete: () => { },
      error: (err) => {
        console.log("Error AddProduct Página", err);
        loading.dismiss(); // Eliminar el mensaje de espera
      }
    });
  console.log("Observe que todo lo del suscribe sale después de este mensaje");
}




}




