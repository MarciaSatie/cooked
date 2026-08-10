/* eslint-disable @typescript-eslint/no-explicit-any */
// src/chatbot/ChatWidget.tsx
import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react'; // Clean v7 submodule React hook package
import { Box, TextField, Button, Paper, Typography, Stack, Fab, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import myLogo from "../assets/chef-hat.png"; 
import { DefaultChatTransport } from 'ai'; // Modern required network transport layer
import { generateRecipe } from '../../../api/chat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState(''); 
  

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      // 💡 This web URL communicates with the exact same Groq SDK servers behind the scenes!
      api: 'https://groq.com',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: {
        model: 'llama-3.1-8b-instant', // Free workhorse model
        stream: true, // Crucial for real-time word-by-word printing
      }
    }),
  });


  const isLoading = status === 'submitted' || status === 'streaming';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!localInput.trim() || isLoading) return;

    sendMessage({ text: localInput });
    setLocalInput(''); 
  };


  return (
    <Box sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      
      {/* SLIDE COLLAPSE OVERLAY MAIN DRAW CABINET */}
      <Collapse in={isOpen}>
        <Paper elevation={6} sx={{ width: 360, height: 460, display: 'flex', flexDirection: 'column', p: 2, mb: 2, borderRadius: 3 }}>
          
          {/* HEADER TITLE */}
          <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 1, fontWeight: 'bold' }}>
            🧑‍🍳 Cooked Assistant
          </Typography>
          
          {/* MESSAGES LAYER MAP CONTAINER */}
          <Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 0.5 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {messages.map((m: any) => (
              <Box
                key={m.id}
                sx={{
                  // Automatically positions user boxes on the right, and bot answers on the left
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: m.role === 'user' ? 'primary.main' : 'grey.100',
                  color: m.role === 'user' ? 'white' : 'text.primary',
                  p: 1.2,
                  borderRadius: 2,
                  maxWidth: '80%',
                }}
              >
                {/* MODERN PARSE TEXT BLOCK LOOP */}
                <Typography variant="body2">
                  {m.parts
                    ? m.parts.map((part: any, idx: number) => (part.type === 'text' ? <span key={idx}>{part.text}</span> : null))
                    : (m.text || m.content || "")}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* INPUT BAR BOX ACTION CONTROL PANEL */}
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

      {/* ROUND ACTION INTERACTIVE BUBBLE BUTTON */}
      <Fab color="primary" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <CloseIcon />
        ) : (
          <Box 
            component="img"
            src={myLogo} 
            alt="App Logo"
            sx={{ 
              width: 32,    
              height: 32,   
              objectFit: 'contain'
            }}
          />
        )}
      </Fab>
    </Box>
  );
}
