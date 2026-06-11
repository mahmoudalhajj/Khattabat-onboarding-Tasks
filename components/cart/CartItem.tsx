import { observer } from "mobx-react-lite";
import { ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { cartItem } from "../../types/cartItem";
import { cartStore } from "../../stores/CartStore";
import { Colors as colors } from "../../enums/colors";

interface CartItemProps {
  item: cartItem;
}

export const CartItem = observer(({ item }: CartItemProps) => {
  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton 
          edge="end" 
          size="small" 
          onClick={() => cartStore.removeItem(item.id)}
          sx={{ color: colors.error }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemText
        primary={item.name}
        secondary={`$${item.price.toFixed(2)} × ${item.quantity}`}
        slotProps={{
        primary: { variant: "body2",color: colors.secondary },
        secondary: { variant: "caption" },
      }}
      />
      <Typography variant="body2" sx={{ fontWeight: 700, mr: 2, color: colors.primary }}>
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>
    </ListItem>
  );
});
