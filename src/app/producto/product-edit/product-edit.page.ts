import { Component, OnInit } from '@angular/core';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ClProducto } from '../model/ClProducto';
  import { ProductServiceService } from 'src/app/producto/producto-service.service';












  @Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.page.html',
    styleUrls: ['./product-edit.page.scss'],
  })






  export class ProductEditPage implements OnInit {


    nombreprodErrorL: string = '';
    precioErrorL: string = '';






    productForm!: FormGroup;
    producto: ClProducto = {
      idProducto: 0,
      codigo: '09-G1',
      nombreprod: '',
      precio: 0,
      cantidad: 0, // Nueva propiedad
      fechaNacimiento: '', // Nueva propiedad
      rut: '',
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
    id: any = '';


    constructor(
      public restApi: ProductServiceService,
      public loadingController: LoadingController,
      public alertController: AlertController,
      public route: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder
    ) {}


   async ngOnInit() {
  console.log("ngOnInit ID:" + this.route.snapshot.params['']);
  this.id = this.route.snapshot.params['id'];


  if (this.id !== undefined && this.id !== null) {
    await this.getProduct(this.id); // Asegúrate de esperar a que se complete la carga del producto.
    this.productForm = this.formBuilder.group({
      'nombreprod': [this.producto.nombreprod, Validators.required],
      'precio': [this.producto.precio, Validators.required],
      'direccion': [this.producto.direccion, Validators.required],
    });
  } else {
    console.error('ID es undefined o null');
    // Puedes mostrar un mensaje de error al usuario si es necesario.
  }
}


// async onFormSubmit() {
//   console.log("onFormSubmit ID:" + this.id);


//   if (this.productForm.valid) {
//     if (this.producto && this.producto.idProducto) {
//       this.producto.idProducto = this.id;
//       this.producto.nombreprod = this.productForm.value.nombreprod;
//       this.producto.direccion = this.productForm.value.direccion;
//       this.producto.precio = this.productForm.value.precio;


//       await this.restApi.updateProduct(this.id, this.producto).subscribe({
//         next: (res) => {
//           let id = res['idProducto'];
//           this.presentAlertConfirm('Producto actualizado exitosamente.');
//         },
//         complete: () => {},
//         error: (err) => {
//           console.log(err);
//           this.presentAlertConfirm('Error al actualizar el producto.');
//         },
//       });
//     } else {
//       console.error('El objeto producto o su propiedad idProducto es undefined');
//       // Puedes mostrar un mensaje de error al usuario si es necesario.
//     }
//   }
// }




async onFormSubmit() {
  if (this.productForm.valid) {
    this.nombreprodErrorL = ''; // Reinicia el mensaje de error
    this.precioErrorL = ''; // Reinicia el mensaje de error


    if (!/^[a-zA-Z]+$/.test(this.productForm.value.nombreprod)) {
      this.nombreprodErrorL = 'El nombre del producto solo debe contener letras.';
      return;
    }


    if (!/^\d+$/.test(this.productForm.value.precio.toString())) {
      this.precioErrorL = 'El precio del producto debe ser un número entero.';
      return;
    }
   


    if (this.producto && this.producto.idProducto) {
      this.producto.idProducto = this.id;
      this.producto.nombreprod = this.productForm.value.nombreprod;
      this.producto.direccion = this.productForm.value.direccion;
      this.producto.precio = this.productForm.value.precio;


      await this.restApi.updateProduct(this.id, this.producto).subscribe({
        next: (res) => {
          let id = res['idProducto'];
          this.presentAlertConfirm('Producto actualizado exitosamente.');
        },
        complete: () => {},
        error: (err) => {
          console.log(err);
          this.presentAlertConfirm('Error al actualizar el producto.');
        },
      });
    } else {
      console.error('El objeto producto o su propiedad idProducto es undefined');
      // Puedes mostrar un mensaje de error al usuario si es necesario.
    }
  }
}








async getProduct(id: number) {
  const loading = await this.loadingController.create({
    message: 'Loading...'
  });


  try {
    await loading.present();


    this.restApi.getProduct(id).subscribe({
      next: (data) => {
        console.log("getProductID data**");
        console.log(data);


        if (data) {
          // Verifica si data no es null ni undefined
          this.producto = data;


          if (this.producto.idProducto) {
            this.id = this.producto.idProducto;
          }


          if (this.producto.nombreprod) {
            this.productForm.setValue({
              nombreprod: this.producto.nombreprod || '',
              direccion: this.producto.direccion || '',
              precio: this.producto.precio || 0,
            });
          }
        }


        loading.dismiss();
      },
      error: (err) => {
        console.log("getProductID Error**");
        console.log(err);
        this.presentAlertConfirm('Error al cargar el producto.');
        loading.dismiss();
      },
    });
  } catch (error) {
    console.log("getProductID Error**");
    console.log(error);
    this.presentAlertConfirm('Error al cargar el producto.');
    loading.dismiss();
  }
}


    async presentAlertConfirm(msg: string) {
      const alert = await this.alertController.create({
        header: 'Warning!',
        message: msg,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.router.navigate(['/product-list/']);
            }
          }
        ]
      });
      await alert.present();
    }
  }


