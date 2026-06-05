"use client";

import Link from "next/link";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/stores/CartStore";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

const ProfilePage = observer(() => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile
        </Typography>

        <Typography variant="body1" sx={{ mb: 0.5 }}>
          Welcome back! This is your account page.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button component={Link} href="/cart" variant="contained">
            Open Cart
          </Button>
          <Button component={Link} href="/" variant="outlined">
            Home
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Cart snapshot
        </Typography>
        <Typography>
          Items in cart: <strong>{cartStore.getTotalItems()}</strong>
        </Typography>
        <Typography>
          Estimated total: <strong>${cartStore.getTotalPrice()}</strong>
        </Typography>
      </Paper>
    </Box>
  );
});

export default ProfilePage;