"use client";

import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/CartStore";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import colors from "@/constants/colors";

const CartSummary = observer(() => {
  const totalItems = cartStore.getTotalItems();
  const totalPrice = cartStore.getTotalPrice();
  const error = cartStore.getError();

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
                elevation={2}
            sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: colors.background,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 520,
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Total Items: {totalItems}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Total Price: ${totalPrice}
            </Typography>
            {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}

            <Stack spacing={1.5} sx={{ width: "100%", mb: 2 }}>
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
