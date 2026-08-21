/* eslint-disable @typescript-eslint/no-explicit-any */
// src/chatbot/ChatWidget.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Stack, Fab, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import myLogo from "../assets/chef-hat.png"; 
import { streamDecoder } from '../../api/chat'; 
import { useAuth } from "../supabase/auth";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState(''); 
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const userText = localInput.trim(); // User Input
    if (!userText || isLoading) return;

    //  append user message data to messages Array
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]); // using spread operator to add last object to messages Array
    setLocalInput(''); 
    setIsLoading(true);

    try {
      // Fetch the text response stream context from your backend file and Decode it.
      // Return teh string message.
      const response = await streamDecoder(userText);

      // Set up a fresh message slot for the AI response
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: 'assistant', content: response }]);

    }catch (err) {
      console.error("Widget chat stream failure:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: "Failed to load chat stream response." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     {user && (
      <Box sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        
        {/* SLIDE COLLAPSE OVERLAY MAIN DRAW CABINET */}
        <Collapse in={isOpen}>
          <Paper elevation={6} sx={{ width: 400, height: 600, display: 'flex', flexDirection: 'column', p: 2, mb: 2, borderRadius: 3 }}>
            
            {/* HEADER TITLE */}
            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 1, fontWeight: 'bold' }}>
              🧑‍🍳 Chef Bot
            </Typography>
            
            {/* MESSAGES LAYER MAP CONTAINER */}
            <Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 0.5 }}>
              {messages.length === 0 && (
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
                  No messages yet. Ask me any cooking question!
                </Typography>
              )}
              {messages.map((m) => (
                <Box
                  key={m.id}
                  sx={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: m.role === 'user' ? 'primary.main' : 'grey.100',
                    color: m.role === 'user' ? 'white' : 'text.primary',
                    p: 1.2,
                    borderRadius: 2,
                    maxWidth: '80%',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <Typography variant="body2">
                    {m.content}
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

     )};
    </>
  );
}
