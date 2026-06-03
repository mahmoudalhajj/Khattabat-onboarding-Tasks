import memoize from "lodash/memoize";
import { CartStore } from "./CartStore";

export const getCartStore = memoize(
    ({ id }: { id: number }) => {
        return new CartStore(id);
    },
    ({ id }) => id
);
