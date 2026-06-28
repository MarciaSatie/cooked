import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import Header from './components/header';
import Home from './pages/homePage'
import FavoritesPage from './pages/favoritesPage'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header title='Welcome to Cooked' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
