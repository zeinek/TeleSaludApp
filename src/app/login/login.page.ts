import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service'; // Asegúrate de que la ruta sea correcta
import { Storage } from '@ionic/storage-angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessages: string[] = [];
  username: string = '';
  password: string = '';
  usernameErrorL: string = '';


  passwordErrorL: string = '';
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private AuthService:AuthService,
    private storage: Storage
  ) {}




  // login() {
  //   const passwordPattern = /^(?=.*\d{4})(?=.*[a-zA-Z]{3})(?=.*[A-Z]).{8,}$/;
  //   const usernamePattern = /^[a-zA-Z]+$/; // Expresión regular que solo permite letras
 
  //   if (this.username.length < 3 || this.username.length > 8) {
  //     this.usernameErrorL = 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
  //   } else if (!usernamePattern.test(this.username)) {
  //     this.usernameErrorL = 'El nombre de usuario solo puede contener letras.';
  //   } else {
  //     this.usernameErrorL = '';
  //   }
 
  //   if (!passwordPattern.test(this.password)) {
  //     this.passwordErrorL = 'La contraseña debe cumplir con los requisitos.';
  //   } else {
  //     this.passwordErrorL = '';
  //   }
 
  //   if (!this.usernameErrorL && !this.passwordErrorL) {
  //     this.router.navigate(['/home', { username: this.username }]);
  //   }
  // }
 


  async login() {
    // const passwordPattern = /^(?=.*\d{4})(?=.*[a-zA-Z]{3})(?=.*[A-Z]).{8,}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;


    const usernamePattern = /^[a-zA-Z]+$/;
 
    if (this.username.length < 3 || this.username.length > 8 || !usernamePattern.test(this.username)) {
      this.usernameErrorL = 'El nombre de usuario debe tener entre 3 y 8 caracteres y solo puede contener letras.';
      return;
    } else {
      this.usernameErrorL = '';
    }
 
    if (!passwordPattern.test(this.password)) {
      this.passwordErrorL = 'La contraseña debe cumplir con los requisitos.';
      return;
    } else {
      this.passwordErrorL = '';
    }






   


 
    // Realiza la autenticación (verifica el nombre de usuario y la contraseña)
 
    // if (this.username === 'ADMIN' && this.password === 'Duocuc123*') {
    //   // Si el usuario es administrador, redirige a 'product-list'
    //   console.log("esta pasando ")
     
    //   this.AuthService.login();
    //   this.router.navigate(['/product-list']);
    // }




    // const isAuthenticated = await this.AuthService.authenticate(this.username, this.password);
    // if (isAuthenticated) {
    //   // Si la autenticación es exitosa, redirigir al home
    //   this.router.navigate(['/home', { username: this.username }]);
    // } else {
    //   // Si la autenticación falla, mostrar un mensaje de error
    //   this.showToast('Credenciales incorrectas');
    // }


    const isAuthenticated = await this.AuthService.authenticate(this.username, this.password);


    if (isAuthenticated && this.AuthService.isAdmin) {
        // Si el usuario es ADMIN, redirigir a product-list
        this.router.navigate(['/product-list']);
    } else if (isAuthenticated) {
        // Si la autenticación es exitosa para otros usuarios, redirigir a home
        this.router.navigate(['/home']);
    } else {
        // Si la autenticación falla, mostrar un mensaje de error
        this.showToast('Credenciales incorrectas');
    }
  }
 




 




  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }


  crearCuenta() {
    // Mostrar un mensaje cuando se hace clic en el botón "Crea tu cuenta gratis"
    this.showToast('Crea tu cuenta gratis ahora');


    // Redirigir a la página de registro
    this.router.navigate(['/register']); // Asegúrate de que '/registro' sea la ruta correcta
  }


  olvidasteContrasena() {
    // Implementa la lógica para el restablecimiento de contraseña aquí
    // Por ejemplo, puedes abrir un modal o navegar a una página de restablecimiento de contraseña.
    // Ejemplo:
    this.navCtrl.navigateForward(['/resetpass']); // Asegúrate de que '/reset-password' sea la ruta correcta
  }
}





