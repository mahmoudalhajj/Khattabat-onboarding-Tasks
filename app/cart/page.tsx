"use client";
import CartSummary from "@/components/Cart";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authStore } from "@/stores/AuthStore";

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
