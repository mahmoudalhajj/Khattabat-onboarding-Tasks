"use client";

import { useEffect, KeyboardEvent, useRef } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "../stores/MessageStore";
import { Colors as colors } from "../enums/colors";
import {
  Box,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { CustomPaper } from "./common/CustomPaper";
import { CustomButton } from "./common/CustomButton";
import { CustomTextField } from "./common/CustomTextField";
import { EmptyState } from "./common/EmptyState";
import { MessageBubble } from "./chat/MessageBubble";

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
    messageStore.handleSendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <CustomPaper
      sx={{
        width: "100%",
        maxWidth: 780,
        height: 680,
        display: "flex",
        flexDirection: "column",
        p: 0, 
        overflow: "hidden",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: colors.primary, boxShadow: "none" }}>
        <Toolbar sx={{ gap: 2 }}>
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
          <EmptyState icon={<ChatBubbleIcon />} label="No messages yet, start chatting!" />
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
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
        <CustomTextField
            multiline
            minRows={1}
            maxRows={4}
            placeholder="Write a message..."
            value={draft}
            onChange={(event) => messageStore.setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ bgcolor: colors.background }}
          />
          <Tooltip title="Send (Press Enter)" placement="top">
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <CustomButton
                type="submit"
                label="Send"
                sx={{
                  bgcolor: colors.secondary,
                  color: colors.background,
                  px: 4,
                  py: 1.5,
                  minWidth: 120,
                  '&:hover': {
                    bgcolor: colors.secondary,
                    opacity: 0.9,
                  }
                }}
              />
            </Box>
          </Tooltip>

          
        </Box>
        
      </Box>
    </CustomPaper>

);
});

export default Chatting;
