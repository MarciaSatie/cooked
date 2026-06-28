import { Box, Typography } from '@mui/material'

export default function FavoritesPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      <Typography color="text.secondary">
        Your saved recipes will show up here.
      </Typography>
    </Box>
  )
}