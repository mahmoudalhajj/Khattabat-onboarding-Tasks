"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import {
  Box,
  Typography,
  Alert,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import { CustomPaper } from "@/components/common/CustomPaper";
import { CustomTextField } from "@/components/common/CustomTextField";
import { CustomButton } from "@/components/common/CustomButton";

import { Button } from "@mui/material";
import { Colors as colors } from "@/enums/colors";

const AuthPage = observer(() => {
  const isLoading = authStore.getIsLoading();
  const isRegistering = authStore.getIsRegistering();
  const error = authStore.getError();

  if (authStore.isLoggedIn()) {
    const user = authStore.getUser();
    return (
      <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CustomPaper sx={{ width: "100%", maxWidth: 400, p: 0, overflow: "hidden" }}>
          <Box sx={{ bgcolor: colors.primary, py: 4, textAlign: "center" }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: colors.background, color: colors.primary, mx: "auto", fontWeight: 700 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" sx={{ color: colors.background, mt: 1.5 }}>{user?.name}</Typography>
            <Chip label={user?.email} size="small" sx={{ mt: 1, bgcolor: colors.whiteTransparent, color: colors.background }} />
          </Box>
          <Box sx={{ px: 4, py: 3 }}>
            <CustomButton label="Logout" variant="outlined" color="error" onClick={() => authStore.logout()} />
          </Box>
        </CustomPaper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CustomPaper sx={{ width: "100%", maxWidth: 420, p: 0, overflow: "hidden" }}>
        <Box sx={{ bgcolor: colors.primary, py: 4, textAlign: "center", color: colors.background }}>
          <Avatar sx={{ bgcolor: colors.background, color: colors.primary, mx: "auto", mb: 1 }}>
            {isRegistering ? <PersonAddOutlinedIcon /> : <LockOutlinedIcon />}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isRegistering ? "Create Account" : "Welcome Back"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {isRegistering ? "Join us today!" : "Please enter your details"}
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
          {isRegistering && (
            <CustomTextField
              label="Full Name"
              placeholder="John Doe"
              value={authStore.name.get()}
              onChange={(e) => authStore.setName(e.target.value)}
              disabled={isLoading}
            />
          )}

          <CustomTextField
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={authStore.email.get()}
            onChange={(e) => authStore.setEmail(e.target.value)}
            disabled={isLoading}
          />

          <CustomTextField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={authStore.password.get()}
            onChange={(e) => authStore.setPassword(e.target.value)}
            disabled={isLoading}
          />

          {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

          <CustomButton
            label={isRegistering ? "Register" : "Login"}
            onClick={() => isRegistering ? authStore.handleRegister() : authStore.handleLogin()}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryDark } }}
          />

          <Divider>
            <Typography variant="caption" color="text.secondary">OR</Typography>
          </Divider>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <Button 
                onClick={() => authStore.setIsRegistering(!isRegistering)}
                sx={{ textTransform: "none", fontWeight: 600, ml: 0.5, color: colors.primary }}
                disabled={isLoading}
              >
                {isRegistering ? "Login here" : "Register now"}
              </Button>
            </Typography>
          </Box>
        </Box>
      </CustomPaper>
    </Box>
  );
});

export default AuthPage;

