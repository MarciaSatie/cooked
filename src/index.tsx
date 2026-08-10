import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter} from 'react-router-dom'
import { theme } from './theme'
import Header from './components/header';
import AppRoutes from './components/appRoutes'
// tanstack is same as React-Query it jsut also works fro Vue, Svelte, etc...
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RecipesContextProvider from './contexts/recipesContext';
import { AuthProvider } from './supabase';
import ChatWidget from './ChatWidget'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RecipesContextProvider>
            <BrowserRouter>
              <Header title="Welcome to Cooked" />
              <ChatWidget/>
              <AppRoutes />
              <ReactQueryDevtools initialIsOpen={true} />
            </BrowserRouter>
          </RecipesContextProvider>
        </AuthProvider>
      </QueryClientProvider>


    </ThemeProvider>
  </StrictMode>,
)
