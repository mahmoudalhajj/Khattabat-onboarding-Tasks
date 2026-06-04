import {cartItem} from "../types/cartItem";
import { makeAutoObservable, observable, runInAction } from "mobx";

export class CartStore {
  cart = observable.map<number, cartItem>();
  itemName = "";
  itemPrice = "";
  itemQuantity = "";
  
  constructor() {
    makeAutoObservable(this);
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
    if (this.cart.has(item.id)) {
        const existingItem = this.cart.get(item.id);
    if (existingItem) {
            this.setCartItemQuantity(existingItem, item.quantity);
        } else {
            this.cart.set(item.id, item);
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