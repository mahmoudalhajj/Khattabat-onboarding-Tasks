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
        fontSize: 20,
      }}
    >
        <h1>Hsome page.</h1>
    </Box>
  );
  
  
}
