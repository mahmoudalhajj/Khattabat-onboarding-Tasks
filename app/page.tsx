"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/AuthStore";
import { Box,Typography } from "@mui/material";


const HomePage = observer(() => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="body1" color="text.secondary">
      Check the chat or manage your cart from the navigation bar.
      </Typography>
    </Box>
  );
});

export default HomePage;