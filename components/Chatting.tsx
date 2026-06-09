"use client";

import { useEffect, KeyboardEvent, useRef } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "../stores/MessageStore";
import { Colors as colors } from "../enums/colors";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const Chatting = observer (()=> {
  const endRef = useRef<HTMLDivElement | null>(null);
  const messages = messageStore.getAllMessages();
  const draft = messageStore.getDraft();

  useEffect(() => {
    messageStore.loadStoredMessages();
  }, []);

  useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages.length]);


const handleSend = () => {
    messageStore.sendMessages(
        messageStore.getDraft()
    );
};
const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 780,
        height: 680,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: colors.primary, boxShadow: "none" }}>
        <Toolbar sx={{ gap: 2 }}>
           <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#44b700",
                boxShadow: "0 0 0 2px white",
              },
            }}
          ></Badge>
          <Avatar sx={{ bgcolor: colors.secondary }}>C</Avatar>
          <Box>
            <Typography variant="h6">Chat</Typography>
            <Typography variant="caption" color="text.secondary">
              Type a message and press send.
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button
              color="inherit"
              onClick={() => messageStore.clearMessages()}
              sx={{ textTransform: 'none' }}
            >
              Clear
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          bgcolor: colors.background,
          p: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
             <Chip
              icon={< ChatBubbleIcon sx={{ marginTop: "3px" }}  />}
              label="No messages yet, start chatting!"
              variant="outlined"
              color="default"
              sx={{ color: "text.secondary", borderColor: "divider"}}
            />
          </Box>
        ) : (
          messages.map((message) => {
            return (
              <Box
                key={message.id}
                sx={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                }}
              >
                <Paper
                  sx={{
                    p: 1.8,
                    bgcolor: "text.primary",
                    color: "white",
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
          })
        )}
        <Box ref={endRef} />
      </Box>


    <Box
        component="form"
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        sx={{ p: 2, bgcolor: "background.paper" }}
      >
  
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
           > 
        <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            placeholder="Write a message..."
            value={draft}
            onChange={(event) => messageStore.setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ bgcolor: "white", borderRadius: 2 }}
          />
          <Tooltip title="Send (Press Enter)" placement="top">
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: colors.secondary,
              color: "white",
              px: 4,
              py: 1.5,
              textTransform: "none",
              minWidth: 120,
            }}
          >
            Send
          </Button>
          </Tooltip>

          
        </Box>
        
      </Box>
    </Paper>

);
});

export default Chatting;