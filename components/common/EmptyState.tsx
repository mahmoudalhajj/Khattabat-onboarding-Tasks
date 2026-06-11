import React from "react";
import { Box, Chip, SvgIconProps } from "@mui/material";
import { Colors as colors } from "../../enums/colors";

interface EmptyStateProps {
  icon: React.ReactElement<SvgIconProps>;
  label: string;
}

export const EmptyState = ({ icon, label }: EmptyStateProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }}>
      <Chip
        icon={React.cloneElement(icon, { sx: { ...icon.props.sx, marginTop: "3px" } })}
        label={label}
        variant="outlined"
        sx={{
          color: colors.secondary,
          borderColor: colors.border,
          p: 2,
        }}
      />
    </Box>
  );
};
