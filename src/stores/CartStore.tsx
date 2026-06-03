import { CartItem } from '../types/CartItem';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export class CartStore {
    cart = observable.map<number, CartItem>();

    constructor() {
        makeAutoObservable(this, {
            TotalPrice: computed,
            TotalItems: computed,
            addItem: action,
            removeItem: action,
            clearCart: action,
        });
    }

    get TotalPrice() {
        return Array.from(this.cart.values()).reduce((total, item) => total + item.price * item.quantity, 0);
        
    }

    get TotalItems() {
        return Array.from(this.cart.values()).reduce((total, item) => total + item.quantity, 0);
    }

    addItem(item: CartItem) {
        const existingItem = this.cart.get(item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.set(item.id, item);
        }
    }

    removeItem(itemId: number) {
        this.cart.delete(itemId);
    }

    clearCart() {
        this.cart.clear();
    }
    
}