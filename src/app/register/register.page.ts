import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // Definición de los campos de usuario
  rut: string = '';
  nombreCompleto: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  fechaNacimiento: string = '';
  contrasena: string = '';
  recontrasena: string = '';

  // Definición de variables para errores
  rutError: string = '';
  nombreCompletoError: string = '';
  direccionError: string = '';
  telefonoError: string = '';
  emailError: string = '';
  fechaError: string = '';
  contrasenaError: string = '';
  error: string = '';

  // Control de visibilidad de las contraseñas
  mostrarContrasena: boolean = false;
  mostrarRecontrasena: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private dbService: DatabaseService
  ) {}

  async enviarRegistro() {
    // Limpiar mensajes de error al inicio
    this.rutError = '';
    this.nombreCompletoError = '';
    this.direccionError = '';
    this.telefonoError = '';
    this.emailError = '';
    this.fechaError = '';
    this.contrasenaError = '';
    this.error = '';

    // Validaciones para cada campo
    if (!this.rut) {
      this.rutError = 'El RUT es obligatorio.';
    } else if (!/^\d{1,8}-[kK\d]{1}$/.test(this.rut)) {
      this.rutError = 'El RUT debe tener el formato correcto (ej: 12345678-9).';
    }

    if (!this.nombreCompleto) {
      this.nombreCompletoError = 'El nombre completo es obligatorio.';
    }

    if (!this.direccion) {
      this.direccionError = 'La dirección es obligatoria.';
    }

    if (!this.telefono) {
      this.telefonoError = 'El teléfono es obligatorio.';
    } else if (!/^\d{9,10}$/.test(this.telefono)) {
      this.telefonoError = 'El teléfono debe tener entre 9 y 10 dígitos.';
    }

    if (!this.email) {
      this.emailError = 'El email es obligatorio.';
    } else if (!this.validarFormatoEmail(this.email)) {
      this.emailError = 'El email debe tener un formato válido.';
    }

    if (!this.fechaNacimiento) {
      this.fechaError = 'La fecha de nacimiento es obligatoria.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(this.fechaNacimiento)) {
      this.fechaError = 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.';
    }

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
    }

    if (this.contrasena !== this.recontrasena) {
      this.error = 'Las contraseñas no coinciden.';
    }

    if (
      !this.rut ||
      !this.nombreCompleto ||
      !this.direccion ||
      !this.telefono ||
      !this.email ||
      !this.fechaNacimiento ||
      !this.contrasena ||
      !this.recontrasena
    ) {
      this.error = 'Todos los campos son obligatorios.';
    }

    if (this.error || this.rutError || this.nombreCompletoError || this.direccionError || this.telefonoError || this.emailError || this.fechaError || this.contrasenaError) {
      return;
    }

    const userExists = await this.dbService.checkUserExists(this.rut);
    if (userExists) {
      this.rutError = 'El usuario ya existe.';
      return;
    }

    // Llamar a addUser con los parámetros individuales
    const usuarioGuardado = await this.dbService.addUser(
      this.rut,
      this.nombreCompleto,
      this.direccion,
      this.telefono,
      this.email,
      this.fechaNacimiento,
      this.contrasena
    );

    if (usuarioGuardado) {
      const toast = await this.toastController.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.mostrarUsuariosGuardados();
      this.navCtrl.navigateForward('/login');
    } else {
      this.error = 'Error al registrar usuario.';
    }
  }

  async mostrarUsuariosGuardados() {
    const usuarios = await this.dbService.getAllUsers();
    console.log('Usuarios guardados en la base de datos:', usuarios);
  }

  validarFormatoEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Funciones para mostrar/ocultar contraseñas
  toggleMostrarClave() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMostrarReclave() {
    this.mostrarRecontrasena = !this.mostrarRecontrasena;
  }
}
