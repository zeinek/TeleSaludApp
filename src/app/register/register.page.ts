import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service'; // Importar el servicio

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
  email: string = '';
  usuarioError: string = '';
  emailError: string = '';
  error: string = '';
  mostrarContrasena: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private dbService: DatabaseService // Inyectar el servicio
  ) {}

  async enviarRegistro() {
    // Limpiar mensajes de error al inicio
    this.usuarioError = '';
    this.fechaError = '';
    this.emailError = '';
    this.contrasenaError = '';
    this.error = '';

    // Validación de usuario
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

    // Validación de email
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
    } else if (!/[A-Z]/.test(this.contrasena)) {
      this.contrasenaError = 'La contraseña debe contener al menos una letra mayúscula.';
    } else if (!/[0-9]/.test(this.contrasena)) {
      this.contrasenaError = 'La contraseña debe contener al menos un número.';
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.contrasena)) {
      this.contrasenaError = 'La contraseña debe contener al menos un carácter especial.';
    } else {
      this.contrasenaError = '';
    }

    if (!this.usuario || !this.fechaNacimiento || !this.email || !this.contrasena || !this.recontrasena) {
      this.error = 'Todos los campos son obligatorios.';
    } else if (this.contrasena !== this.recontrasena) {
      this.error = 'Las contraseñas no coinciden.';
    } else {
      this.error = ''; // Limpiar el mensaje de error

      // Validar si el usuario ya existe en la base de datos
      const userExists = await this.dbService.checkUserExists(this.usuario);
      if (userExists) {
        this.usuarioError = 'El usuario ya existe.';
        return;
      }

      // Intentar guardar el usuario en la base de datos
      const usuarioGuardado = await this.dbService.addUser(
        this.usuario,
        this.contrasena,
        this.email,
        this.fechaNacimiento
      );

      if (usuarioGuardado) {
        // Mostrar mensaje de éxito y redirigir
        const toast = await this.toastController.create({
          message: 'Registro exitoso',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.mostrarUsuariosGuardados(); // Llamar a la función para mostrar usuarios en la consola
        this.navCtrl.navigateForward('/login');
      } else {
        this.error = 'Error al registrar usuario.';
      }
    }
  }

  // Método para mostrar usuarios guardados en la base de datos
  async mostrarUsuariosGuardados() {
    const usuarios = await this.dbService.getAllUsers();
    console.log('Usuarios guardados en la base de datos:', usuarios);
  }

  // Validación solo para el formato del email
  validarFormatoEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Limpiar mensajes de error cuando cambia el valor de los campos
  onUsuarioChange() {
    this.usuarioError = '';
  }

  onFechaNacimientoChange() {
    this.fechaError = '';
  }

  onEmailChange() {
    this.emailError = '';
  }

  onContrasenaChange() {
    this.contrasenaError = '';
  }

  toggleMostrarClave() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  onRepetirClaveChange() {
    this.error = '';
  }

  ngOnInit() {}
}

