import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { Storage } from '@ionic/storage-angular';

import { LoginPage } from './login.page'; // Asegúrate de que la ruta sea correcta

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        NavController,
        ToastController,
        Router,
        AuthService,
        // Proporciona el servicio Storage como un proveedor en el módulo de prueba
        { provide: Storage, useClass: class {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
