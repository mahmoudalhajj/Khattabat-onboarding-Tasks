import {cartItem} from "../types/cartItem";
import { makeAutoObservable, observable, runInAction } from "mobx";

export class CartStore {
  cart = observable.map<number, cartItem>();
  itemName = "";
  itemPrice = "";
  itemQuantity = "";
  error = "";
  
  constructor() {
    makeAutoObservable(this);
  }
  getError() {
    return this.error;
  }

  getTotalPrice= () => {
    const CartValues = Array.from(this.cart.values());
    const reducedValues = CartValues.reduce((total, item) => total + item.price * item.quantity, 0);
    return reducedValues;
  }
  getTotalItems = () => {
    const CartValues = Array.from(this.cart.values());
    const reducedValues = CartValues.reduce((total, item) => total + item.quantity, 0);
    return reducedValues;
  }

  setItemPrice(price: string) {
    this.itemPrice = price;
  }

  setItemName(name: string) {
    this.itemName = name;
  }

  setItemQuantity(quantity: string) {
    this.itemQuantity = quantity;
  }
  setCartItemQuantity(item: cartItem, amount: number) {
    item.quantity += amount;
  }

  setCartItem(item: cartItem) {
    runInAction(() => {
      const existingItem = this.cart.get(item.id);

      if (existingItem) {
        this.setCartItemQuantity(existingItem, item.quantity);
      } else {
        if (item.quantity > 0 && item.price > 0 ) {
          this.cart.set(item.id, item);
        } else {
            this.error = "Price and quantity must be greater than zero.";
        }
      }
    });
  }

  removeItem(itemId: number) {
    this.cart.delete(itemId);
  }

    clearCart() {
        this.cart.clear();
    }
    showAllItems() {
       return Array.from(this.cart.values());
    }
}

export const cartStore = new CartStore();
