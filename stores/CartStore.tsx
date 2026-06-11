import { cartItem } from "../types/cartItem";
import { observable, runInAction } from "mobx";
import { localStorageStore, StorageKey } from "./LocalStorageStore";

export class CartStore {
  cart = observable.map<number, cartItem>();
  itemName = observable.box<string>("");
  itemPrice = observable.box<string>("");
  itemQuantity = observable.box<string>("");
  error = observable.box<string>("");

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

  setItemPrice = (price: string) => {
    runInAction(() => {
      this.itemPrice.set(price);
    });
  };

  setItemName = (name: string) => {
    runInAction(() => {
      this.itemName.set(name);
    });
  };

  setItemQuantity = (quantity: string) => {
    runInAction(() => {
      this.itemQuantity.set(quantity);
    });
  };

  handleAddItem = () => {
    const name = this.itemName.get().trim();
    const priceValue = this.itemPrice.get();
    const quantityValue = this.itemQuantity.get();

    if (!name || !priceValue || !quantityValue) {
      this.setError("All fields are required.");
      return;
    }

    const price = Number(priceValue);
    const quantity = Number(quantityValue);

    if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      this.setError("Price and quantity must be greater than zero.");
      return;
    }

    runInAction(() => {
      this.setCartItem({
        id: Date.now(),
        name,
        price,
        quantity,
      });

      this.itemName.set("");
      this.itemPrice.set("");
      this.itemQuantity.set("");
      this.error.set("");
    });
  };

  setCartItemQuantity = (item: cartItem, amount: number) => {
    runInAction(() => {
      item.quantity += amount;
    });
  };

  storeCart = () => {
    localStorageStore.storageSet(StorageKey.Cart, Array.from(this.cart.values()));
  };

  setCartItem = (item: cartItem) => {
    runInAction(() => {
      const existingItem = this.cart.get(item.id);

      if (existingItem) {
        this.setCartItemQuantity(existingItem, item.quantity);
        this.storeCart();
        return;
      }

      this.cart.set(item.id, item);
      this.storeCart();
    });
  };

  removeItem = (itemId: number) => {
    runInAction(() => {
      this.cart.delete(itemId);
      this.storeCart();
    });
  };

  clearCart = () => {
    if (this.cart.size === 0) return;

    runInAction(() => {
      this.cart.clear();
      this.storeCart();
    });
  };

  showAllItems = () => {
    return Array.from(this.cart.values());
  };

  loadStoredCart = () => {
    const stored = localStorageStore.storageGet(StorageKey.Cart);
    if (!Array.isArray(stored)) {
      return;
    }

    runInAction(() => {
      stored.forEach((entry) => {
        this.cart.set(entry.id, entry);
      });
    });
  };

}

export const cartStore = new CartStore();
