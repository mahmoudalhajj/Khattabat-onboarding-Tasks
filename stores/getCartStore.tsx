import memoize from "lodash/memoize";
import { CartStore } from "./CartStore";
 import { cartItem } from '../types/cartItem';

export const getCartStore = memoize(
    (item: cartItem) => { return new CartStore(); },
    (item) => item.id   
);