import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private db: SQLiteDBConnection | null = null;

  async initializeDatabase() {
    const sqlite = CapacitorSQLite;

    // Crea la conexión a la base de datos con los parámetros correctos
    const connection = await sqlite.createConnection({
      database: 'citasDB',
      encrypted: false,
      mode: 'no-encryption',
      version: 1,
    });


    if (this.db) {
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS citas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          paciente TEXT NOT NULL,
          motivo TEXT NOT NULL,
          fecha TEXT NOT NULL,
          hora TEXT NOT NULL
        )
      `);
    } else {
      console.error('No se pudo establecer conexión con la base de datos.');
    }
  }

  async addCita(paciente: string, motivo: string, fecha: string, hora: string) {
    if (!this.db) return;
    const query = `INSERT INTO citas (paciente, motivo, fecha, hora) VALUES (?, ?, ?, ?)`;
    await this.db.run(query, [paciente, motivo, fecha, hora]);
  }

  async getCitas() {
    if (!this.db) return [];
    const result = await this.db.query('SELECT * FROM citas');
    return result.values || [];
  }

  async updateCita(id: number, paciente: string, motivo: string, fecha: string, hora: string) {
    if (!this.db) return;
    const query = `UPDATE citas SET paciente = ?, motivo = ?, fecha = ?, hora = ? WHERE id = ?`;
    await this.db.run(query, [paciente, motivo, fecha, hora, id]);
  }

  async deleteCita(id: number) {
    if (!this.db) return;
    const query = `DELETE FROM citas WHERE id = ?`;
    await this.db.run(query, [id]);
  }
}
