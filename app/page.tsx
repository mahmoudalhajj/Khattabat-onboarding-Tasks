import Image from "next/image";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
        <h2>This is the home page.</h2>
    </Box>
  );
  
  
}
