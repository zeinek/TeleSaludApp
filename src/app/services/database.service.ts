import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null;
  readonly dbName: string = 'app_db';
  readonly userTable: string = 'usuarios';

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase(): Promise<void> {
    try {
      console.log('Inicializando la base de datos...');
      this.dbInstance = await this.sqlite.create({
        name: this.dbName,
        location: 'default'
      });
      await this.createTables();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async createTables(): Promise<void> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return;
    }
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.userTable} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT UNIQUE,
        nombreCompleto TEXT,
        direccion TEXT,
        telefono TEXT,
        email TEXT,
        fechaNacimiento TEXT,
        contrasena TEXT,
        activo INTEGER DEFAULT 1 
      )`;
    try {
      console.log('Creando la tabla de usuarios...');
      await this.dbInstance.executeSql(sql, []);
    } catch (error) {
      console.error('Error al crear la tabla de usuarios:', error);
    }
  }

  // Desactivar un usuario (baja)
  async deactivateUser(rut: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `UPDATE ${this.userTable} SET activo = 0 WHERE rut = ?`;
    try {
      await this.dbInstance.executeSql(sql, [rut]);
      return true;
    } catch (error) {
      console.error('Error al dar de baja al usuario:', error);
      return false;
    }
  }

  // Activar un usuario
  async activateUser(rut: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `UPDATE ${this.userTable} SET activo = 1 WHERE rut = ?`;
    try {
      await this.dbInstance.executeSql(sql, [rut]);
      return true;
    } catch (error) {
      console.error('Error al activar el usuario:', error);
      return false;
    }
  }

  // Eliminar un usuario permanentemente
  async deleteUser(rut: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `DELETE FROM ${this.userTable} WHERE rut = ?`;
    try {
      await this.dbInstance.executeSql(sql, [rut]);
      return true;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      return false;
    }
  }

  async addUser(
    rut: string,
    nombreCompleto: string,
    direccion: string,
    telefono: string,
    email: string,
    fechaNacimiento: string,
    contrasena: string
  ): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `INSERT INTO ${this.userTable} (rut, nombreCompleto, direccion, telefono, email, fechaNacimiento, contrasena, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const data = [rut, nombreCompleto, direccion, telefono, email, fechaNacimiento, contrasena, 1]; // Añadir activo por defecto
    try {
      console.log('Añadiendo usuario:', data);
      await this.dbInstance.executeSql(sql, data);
      console.log('Usuario añadido exitosamente');
      return true;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      return false;
    }
  }

  async getAllUsers(): Promise<any[]> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return [];
    }
    const sql = `SELECT * FROM ${this.userTable}`;
    try {
      const res = await this.dbInstance.executeSql(sql, []);
      const users = [];
      for (let i = 0; i < res.rows.length; i++) {
        users.push(res.rows.item(i));
      }
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async checkUserExists(rut: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `SELECT * FROM ${this.userTable} WHERE rut = ?`;
    try {
      const res = await this.dbInstance.executeSql(sql, [rut]);
      return res.rows.length > 0;
    } catch (error) {
      console.error('Error al verificar si el usuario existe:', error);
      return false;
    }
  }

  async getUserByRut(rut: string): Promise<any | null> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return null;
    }
    const sql = `SELECT * FROM ${this.userTable} WHERE rut = ?`;
    try {
      const res = await this.dbInstance.executeSql(sql, [rut]);
      if (res.rows.length > 0) {
        return res.rows.item(0); // Retorna el usuario si existe
      }
      return null; // No encontró el usuario
    } catch (error) {
      console.error('Error al obtener usuario por RUT:', error);
      return null;
    }
  }
}
