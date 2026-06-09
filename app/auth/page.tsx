"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";

const AuthPage = observer(() => {
  if (authStore.isLoggedIn()) {
    const user = authStore.getUser();

    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          px: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box sx={{ bgcolor: "primary.main", py: 4, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "white",
                color: "primary.main",
                fontSize: 28,
                fontWeight: 700,
                mx: "auto",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" color="white" sx={{ mt: 1.5, fontWeight: 700 }}>
              {user?.name}
            </Typography>
            <Chip
              label={user?.email}
              size="small"
              sx={{
                mt: 1,
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 500,
              }}
            />
          </Box>

          <Box sx={{ px: 4, py: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={authStore.logout}
              sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, py: 1.2 }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
          <Box sx={{ bgcolor: "primary.main", py: 4, textAlign: "center" }}>
          <Typography variant="h5" color="white" sx={{ fontWeight: 700 }}>
            Authentication
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}>
            Login or create a new account.
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            
                {authStore.getIsRegistering() && (
                <TextField
                    fullWidth
                    label="Name"
                    placeholder="Name"
                    size="small"
                    value={authStore.name.get() ?? ""}
                    onChange={(e) => authStore.setName(e.target.value)}
                />
                )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="you@example.com"
            size="small"
            value={authStore.email.get() ?? ""}
            onChange={(e) => authStore.setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="••••••••"
            size="small"
            onChange={(e) => authStore.setPassword(e.target.value)}
          />

          {authStore.getError() && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {authStore.getError()}
            </Alert>
          )}

                <Button
                variant="contained"
                fullWidth
                onClick={() => {
                    authStore.setIsRegistering(false);
                    authStore.login();
                }}
                sx={{ textTransform: "none", fontWeight: 600, py: 1.2, borderRadius: 2, mt: 1 }}
                >
                Login
                </Button>

          <Divider>
            <Typography variant="caption" color="text.secondary">
              or
            </Typography>
          </Divider>
          
            <Button
            variant="outlined"
            fullWidth
            onClick={() => {
                authStore.setIsRegistering(true);
                authStore.register(
                authStore.name.get(),
                authStore.email.get(),
                authStore.password.get()
                );
            }}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
            >
            Register
            </Button>
        </Box>
      </Paper>
    </Box>
  );
});

export default AuthPage;