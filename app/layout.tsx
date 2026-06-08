"use client"; // Tells Next.js this page uses interactive components

import "./globals.css";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Button component={Link} href="/" sx={{ textTransform: "none" }}>
              <Typography variant="h6" sx={{ color: "inherit" }}>
                Home
              </Typography>
            </Button>

            <Box sx={{ flexGrow: 1 }} />
            <Button component={Link} href="/cart">Cart</Button>
            <Button component={Link} href="/profile">Profile</Button>
            <Button component={Link} href="/chat">Chat</Button>
          </Toolbar>
        </AppBar>

        <main style={{ padding: "20px" }}>
          {children}
        </main>

      </body>
    </html>
  );
}
