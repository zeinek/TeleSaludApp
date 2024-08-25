import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-registro',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: string = '';
  contrasena: string = '';
  contrasenaError: string = '';
  recontrasena: string = '';
  fechaNacimiento: string = '';
  fechaError: string = '';
  correo: string = '';
  usuarioError: string = '';
  emailError: string = '';
  email: string = '';
  error: string = '';


  mostrarContrasena: boolean = false;


  constructor(private navCtrl: NavController, private toastController: ToastController, private storage: Storage) {
    this.storage.create(); // Inicializar el storage
  }


  async enviarRegistro() {
    // Limpiar mensajes de error al inicio
    this.usuarioError = '';
    this.fechaError = '';
    this.emailError = '';
    this.contrasenaError = '';
    this.error = '';
 
    // Validación del usuario
    if (!this.usuario) {
      this.usuarioError = 'El usuario es obligatorio.';
    } else if (!/^[a-zA-Z]+$/.test(this.usuario)) {
      this.usuarioError = 'El usuario debe contener solo letras.';
        } else {
      this.usuarioError = '';
  }


 
    // Validación de fecha de nacimiento
    if (!this.fechaNacimiento) {
      this.fechaError = 'La fecha de nacimiento es obligatoria.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(this.fechaNacimiento)) {
      this.fechaError = 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.';
    } else {
      this.fechaError = '';
     
    }
   


 
    // Validación del email
    if (!this.email) {
      this.emailError = 'El email es obligatorio.';
    } else if (!this.validarFormatoEmail(this.email)) {
      this.emailError = 'El email debe tener un formato válido.';
    } else {
      this.emailError = '';
    }
 
 
 
    // Validación de la contraseña
  if (!this.contrasena) {
    this.contrasenaError = 'La contraseña es obligatoria.';
  } else if (this.contrasena.length < 8) {
    this.contrasenaError = 'La contraseña debe tener al menos 8 caracteres.';
  } else if (!/[A-Z]/.test(this.contrasena)){
    this.contrasenaError = 'La contraseña debe contener al menos una letra mayúscula.';
  } else if(!/[0-9]/.test(this.contrasena)){
    this.contrasenaError = 'La contraseña debe contener al menos un número.';
  } else if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.contrasena)){
    this.contrasenaError = 'La contraseña debe contener al menos un carácter especial.';
  } else {
    this.contrasenaError = '';
  }
 
 
    if (!this.usuario || !this.fechaNacimiento || !this.email || !this.contrasena || !this.recontrasena) {
      this.error = 'Todos los campos son obligatorios.';
    } else if (this.contrasena !== this.recontrasena) {
      this.error = 'Las contraseñas no coinciden.';
    } else {  
      // Realizar el proceso de registro aquí
      this.error = ''; // Limpiar el mensaje de error
      // Redirigir a la página de éxito o hacer lo que sea necesario
      const toast = await this.toastController.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    }
 
    if (!this.usuarioError && !this.emailError && !this.contrasenaError && !this.error) {
      // Si no hay errores en ningún campo, redirigir a otra página


      const usuarioGuardado = await this.guardarUsuario();
    if (usuarioGuardado) {
      // Si el usuario se guardó correctamente
      // Mostrar mensaje de éxito y redirigir
      const toast = await this.toastController.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      console.log("usuario guardado")
      this.navCtrl.navigateForward('/login');
    } else {
      // Mostrar mensaje de que el usuario ya existe
      this.usuarioError = 'El usuario ya existe.';
    }
     
    }
  }


  // Validación solo para el formato del email
  validarFormatoEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }


 // Limpiar el mensaje de error del usuario cuando se cambia el valor del campo
 onUsuarioChange() {
  this.usuarioError = '';
}


// Limpiar el mensaje de error de la fecha de nacimiento cuando se cambia el valor del campo
onFechaNacimientoChange() {
  this.fechaError = '';
}


// Limpiar el mensaje de error del email cuando se cambia el valor del campo
onEmailChange() {
  this.emailError = '';
}


// Limpiar el mensaje de error de la contraseña cuando se cambia el valor del campo
onContrasenaChange() {
  this.contrasenaError = '';
}


toggleMostrarClave() {
  this.mostrarContrasena = !this.mostrarContrasena;
}
onRepetirClaveChange() {
  this.error = '';
}


async guardarUsuario() {
  const usuarios = (await this.storage.get('usuarios')) || {};
  if (usuarios[this.usuario]) {
    // El usuario ya existe
    return false;
  }
  usuarios[this.usuario] = { contrasena: this.contrasena, correo: this.correo, fechaNacimiento: this.fechaNacimiento };
  await this.storage.set('usuarios', usuarios);
  return true;
}








  ngOnInit() {
  }
}





