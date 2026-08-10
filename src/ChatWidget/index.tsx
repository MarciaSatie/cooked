/* eslint-disable @typescript-eslint/no-explicit-any */
// src/chatbot/ChatWidget.tsx
import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react'; // Clean v7 submodule React hook package
import { DefaultChatTransport } from 'ai'; // Modern required network streaming transport abstraction layer
import { Box, TextField, Button, Paper, Typography, Stack, Fab, Collapse } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import myLogo from "../assets/chef-hat.png"; 
export default function ChatWidget() {
  // 1. LOCAL STATE CONTROL
  // Tracks if the Material UI card bubble window is open or shut
  const [isOpen, setIsOpen] = useState(false);
  // Captures what the user types inside the chat form input text row
  const [localInput, setLocalInput] = useState(''); 

  // 2. THE SEAMLESS TRANSFERS V7 HOOK
  // We use the mandatory transport option block container to clear the red 'api' error
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat', 
    }),
  });

  // 3. RUNTIME ACTIVITY SNAPS
  // Checks if the pipeline is submitted or streaming tokens out to the user interface
  const isLoading = status === 'submitted' || status === 'streaming';

  // 4. MESSAGE SUBMIT BUTTON EVENT HANDLER
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stifles default browser reloading loops
    if (!localInput.trim() || isLoading) return;

    // Direct fire step that handles parsing string packages over into the stream
    sendMessage({ text: localInput });
    setLocalInput(''); // Resets the input view layer clean instantly
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      
      {/* 5. SLIDE ACCORDION CHAT CABINET */}
      <Collapse in={isOpen}>
        <Paper elevation={6} sx={{ width: 360, height: 460, display: 'flex', flexDirection: 'column', p: 2, mb: 2, borderRadius: 3 }}>
          
          {/* HEADER EMBLEM */}
          <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 1, fontWeight: 'bold' }}>
            🧑‍🍳 Cooked Assistant
          </Typography>
          
          {/* 6. MESSAGES RENDER FRAME LAYER */}
          <Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 0.5 }}>
            {/* 💡 FIX: Wrapped the eslint comment correctly inside JSX curly braces */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {messages.map((m: any) => (
              <Box
                key={m.id}
                sx={{
                  // Flips response positioning fields right/left based on role flags
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: m.role === 'user' ? 'primary.main' : 'grey.100',
                  color: m.role === 'user' ? 'white' : 'text.primary',
                  p: 1.2,
                  borderRadius: 2,
                  maxWidth: '80%',
                }}
              >
                {/* 7. SECURED HYBRID PARSE CHECK LAYER */}
                {/* By forcing an 'any' type conversion check sequence line, we can securely use */}
                {/* fallback checks like m.text or m.content without throwing compiler crashes! */}
                <Typography variant="body2">
                  {m.parts
                    ? m.parts.map((part: any, idx: number) => (part.type === 'text' ? <span key={idx}>{part.text}</span> : null))
                    : (m.text || m.content || "")}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* 8. MATERIAL INTERFACE CONTAINER CONTROL */}
          <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask a cooking question..."
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" variant="contained" disabled={isLoading || !localInput.trim()} sx={{ minWidth: 'auto', px: 2 }}>
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* 9. TRIGGER BUTTON FAB */}
      <Fab color="primary" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        // This displays when the chat drawer window layout is open
        <CloseIcon />
      ) : (
        // 💡 FIX: Replaced the placeholder "/logo.png" string with your imported variable {myLogo}
        <Box 
          component="img"
          src={myLogo} 
          alt="App Logo"
          sx={{ 
            width: 32,    // Adjust the width sizing to look clean inside the circle
            height: 32,   // Adjust the height sizing to match perfectly
            objectFit: 'contain'
          }}
        />
      )}
      </Fab>
    </Box>
  );
}
