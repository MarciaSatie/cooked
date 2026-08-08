import { useState} from "react";
import { Box, Typography, Divider,Button, TextField } from "@mui/material";
import { useQueryRecipesByIngredient } from '../hooks/useRecipes';
import Spinner from "../components/spinner";
import CardList from "../components/cardList"


export default function RecipeByIngredientPage() { 

  const [ingredientInput, setIngredientInput] = useState("Chicken");
  const [ingredient, setIngredient] = useState("Chicken");
  
  const handleSearch = () => {
    setIngredient(ingredientInput);
  };

  const handleClear = () => {
    setIngredientInput("");
  };

  const { recipes, isLoading, isError, error } =  useQueryRecipesByIngredient(ingredient);
  if (isLoading) {
    return <Spinner />;
  }
  const totalRecipes = recipes.length;


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Check Recipes By Ingredient
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Box sx={{display:"flex"}}>
          <TextField
            sx={{ mt: 2, mr:1, width: "15%", backgroundColor: "rgb(255, 255, 255)" }}
            label="Ingredient"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />

          <Button variant="contained" color="primary" size="small" sx={{ mt: 2,mr:1 }} onClick={handleSearch}>
              Search
          </Button>
          <Button variant="contained" color="secondary" size="small" sx={{ mt: 2 }} onClick={handleClear}>
              Clear
          </Button>
      </Box>

      {isLoading && <p>Loading recipes...</p>}
      {isError && (
          <p style={{ color: 'crimson' }}>
            Failed to load recipes: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        )}



      <Divider sx={{ my: 3 }} />
      <p>Total Recipes: {totalRecipes}</p>
      {isError && <Typography color="error">{error instanceof Error ? error.message : 'Failed to load recipes.'}</Typography>}
      {/* Card List Component*/}
      <CardList recipes={recipes} />

    </Box>


  );
}