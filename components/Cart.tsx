"use client";

import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/CartStore";
import { Colors as colors } from "../enums/colors";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";

const CartSummary = observer(() => {
  const name = cartStore.getItemName();
  const price = cartStore.getItemPrice();
  const quantity = cartStore.getItemQuantity();
  const totalItems = cartStore.getTotalItems();
  const totalPrice = cartStore.getTotalPrice();
  const error = cartStore.getError();
  const items = cartStore.showAllItems();

  const handleAddItem = () => {
    cartStore.setCartItem({
      id: Date.now(),
      name,
      price: Number(price),
      quantity: Number(quantity),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 960,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        mt: 4,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: colors.background,
          border: `1px solid ${colors.secondary}`,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "50%" },
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
          <Typography variant="body2" sx={{ color: colors.error, mt: 1 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={1.5} sx={{ width: "100%", mb: 2, mt: 2 }}>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => cartStore.setItemName(e.target.value)}
            placeholder="Item Name"
            size="small"
          />
          <TextField
            fullWidth
            value={price}
            onChange={(e) => cartStore.setItemPrice(e.target.value)}
            placeholder="Price"
            type="number"
            size="small"
          />
          <TextField
            fullWidth
            value={quantity}
            onChange={(e) => cartStore.setItemQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
            size="small"
          />
        </Stack>

        <Stack direction="row" spacing={1} sx={{ width: "100%", mt: 2 }}>
          <Button variant="contained" fullWidth onClick={handleAddItem}>
            Add Item
          </Button>
          <Button variant="contained" fullWidth onClick={() => cartStore.clearCart()}>
            Clear Cart
          </Button>
        </Stack>
      </Paper>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 4,
          backgroundColor: colors.background,
          border: `1px solid ${colors.secondary}`,
          width: { xs: "100%", md: "50%" },
          minHeight: 400,
        }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: colors.background,
            borderRadius: 2,
            position: "relative",
            overflow: "auto",
            maxHeight: 360,
            '& ul': { padding: 0 },
          }}
          subheader={
            <ListSubheader
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                bgcolor: colors.background,
                borderBottom: `1px solid ${colors.secondary}`,
                color: colors.secondary,
                fontWeight: 600,
              }}
            >
              Cart Items
            </ListSubheader>
          }
        >
          {items.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No items added yet"
                sx={{
                  '& .MuiListItemText-primary': { color: colors.secondary },
                }}
              />
            </ListItem>
          ) : (
            items.map((item) => (
              <Box key={item.id} component="li" sx={{ listStyle: "none" }}>
                <ListItem sx={{ px: 2, py: 1.5 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.price.toFixed(2)} · Quantity: ${item.quantity}`}
                    sx={{
                      '& .MuiListItemText-primary': { fontWeight: 600, color: colors.secondary },
                      '& .MuiListItemText-secondary': { color: colors.primary },
                    }}
                  />
                </ListItem>
                <Divider component="li" sx={{ borderColor: colors.secondary }} />
              </Box>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
});

export default CartSummary;
