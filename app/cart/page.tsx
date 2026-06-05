import CartSummary from "@/components/Cart";
import { Box } from "@mui/material";

export default function CartPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <CartSummary />
    </Box>
  );
}
