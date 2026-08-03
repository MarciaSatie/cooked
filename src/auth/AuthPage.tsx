import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography,Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }

    navigate('/home');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Check your email for confirmation links!');
    navigate('/sign-up');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Welcome</Typography>
        <Box component="form" onSubmit={handleSignIn} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" type="submit" fullWidth>Sign In</Button>
          <Button
            variant="outlined"
            type="button"
            onClick={handleSignUp}
            fullWidth
            startIcon={<PersonAddAltIcon />}
          >
            Sign Up
          </Button>
          {message && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{message}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
}
