// src/pages/Recipes.tsx
import { Box, Typography } from '@mui/material';
import { useRecipeByID } from '../hooks/useRecipes'; 
import RecipeCard from '../components/recipeCard';

// 1. Fixed Interface naming convention

export default function Home() {

  // Call the hook and pass the recipe ID you want to fetch
  const { recipes } = useRecipeByID('52772'); 
  // Move loading and error conditions inside the component scope

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
        {recipes.map((recipe) => (
          // Fixed matching properties with the API response template schema
          <RecipeCard recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
}
