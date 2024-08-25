import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';  // Quité 'Router' aquí porque no lo estás usando en este código
import { ClPerfil } from '../model/ClPerfil';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service';
import { Router } from '@angular/router';  // Agregué la importación de 'Router' aquí


@Component({
  selector: 'app-perfil-add',
  templateUrl: './perfil-add.page.html',
  styleUrls: ['./perfil-add.page.scss'],
})
export class PerfilAddPage implements OnInit {
  perfilForm!: FormGroup;
  perfil: ClPerfil = {
    id: 0,
    usuario: '',
    correo: '',
    clave: '',
    fechanacimiento: new Date()
  };


  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: PerfilServiceService,
    private router: Router  // Asegúrate de tener esta línea y la importación correspondiente arriba
  ) {}


  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      perfil_user: [null, Validators.required],
      perfil_clave: [null, Validators.required],
      perfil_email: [null, Validators.required],
      perfil_fechanacimiento: [null, Validators.required],
    });
  }


  async onFormSubmit() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });


    await loading.present();


    await this.restApi.addPerfil(this.perfil).subscribe({
      next: (res) => {
        console.log("Next AddPerfil Page", res);
        loading.dismiss();
        if (res == null) {
          console.log("Next No Agrego, Ress Null ");
          return;
        }


        console.log("Next Agrego SIIIIII Router saltaré ;", this.router);
        this.router.navigate(['/perfil-list']);
      },
      complete: () => {},
      error: (err) => {
        console.log("Error AddProduct Página", err);
        loading.dismiss();
      }
    });


    console.log("Observe que todo lo del suscribe sale después de este mensaje");
  }
}







