import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const CustomTextField = ({ sx, InputProps, ...props }: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      InputProps={{
        ...InputProps,
        sx: {
          borderRadius: 2,
          ...InputProps?.sx,
        },
      }}
      sx={sx}
      {...props}
    />
  );
};
