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
    } else if (!this.validarFechaReal(this.fechaNacimiento)) {
      this.fechaError = 'La fecha de nacimiento no es válida.';
    } else if (!this.validarRangoEdad(this.fechaNacimiento)) {
      this.fechaError = 'Debes tener entre 1 y 120 años para registrarte.';
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
    const passwordPattern = /^(?=(.*\d){4})(?=(.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    if (!this.contrasena) {
      this.contrasenaError = 'La contraseña es obligatoria.';
    } else if (!passwordPattern.test(this.contrasena)) {
      this.contrasenaError = 'La contraseña debe contener al menos 4 números, 3 letras (mayúsculas o minúsculas) y 1 mayúscula.';
    } else {
      this.contrasenaError = '';
    }

    // Validación de que las contraseñas coinciden
    if (this.contrasena !== this.recontrasena) {
      this.error = 'Las contraseñas no coinciden.';
    }

    // Validación de que todos los campos estén llenos
    if (!this.usuario || !this.fechaNacimiento || !this.email || !this.contrasena || !this.recontrasena) {
      this.error = 'Todos los campos son obligatorios.';
    }

    // Si no hay errores, procesar el registro
    if (!this.usuarioError && !this.emailError && !this.contrasenaError && !this.error) {
      const usuarioGuardado = await this.guardarUsuario();
      if (usuarioGuardado) {
        // Si el usuario se guardó correctamente
        const toast = await this.toastController.create({
          message: 'Registro exitoso',
          duration: 2000,
          color: 'success',
        });
        toast.present();
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

  // Validación de que la fecha sea real
  validarFechaReal(fecha: string): boolean {
    const [year, month, day] = fecha.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Los meses en JavaScript son 0-11
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  // Validación del rango de edad (entre 1 y 120 años)
  validarRangoEdad(fecha: string): boolean {
    const nacimiento = new Date(fecha);
    const hoy = new Date();

    // Calcular la edad en años
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();
    const diaDiferencia = hoy.getDate() - nacimiento.getDate();

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    const edadAjustada =
      mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)
        ? edad - 1
        : edad;

    return edadAjustada >= 1 && edadAjustada <= 120;
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

  ngOnInit() {}
}

