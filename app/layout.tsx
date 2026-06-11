"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import {useRouter, usePathname} from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { Colors as colors } from "@/enums/colors";

const RootLayout = observer(
  
  ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isLoading = authStore.getIsLoading();
    const isLoggedIn = authStore.isLoggedIn();

    useEffect(() => {
      authStore.loadStoredUser();
    }, []);

    useEffect(() => {
      if (!isLoading) {
        if (!isLoggedIn && pathname !== "/auth") {
          router.replace("/auth");
        } else if (isLoggedIn && pathname === "/auth") {
          router.replace("/");
        }
      }
    }, [isLoading, isLoggedIn, pathname, router]);

    if (isLoading) {
      return (
        <html lang="en">
          <body>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: colors.background }}>
              <CircularProgress color="primary" />
            </Box>
          </body>
        </html>
      );
    }

    return (
      <html lang="en">
        <body>
{isLoggedIn && (
  <AppBar position="static" color="inherit" elevation={1}>
    <Toolbar>
      <Button
        component={Link}
        href="/"
        sx={{ textTransform: "none" }}
      >
        <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 700 }}>
          Home
        </Typography>
      </Button>

      <Box sx={{ flexGrow: 1, ml: 4, display: "flex", gap: 1 }}>
        <Button component={Link} href="/chat" sx={{ textTransform: "none" }}>
          Chat
        </Button>
        <Button component={Link} href="/cart" sx={{ textTransform: "none" }}>
          Cart
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mr: 2, color: "text.secondary" }}>
        {authStore.getUserName()}
      </Typography>

      <Button component={Link} href="/profile" variant="outlined" size="small" sx={{ mr: 1, borderRadius: 2, textTransform: "none" }}>
        Profile
      </Button>

      <Button
      variant="contained"
      size="small"
      sx={{ borderRadius: 2, textTransform: "none", bgcolor: colors.secondary }}
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

          <Box component="main" sx={{ p: 3, minHeight: "calc(100vh - 64px)", bgcolor: colors.surface }}>
            {children}
          </Box>
        </body>
      </html>
    );
  }
);

export default RootLayout;