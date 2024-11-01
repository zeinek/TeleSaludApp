import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null; // Cambiar undefined a null
  readonly dbName: string = 'app_db';
  readonly userTable: string = 'usuarios';

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase(): Promise<void> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: this.dbName,
        location: 'default'
      });
      await this.createTables();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async createTables() {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return;
    }
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.userTable} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE,
        contrasena TEXT,
        correo TEXT,
        fechaNacimiento TEXT
      )`;
    try {
      await this.dbInstance.executeSql(sql, []);
    } catch (error) {
      console.error('Error al crear la tabla de usuarios:', error);
    }
  }

  async addUser(usuario: string, contrasena: string, correo: string, fechaNacimiento: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `INSERT INTO ${this.userTable} (usuario, contrasena, correo, fechaNacimiento) VALUES (?, ?, ?, ?)`;
    const data = [usuario, contrasena, correo, fechaNacimiento];
    try {
      await this.dbInstance.executeSql(sql, data);
      return true;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      return false;
    }
  }


//funcion para ver los usuarios almacenados en la base de datos, agregaremos la función getAllUsers a DatabaseService. 
//Esto permitirá obtener todos los registros y así verificar en la consola qué usuarios están almacenados.
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



  async checkUserExists(usuario: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('Database not initialized!');
      return false;
    }
    const sql = `SELECT * FROM ${this.userTable} WHERE usuario = ?`;
    const res = await this.dbInstance.executeSql(sql, [usuario]);
    return res.rows.length > 0;
  }
}



