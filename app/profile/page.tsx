"use client";

import Link from "next/link";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/stores/CartStore";
import { Box, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authStore } from "@/stores/AuthStore";
import { CustomPaper } from "@/components/common/CustomPaper";
import { CustomButton } from "@/components/common/CustomButton";

const ProfilePage = observer(() => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      <CustomPaper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile
        </Typography>

        <Typography variant="body1" sx={{ mb: 0.5 }}>
          Welcome back! This is your account page.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Box sx={{ width: "auto" }}>
            <CustomButton component={Link} href="/cart" label="Open Cart" />
          </Box>
          <Box sx={{ width: "auto" }}>
            <CustomButton component={Link} href="/" variant="outlined" label="Home" />
          </Box>
        </Stack>
      </CustomPaper>

      <CustomPaper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Cart snapshot
        </Typography>
        <Typography>
          Items in cart: <strong>{cartStore.getTotalItems()}</strong>
        </Typography>
        <Typography>
          Estimated total: <strong>${cartStore.getTotalPrice()}</strong>
        </Typography>
      </CustomPaper>
    </Box>
  );
});

export default ProfilePage;
