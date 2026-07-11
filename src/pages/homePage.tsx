// src/pages/Recipes.tsx
import { useState } from "react";
import { Box, Typography, Divider,Pagination } from '@mui/material';
import { useQueryRecipesByFirstLetter } from '../hooks/useRecipes'; 
import RecipeCard from '../components/recipeCard';
import LettersBTN from '../components/lettersBTN';
import Spinner from "../components/spinner";


export default function Home() {
  const [chosenLetter, setchosenLetter] = useState("A");
  const [page, setPage] = useState(1);

  const RECIPES_PER_PAGE = 5;

  const handleChildSelection = (letter: string) => {
    setchosenLetter(letter);
    setPage(1);
  };

  const {recipes, isLoading, isError, error} = useQueryRecipesByFirstLetter(chosenLetter);

  if (isLoading) {
    return <Spinner />;
  }

  const totalRecipes = recipes.length;

  /*
    Return an Array with Sliced Recipe list based on Page Number 
  */
  const recipesListPerPage = (page: number) => {
    const startIndex = (page - 1) * RECIPES_PER_PAGE; 
    const endIndex = page * RECIPES_PER_PAGE;
  
    return recipes.slice(startIndex, endIndex);
  };

  const recipesPerPage = recipesListPerPage(page);

  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE); // round up the result 

  const handleRecipesPerPage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };


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

      {/* Pagination Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, width: '100%' }}>
        <Pagination count={Math.max(totalPages, 1)}  // returns the bigger value between totalPages and 1
        page={page}
        onChange={handleRecipesPerPage}
        color="primary" 
        />
      </Box>
      <br></br>

      {/* Cards */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(5, minmax(0, 1fr))',
          },
        }}
      >
        {recipesPerPage.map((recipe) => (
          <div key={recipe.idMeal}>
              <RecipeCard recipe={recipe}/>
          </div>
        ))}
      </Box>
    </Box>
  );
}
