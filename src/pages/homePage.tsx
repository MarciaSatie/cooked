// src/pages/Recipes.tsx
import { useState } from "react";
import { Box, Typography, Divider} from '@mui/material';
import { useQueryRecipesByFirstLetter } from '../hooks/useRecipes'; 

import LettersBTN from '../components/lettersBTN';
import Spinner from "../components/spinner";
import CardList from "../components/cardList"

export default function Home() {
  const [chosenLetter, setchosenLetter] = useState("A");

  const handleChildSelection = (letter: string) => {
    setchosenLetter(letter);
  };

  const {recipes, isLoading, isError, error} = useQueryRecipesByFirstLetter(chosenLetter);

  if (isLoading) {
    return <Spinner />;
  }

  const totalRecipes = recipes.length;

  // Call the hook and pass the recipe List By First Letter you want to fetch
  //const { recipes } = useRecipesByFirstLetter(chosenLetter);
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

      {isError && <Typography color="error">{error instanceof Error ? error.message : 'Failed to load recipes.'}</Typography>}

      <Typography sx={{
        fontFamily: "'Playfair Display', 'serif'",
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize:"1.5rem",
        letterSpacing: '0.5em',
        lineHeight: 1.2,
        color: 'text.primary',
        mb: 4, 
      }}> Recipes Starting with {chosenLetter}</Typography>
      <p>Total Recipes: {totalRecipes}</p>

      {/* Card List Component*/}
      <CardList recipes={recipes} />
    </Box>
  );
}
