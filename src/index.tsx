import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import Header from './components/header';
import Home from './pages/homePage'
import FavoritesPage from './pages/favoritesPage'
import SurpriseMe from './pages/surpriseMe'
// tanstack is same as React-Query it jsut also works fro Vue, Svelte, etc...
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header title='Welcome to Cooked' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/surpriseMe' element={<SurpriseMe />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
