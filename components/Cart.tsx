"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/CartStore";
import { Colors as colors } from "../enums/colors";
import {
  Box,
  Typography,
  Stack,
  List,
  Tooltip,
  Chip,
  ListSubheader,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { CustomPaper } from "./common/CustomPaper";
import { CustomButton } from "./common/CustomButton";
import { CustomTextField } from "./common/CustomTextField";
import { EmptyState } from "./common/EmptyState";
import { CartItem } from "./cart/CartItem";

const CartSummary = observer(() => {
  useEffect(() => {
    cartStore.loadStoredCart();
  }, []);

  const name = cartStore.itemName.get();
  const price = cartStore.itemPrice.get();
  const quantity = cartStore.itemQuantity.get();
  const error = cartStore.error.get();
  const totalItems = cartStore.getTotalItems();
  const totalPrice = cartStore.getTotalPrice();
  const items = cartStore.showAllItems();

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
      <CustomPaper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={<ShoppingCartIcon />}
            label={`${totalItems} Items`}
            variant="outlined"
            color="primary"
            size="medium"
            sx={{
              p: 2,
              fontSize: "16px",
              fontWeight: 600,
              borderWidth: 2,
            }}
          />
          <Chip
            label={`$${totalPrice} Total`}
            variant="filled"
            color="primary"
            size="medium"
            sx={{
              p: 2.3,
              fontSize: "16px",
              fontWeight: 600,
            }}
          />
        </Stack>
        {error && (
          <Typography variant="body2" sx={{ color: colors.error, mt: 1 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={1.5} sx={{ width: "100%", mb: 2, mt: 2 }}>
          <CustomTextField
            value={name}
            onChange={(e) => cartStore.setItemName(e.target.value)}
            placeholder="Item Name"
          />
          <CustomTextField
            value={price}
            onChange={(e) => cartStore.setItemPrice(e.target.value)}
            placeholder="Price"
            type="number"
          />
          <CustomTextField
            value={quantity}
            onChange={(e) => cartStore.setItemQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
          />
        </Stack>

        <Stack direction="row" spacing={1} sx={{ width: "100%", mt: 2 }}>
          <Tooltip title="Add item to cart">
            <Box sx={{ width: "100%" }}>
                <CustomButton
                    label="Add Item"
                    onClick={() => cartStore.handleAddItem()}
                    startIcon={<AddShoppingCartIcon />}
                />
            </Box>
          </Tooltip>
          <Tooltip title="Remove all items">
             <Box sx={{ width: "100%" }}>
                <CustomButton
                    label="Clear Cart"
                    variant="outlined"
                    onClick={() => cartStore.clearCart()}
                    startIcon={<DeleteIcon />}
                />
            </Box>
          </Tooltip>
        </Stack>
      </CustomPaper>

      <CustomPaper
        sx={{
          width: { xs: "100%", md: "50%" },
          minHeight: 400,
          p: 0,
          overflow: "hidden",
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
            "& ul": { padding: 0 },
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
                py: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ShoppingCartIcon fontSize="small" />
                Cart Items
              </Box>
            </ListSubheader>
          }
        >
          {items.length === 0 ? (
            <EmptyState icon={<RemoveShoppingCartIcon />} label="No items added yet" />
          ) : (
            items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </List>
      </CustomPaper>
    </Box>
  );
});

export default CartSummary;
