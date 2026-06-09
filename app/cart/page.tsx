"use client";
import CartSummary from "@/components/Cart";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authStore } from "@/stores/AuthStore";

export default function CartPage() {
    const router = useRouter();

      useEffect(() => {
    if (!authStore.isLoggedIn()) {
      router.replace("/auth");
    }
  }, [router]);
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
