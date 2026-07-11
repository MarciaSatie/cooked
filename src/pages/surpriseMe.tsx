// src/pages/Recipes.tsx

import { Box, Typography, Divider } from '@mui/material';
import { useQuerySurpriseMe10 } from '../hooks/useRecipes'; 
import RecipeCard from '../components/recipeCard';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SurpriseMe() {


  const {recipes, isLoading, isError, error} = useQuerySurpriseMe10();

  // Call the hook and pass the recipe List By First Letter you want to fetch
  //const { recipes } = useRecipesByFirstLetter(chosenLetter);
  // Move loading and error conditions inside the component scope

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Without any ideas what to cook, check our 10 Random Recipes 
      </Typography>

      <Divider sx={{ my: 3 }} /> 

      {isLoading && <Typography>Loading recipes...</Typography>}
      {isError && <Typography color="error">{error instanceof Error ? error.message : 'Failed to load recipes.'}</Typography>}

      <IconButton onClick={() => window.location.reload()} color="primary">
        <RefreshIcon />
      </IconButton>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe}/>
        ))}
      </Box>
    </Box>
  );
}
