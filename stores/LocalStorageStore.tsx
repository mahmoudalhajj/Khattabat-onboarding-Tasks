
import { makeAutoObservable } from "mobx";

export enum StorageKey {
  Cart = "cart",
}

class LocalStorageStore {
  constructor() {
    makeAutoObservable(this);
  }


storageGet(key: string) {
    try {
      const get = localStorage.getItem(key);
      if (get === null) return null;
      return JSON.parse(get);
    } catch {
      return null;
    }
  }
  
  storageSet(key: string, value: unknown ): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("couldnt set in local storage " + e);
    }
  }

  storageClear(): void {
    try {
      localStorage.clear();
    } catch {
      
    }
  }
}

export const localStorageStore = new LocalStorageStore();



