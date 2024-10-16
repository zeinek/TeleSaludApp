import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB() {
    try {
      // Crear la conexión a la base de datos
      this.db = await this.sqlite.createConnection(
        'appointmentsDB', 
        false,             // No encrypted
        'no-encryption',   // Encryption mode
        1,                 // Version
        false              // Readonly (false porque no es solo de lectura)
      );
      

      if (this.db != null) {
        // Abrir la base de datos
        await this.db.open();

        // Crear tabla si no existe
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT
          );
        `;
        await this.db.execute(createTableQuery);
      } else {
        console.error('Error: La conexión a la base de datos es null.');
      }

    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async addAppointment(name: string, date: string, description: string) {
    if (this.db != null) {
      const query = `INSERT INTO appointments (name, date, description) VALUES (?, ?, ?);`;
      const values = [name, date, description];
      await this.db.run(query, values);
    } else {
      console.error('Error: La conexión a la base de datos es null.');
    }
  }

  async getAppointments() {
    if (this.db != null) {
      const query = `SELECT * FROM appointments;`;
      const result = await this.db.query(query);
      return result.values;
    } else {
      console.error('Error: La conexión a la base de datos es null.');
      return [];
    }
  }

  async updateAppointment(id: number, name: string, date: string, description: string) {
    if (this.db != null) {
      const query = `UPDATE appointments SET name = ?, date = ?, description = ? WHERE id = ?;`;
      const values = [name, date, description, id];
      await this.db.run(query, values);
    } else {
      console.error('Error: La conexión a la base de datos es null.');
    }
  }

  async deleteAppointment(id: number) {
    if (this.db != null) {
      const query = `DELETE FROM appointments WHERE id = ?;`;
      await this.db.run(query, [id]);
    } else {
      console.error('Error: La conexión a la base de datos es null.');
    }
  }

  async deleteAll() {
    if (this.db != null) {
      const query = `DELETE FROM appointments;`;
      await this.db.run(query);
    } else {
      console.error('Error: La conexión a la base de datos es null.');
    }
  }

  async closeConnection() {
    if (this.db != null) {
      await this.db.close();
    } else {
      console.error('Error: La conexión a la base de datos es null.');
    }
  }
}
