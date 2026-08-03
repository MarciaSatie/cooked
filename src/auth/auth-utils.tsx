
import { supabase } from './supabaseClient';


export const handleRegisterUser = async (emailInput: string, passwordInput: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
    });
  
    if (error) {
      console.error('Registration failed:', error.message);
      return { success: false, error: error.message };
    }
  
    // User object created successfully!
    console.log('User created:', data.user);
    return { success: true, user: data.user };
  };