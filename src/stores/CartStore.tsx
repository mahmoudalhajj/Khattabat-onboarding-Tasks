import { CartItem } from '../types/CartItem';
import { action, computed, makeAutoObservable } from 'mobx';

export class CartStore {
    cart: CartItem[]= [];

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
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    get TotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    addItem(item: CartItem) {
        const existingItem = this.cart.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push(item);
        }
    }

    removeItem(itemId: number) {
        this.cart = this.cart.filter(item => item.id !== itemId);
    }

    clearCart() {
        this.cart = [];
    }
    
}