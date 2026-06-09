"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import {useRouter} from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

const RootLayout = observer(
  
  ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      authStore.loadStoredUser();
    }, []);
    
    const router = useRouter();

    return (
      <html lang="en">
        <body>
{authStore.isLoggedIn() && (
  <AppBar position="static" color="inherit">
    <Toolbar>
      <Button
        component={Link}
        href="/"
        sx={{ textTransform: "none" }}
      >
        <Typography variant="h6" color="inherit">
          Home
        </Typography>
      </Button>

      <Button component={Link} href="/chat">
        Chat
      </Button>

      <Button component={Link} href="/cart">
        Cart
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      <Typography sx={{ mr: 2 }}>
        {authStore.getUserName()}
      </Typography>

      <Button component={Link} href="/profile">
        Profile
      </Button>

      <Button
      onClick={() => {
        authStore.logout();
        router.replace("/auth");
      }}
    >
      Logout
    </Button>
    </Toolbar>
  </AppBar>
)}

          <Box component="main" sx={{ p: 3 }}>
            {children}
          </Box>
        </body>
      </html>
    );
  }
);

export default RootLayout;