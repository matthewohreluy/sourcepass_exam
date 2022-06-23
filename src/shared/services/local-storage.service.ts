import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

  getLocalStorageObject<T>(key: string): T{
  return JSON.parse(localStorage.getItem(key)!);
  }

  saveLocalStorageObject<T>(key: string, obj: T){
    const data = JSON.stringify(obj);
    localStorage.setItem(key, data);
  }

}
