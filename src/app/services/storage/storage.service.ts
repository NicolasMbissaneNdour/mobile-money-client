import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init(){
    try {
      const storage = await this.storage.create();
      this._storage = storage;
    } catch (error) {
      console.log(error)
    }
    
  }

  public async set(key:string,value:any){
    try {
      await this._storage?.set(key,value);
    } catch (error) {
      console.log(error)
    }
    
  }

  public async get(key:string){
    try {
      const result = await this._storage.get(key);
      return result;
    } catch (error) {
      console.log(error)
    }
    
  }

  public async clear(){
    try {
      await this._storage.clear();
    } catch (error) {
      console.log(error)
    }
  }
}
