import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClPerfil } from '../model/ClPerfil';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service';


@Component({
  selector: 'app-perfil-detail',
  templateUrl: './perfil-detail.page.html',
  styleUrls: ['./perfil-detail.page.scss'],
})
export class PerfilDetailPage implements OnInit {


  perfil: ClPerfil = {
    id: 0,
    usuario: '',
    correo: '',
    clave: '',
    fechanacimiento: new Date()
  };


  constructor(
    public restApi: PerfilServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }


  ngOnInit() {
    this.getPerfil();
  }


  async getPerfil() {
    const idParam = this.route.snapshot.paramMap.get('id');
   
    if (idParam !== null && idParam !== undefined) {
      const perfilId = +idParam;
     
      const loading = await this.loadingController.create({ message: 'Loading...' });
      await loading.present();


      this.restApi.getPerfil(perfilId)
        .subscribe({
          next: (res) => {
            console.log("Data *****************");
            console.log(res);
            this.perfil = res;
            loading.dismiss();
          },
          complete: () => { },
          error: (err) => {
            console.log("Error DetailPerfil Página", err);
            loading.dismiss();
          }
        });
    } else {
      // Handle the case where 'id' is null or undefined
      console.error("ID is null or undefined");
    }
  }


  async delete(id: number) {
    this.presentAlertConfirm(id, 'Confirme la Eliminación, De lo contrario, cancele');
  }


  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Eliminar : ' + id + " OK",
          handler: () => {
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    await alert.present();
  }


  async deleteConfirmado(id: number) {
    alert("Eliminando " + id)
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.restApi.deletePerfil(id)
      .subscribe({
        next: (res) => {
          console.log("Error DetailPerfil Página", res);
          loading.dismiss();
          this.router.navigate(['/perfil-list']);
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailPerfil Página", err);
          loading.dismiss();
        }
      })
  }
}







