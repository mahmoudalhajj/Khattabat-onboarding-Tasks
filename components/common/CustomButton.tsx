import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const CustomButton = ({ label, sx, ...props }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        textTransform: "none",
        borderRadius: 10,
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
