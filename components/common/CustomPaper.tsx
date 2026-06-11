import React from "react";
import { Paper, PaperProps } from "@mui/material";
import { Colors as colors } from "../../enums/colors";

interface CustomPaperProps extends PaperProps {
  children: React.ReactNode;
}

export const CustomPaper = ({ children, sx, ...props }: CustomPaperProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: colors.background,
        border: `1px solid ${colors.secondary}`,
        boxShadow: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
