
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializar storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Establecer un valor en almacenamiento
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Obtener un valor del almacenamiento
  async get(key: string) {
    return await this._storage?.get(key);
  }

  // Eliminar un valor del almacenamiento
  async remove(key: string) {
    await this._storage?.remove(key);
  }

  // Borrar todos los datos del almacenamiento
  async clear() {
    await this._storage?.clear();
  }
}
