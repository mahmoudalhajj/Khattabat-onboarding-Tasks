import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { message } from "../../types/message";
import { messageStore } from "../../stores/MessageStore";

import { Colors as colors } from "../../enums/colors";

interface MessageBubbleProps {
  message: message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <Box
      sx={{
        alignSelf: "flex-end",
        maxWidth: "85%",
      }}
    >
      <Paper
        sx={{
          p: 1.8,
          bgcolor: colors.secondary,
          color: colors.background,
          borderRadius: 3,
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {message.text}
        </Typography>
        <Typography variant="caption" sx={{ mt: 0.5, display: "block", opacity: 0.75 }}>
          {messageStore.formatCreatedAt(message.createdAt)}
        </Typography>
      </Paper>
    </Box>
  );
};
