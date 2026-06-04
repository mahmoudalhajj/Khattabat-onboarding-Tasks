import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/CartStore";
import { CartProps } from "../types/cartProps";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

const CartSummary = observer(({ cartItem }: CartProps) => {
  const totalItems = cartStore.getTotalItems();
  const totalPrice = cartStore.getTotalPrice();

    const handleAddItem = () => {
        cartStore.setCartItem({
            id: Date.now(),
            name: cartStore.itemName,
            price: Number(cartStore.itemPrice),
            quantity: Number(cartStore.itemQuantity),
        });
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: '#f8f8f8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Total Items: {totalItems}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Total Price: ${totalPrice}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Selected item: {cartItem.name} — ${cartItem.price} × {cartItem.quantity}
            </Typography>

            <Stack spacing={1.5} sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    value={cartStore.itemName}
                    onChange={(e) => cartStore.setItemName(e.target.value)}
                    placeholder="Item Name"
                    size="small"
                />
                <TextField
                    fullWidth
                    value={cartStore.itemPrice}
                    onChange={(e) => cartStore.setItemPrice(e.target.value)}
                    placeholder="Price"
                    type="number"
                    size="small"
                />
                <TextField
                    fullWidth
                    value={cartStore.itemQuantity}
                    onChange={(e) => cartStore.setItemQuantity(e.target.value)}
                    placeholder="Quantity"
                    type="number"
                    size="small"
                />
            </Stack>

            <Stack direction="row" spacing={1} sx={{ width: "100%", mt: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddItem}
                >
                    Add Item
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => cartStore.clearCart()}
                >
                    Clear Cart
                </Button>
            </Stack>
        </Paper>
    );
});

export default CartSummary;
