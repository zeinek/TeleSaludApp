import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClPerfil } from '../model/ClPerfil';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service';


@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.page.html',
  styleUrls: ['./perfil-edit.page.scss'],
})
export class PerfilEditPage implements OnInit {
  perfilForm!: FormGroup;
  perfil: ClPerfil = { id: 0, usuario: '', correo: '', clave: '', fechanacimiento: new Date() };
  id: number = 0;


  constructor(
    public restApi: PerfilServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.getPerfil(this.id);
      }
    });


    this.perfilForm = this.formBuilder.group({
      'perfil_username': [null, Validators.required],
      'perfil_mail': [null, Validators.required],
      'perfil_password': [null, Validators.required],
      'perfil_fechanacimiento': [null, Validators.required],
    });
  }


  async onFormSubmit() {
    console.log('onFormSubmit ID:' + this.id);


    if (this.perfilForm.valid) {
      this.perfil.id = this.id;
      this.perfil.usuario = this.perfilForm.value.perfil_username;
      this.perfil.correo = this.perfilForm.value.perfil_mail;
      this.perfil.clave = this.perfilForm.value.perfil_password;
      this.perfil.fechanacimiento = this.perfilForm.value.perfil_fechanacimiento;


      await this.restApi.updatePerfil(this.id, this.perfil).subscribe({
        next: (res) => {
          let id = res['id'];
          // this.router.navigate(['/perfil-detail/' + this.id]);
          this.router.navigate(['/perfil-list/']); // Cambié la ruta aquí
        },
        complete: () => {},
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  async getPerfil(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });


    await loading.present();


    await this.restApi.getPerfil(Number(id)).subscribe({
      next: (data) => {
        console.log('getProductID data****');
        console.log(data);


        this.id = data.id;


        this.perfilForm.setValue({
          perfil_username: data.usuario,
          perfil_mail: data.correo,
          perfil_password: data.clave,
          perfil_fechanacimiento: data.fechanacimiento,
        });


        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log('getPerfilID Errr****+');
        console.log(err);
        loading.dismiss();
      },
    });
  }


  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/perfil-list/']);
          },
        },
      ],
    });
    await alert.present();
  }
}









