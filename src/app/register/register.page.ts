import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth-service.service'; // El servicio de autenticación con SQLite

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

  mostrarContrasena: boolean = false; // Controla la visibilidad de la contraseña
  errores: any = {}; // Objeto para almacenar los errores de validación

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private authService: AuthService // Utiliza el servicio que maneja SQLite
  ) {}

  // Función que se llama cuando el usuario envía el formulario de registro
  async enviarRegistro() {
    this.limpiarErrores(); // Limpia los errores previos antes de validar

    // Realiza la validación del formulario
    const esValido = this.validarFormulario();

    if (esValido) {
      // Intenta registrar el usuario utilizando SQLite a través del AuthService
      const usuarioGuardado = await this.authService.registerUser(this.usuario, this.contrasena);
      if (usuarioGuardado) {
        // Si el usuario se guarda correctamente, muestra un mensaje y redirige a la página de login
        await this.mostrarToast('Registro exitoso', 'success');
        this.navCtrl.navigateForward('/login');
      } else {
        // Si el usuario ya existe, muestra un error
        this.errores.usuario = 'El usuario ya existe.';
      }
    }
  }

  // Función para validar los campos del formulario
  validarFormulario(): boolean {
    let valido = true;

    // Validación del nombre de usuario
    if (!this.usuario) {
      this.errores.usuario = 'El usuario es obligatorio.';
      valido = false;
    } else if (!/^[a-zA-Z]+$/.test(this.usuario)) {
      this.errores.usuario = 'El usuario debe contener solo letras.';
      valido = false;
    }

    // Validación de la fecha de nacimiento
    if (!this.fechaNacimiento) {
      this.errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
      valido = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(this.fechaNacimiento)) {
      this.errores.fechaNacimiento = 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.';
      valido = false;
    }

    // Validación del correo electrónico
    if (!this.correo) {
      this.errores.correo = 'El email es obligatorio.';
      valido = false;
    } else if (!this.validarFormatoEmail(this.correo)) {
      this.errores.correo = 'El email debe tener un formato válido.';
      valido = false;
    }

    // Validación de la contraseña
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

  // Función para validar el formato del correo electrónico
  validarFormatoEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Mostrar mensaje emergente (Toast)
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // Función para limpiar los errores del formulario
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

  // Estas funciones se utilizan para limpiar los errores individuales cuando el usuario cambia los valores
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

  // Alternar la visibilidad de la contraseña
  toggleMostrarClave() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  ngOnInit() {}
}
