// src/pages/Recipes.tsx
import { Box, Typography, Card, CardContent } from '@mui/material';

// Dummy data for visualization
const dummyRecipes = [
  { id: 1, title: 'Classic Pancakes', time: '20 mins' },
  { id: 2, title: 'Spaghetti Carbonara', time: '30 mins' },
  { id: 3, title: 'Chocolate Chip Cookies', time: '25 mins' },
];

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Recipes
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {dummyRecipes.map((recipe) => (
          <Box key={recipe.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography color="text.secondary">Prep time: {recipe.time}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
