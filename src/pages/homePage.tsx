// src/pages/Recipes.tsx
import { useState } from "react";
import { Box, Typography, Divider } from '@mui/material';
import { useRecipesByFirstLetter } from '../hooks/useRecipes'; 
import RecipeCard from '../components/recipeCard';
import LettersBTN from '../components/lettersBTN';

// 1. Fixed Interface naming convention

export default function Home() {
  const [chosenLetter, setchosenLetter] = useState("A");
  const handleChildSelection = (letter: string) => {
    setchosenLetter(letter);
  };


  // Call the hook and pass the recipe List By First Letter you want to fetch
  const { recipes } = useRecipesByFirstLetter(chosenLetter);
  // Move loading and error conditions inside the component scope

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recipes A–Z 
      </Typography>
      {/* selectedLetter: Alphabetic char input.
          onLetterSelect: Callback function to send new letter input value up tot eh parent component.*/}
      <LettersBTN
        selectedLetter={chosenLetter}
        onLetterSelect={handleChildSelection}
      />
      <Divider sx={{ my: 3 }} /> 

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
