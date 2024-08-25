import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClPerfil } from '../model/ClPerfil';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service';


@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.page.html',
  styleUrls: ['./perfil-list.page.scss'],
})
export class PerfilListPage implements OnInit {
  perfiles: ClPerfil[] = [];


  constructor(
    public restApi: PerfilServiceService,
    public loadingController: LoadingController,
    public router: Router
  ) {}


  ngOnInit() {
    this.loadPerfiles();
  }


  ionViewWillEnter() {
    this.loadPerfiles();
  }


  async loadPerfiles() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });


    await loading.present();


    this.restApi.getPerfils().subscribe({
      next: (res) => {
        this.perfiles = res;
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log("Error:", err);
        loading.dismiss();
      },
    });
  }
}







