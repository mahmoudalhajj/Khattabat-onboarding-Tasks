import { cartItem } from "../types/cartItem";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { localStorageStore, StorageKey } from "./LocalStorageStore";

export class CartStore {
  cart = observable.map<number, cartItem>();
  itemName =   observable.box<string>("");
  itemPrice =  observable.box<string>("");
  itemQuantity =  observable.box<string>("");
  error =  observable.box<string>("");
  

  getError() {
    return this.error.get();
  }

  getItemName() {
    return this.itemName.get();
  }

  getItemPrice() {
    return this.itemPrice.get();
  }

  getItemQuantity() {
    return this.itemQuantity.get();
  }

  setError = (value: string) => {
    runInAction(() => {
      this.error.set(value);
    });
  };

  getTotalPrice = () => {
    const CartValues = Array.from(this.cart.values());
    const reducedValues = CartValues.reduce((total, item) => total + item.price * item.quantity, 0);
    return reducedValues;
  };

  getTotalItems = () => {
    const CartValues = Array.from(this.cart.values());
    const reducedValues = CartValues.reduce((total, item) => total + item.quantity, 0);
    return reducedValues;
  };

  setItemPrice =(price: string) => {
    runInAction(() => {
      this.itemPrice.set(price);
    });
  }

  setItemName= (name: string) => {
    runInAction(() => {
      this.itemName.set(name);
    });
  }

  setItemQuantity= (quantity: string)=> {
    runInAction(() => {
      this.itemQuantity.set(quantity);
    });
  }

  setCartItemQuantity=(item: cartItem, amount: number) => {
    item.quantity += amount;
  }

  storeCart() {
    localStorageStore.storageSet(StorageKey.Cart, Array.from(this.cart.values()));
  }

  setCartItem(item: cartItem) {
    runInAction(() => {
      const existingItem = this.cart.get(item.id);

      if (existingItem) {
        this.setCartItemQuantity(existingItem, item.quantity);
        this.storeCart();
        return;
      }

      if (item.quantity > 0 && item.price > 0) {
        this.cart.set(item.id, item);
        this.storeCart();
      } else {
        this.setError("Price and quantity must be greater than zero.");
      }
    });
  }

  removeItem(itemId: number) {
    runInAction(() => {
      this.cart.delete(itemId);
      this.storeCart();
    });
  }

  clearCart() {
    runInAction(() => {
      this.cart.clear();
      this.storeCart();
    });
  }

  showAllItems() {
    return Array.from(this.cart.values());
  }

loadStoredCart() {
  const stored = localStorageStore.storageGet(StorageKey.Cart);
  if (!Array.isArray(stored)) {
    return;
  }
  runInAction(() => {
  stored.forEach((entry) => {
    this.cart.set(entry.id, entry);
  });
  });
}

}

export const cartStore = new CartStore();
