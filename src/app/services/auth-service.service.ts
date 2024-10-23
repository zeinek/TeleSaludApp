import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.initializeDatabase();
  }

  // Inicializar la base de datos y crear la tabla de usuarios
  async initializeDatabase() {
    try {
      // Conviértelo primero a 'unknown' y luego a 'SQLiteDBConnection'
      const connection = (await CapacitorSQLite.createConnection({
        database: "teleSaludAppDb",  // Nombre de la base de datos
        version: 1,  // Versión de la base de datos
        encrypted: false,  // No está encriptada
        mode: "no-encryption"  // Modo sin encriptación
      })) as unknown as SQLiteDBConnection;  // Conversión correcta a 'SQLiteDBConnection'

      this.db = connection;

      if (this.db) {
        // Abrir la conexión a la base de datos
        await this.db.open();

        // Crear la tabla de usuarios si no existe
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  // ID autoincremental
            username TEXT UNIQUE NOT NULL,  // El nombre de usuario debe ser único
            password TEXT NOT NULL  // La contraseña no puede estar vacía
          );
        `;
        // Ejecutar la consulta de creación de tabla
        await this.db.execute(createTableQuery);
        console.log('Tabla de usuarios creada o ya existente');
      } else {
        console.error('Error: No se ha inicializado la base de datos');
      }
    } catch (error) {
      // Captura cualquier error que ocurra al inicializar la base de datos
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Resto del código para registrar y autenticar usuarios permanece igual
  async registerUser(username: string, password: string): Promise<boolean> {
    if (!this.db) {
      console.error('No se ha inicializado la base de datos');
      return false;
    }

    try {
      const query = `SELECT COUNT(*) AS count FROM usuarios WHERE username = ?`;
      const result = await this.db.query(query, [username]);

      if (result.values && result.values[0].count > 0) {
        console.error('El nombre de usuario ya está registrado');
        return false;
      }

      const insertQuery = `INSERT INTO usuarios (username, password) VALUES (?, ?)`;
      await this.db.run(insertQuery, [username, password]);

      console.log(`Usuario ${username} registrado exitosamente`);
      return true;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return false;
    }
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    if (!this.db) {
      console.error('No se ha inicializado la base de datos');
      return false;
    }

    try {
      const query = `SELECT * FROM usuarios WHERE username = ?`;
      const result = await this.db.query(query, [username]);

      if (result.values && result.values.length > 0) {
        const user = result.values[0];

        if (user.password === password) {
          console.log('Usuario autenticado correctamente');
          return true;
        } else {
          console.error('Contraseña incorrecta');
          return false;
        }
      } else {
        console.error('Usuario no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.db !== null;
  }
}
