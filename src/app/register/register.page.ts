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
  recontrasena: string = '';
  fechaNacimiento: string = '';
  correo: string = '';
  error: string = '';

  mostrarContrasena: boolean = false;
  errores: any = {};

  constructor(private navCtrl: NavController, private toastController: ToastController, private storage: Storage) {
    this.storage.create(); // Inicializar el storage
  }

  async enviarRegistro() {
    // Limpiar los errores previos
    this.limpiarErrores();

    // Realizar las validaciones
    const esValido = this.validarFormulario();

    if (esValido) {
      const usuarioGuardado = await this.guardarUsuario();
      if (usuarioGuardado) {
        await this.mostrarToast('Registro exitoso', 'success');
        this.navCtrl.navigateForward('/login');
      } else {
        this.errores.usuario = 'El usuario ya existe.';
      }
    }
  }

  validarFormulario(): boolean {
    let valido = true;

    // Validar nombre de usuario
    if (!this.usuario) {
      this.errores.usuario = 'El usuario es obligatorio.';
      valido = false;
    } else if (!/^[a-zA-Z]+$/.test(this.usuario)) {
      this.errores.usuario = 'El usuario debe contener solo letras.';
      valido = false;
    }

    // Validar fecha de nacimiento
    if (!this.fechaNacimiento) {
      this.errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
      valido = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(this.fechaNacimiento)) {
      this.errores.fechaNacimiento = 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.';
      valido = false;
    }

    // Validar correo
    if (!this.correo) {
      this.errores.correo = 'El email es obligatorio.';
      valido = false;
    } else if (!this.validarFormatoEmail(this.correo)) {
      this.errores.correo = 'El email debe tener un formato válido.';
      valido = false;
    }

    // Validar contraseña
    if (!this.contrasena) {
      this.errores.contrasena = 'La contraseña es obligatoria.';
      valido = false;
    } else if (this.contrasena.length < 8) {
      this.errores.contrasena = 'La contraseña debe tener al menos 8 caracteres.';
      valido = false;
    } else if (!/[A-Z]/.test(this.contrasena)) {
      this.errores.contrasena = 'La contraseña debe contener al menos una letra mayúscula.';
      valido = false;
    } else if (!/[0-9]/.test(this.contrasena)) {
      this.errores.contrasena = 'La contraseña debe contener al menos un número.';
      valido = false;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.contrasena)) {
      this.errores.contrasena = 'La contraseña debe contener al menos un carácter especial.';
      valido = false;
    } else if (this.contrasena !== this.recontrasena) {
      this.errores.recontrasena = 'Las contraseñas no coinciden.';
      valido = false;
    }

    return valido;
  }

  // Validación solo para el formato del email
  validarFormatoEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Función para guardar el usuario en el almacenamiento
  async guardarUsuario() {
    const usuarios = (await this.storage.get('usuarios')) || {};
    if (usuarios[this.usuario]) {
      return false; // El usuario ya existe
    }
    usuarios[this.usuario] = {
      contrasena: this.contrasena,
      correo: this.correo,
      fechaNacimiento: this.fechaNacimiento
    };
    await this.storage.set('usuarios', usuarios);
    return true;
  }

  // Mostrar mensaje emergente
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // Limpiar los errores
  limpiarErrores() {
    this.errores = {
      usuario: '',
      contrasena: '',
      recontrasena: '',
      fechaNacimiento: '',
      correo: ''
    };
    this.error = '';
  }

  // Funciones para manejar el cambio de valores y limpiar errores
  onUsuarioChange() {
    this.errores.usuario = '';
  }

  onEmailChange() {
    this.errores.correo = '';
  }

  onFechaNacimientoChange() {
    this.errores.fechaNacimiento = '';
  }

  onContrasenaChange() {
    this.errores.contrasena = '';
  }

  onRepetirClaveChange() {
    this.errores.recontrasena = '';
  }

  toggleMostrarClave() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  ngOnInit() {}
}
