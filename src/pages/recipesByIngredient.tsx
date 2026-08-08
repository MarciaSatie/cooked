import { useState} from "react";
import { Box, Typography, Divider,Button, TextField } from "@mui/material";
import { useQueryRecipesByIngredient } from '../hooks/useRecipes';
import Spinner from "../components/spinner";
import CardList from "../components/cardList"
import RecipeFilterUI from "../components/recipeFilterUI";
import { filterRecipes } from "../utils/recipeFilters";

export default function RecipeByIngredientPage() { 

  const [ingredientInput, setIngredientInput] = useState("Chicken");
  const [ingredient, setIngredient] = useState("Chicken");
  const [titleFilter, setTitleFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [ingredientsFilterList, setIngredientsFilterList] = useState<string[]>([]);

  const handleAddIngredient = () => {
    const nextIngredient = ingredientsFilter.trim();

    if (!nextIngredient) {
      return;
    }

    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.includes(nextIngredient)
        ? prevIngredients
        : [...prevIngredients, nextIngredient]
    );
    setIngredientsFilter("");
  };

  const handleDeleteIngredient = (ingredientToRemove: string) => {
    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredientToRemove)
    );
  };

  const handleClearIngredients = () => {
    setIngredientsFilterList([]);
    setIngredientsFilter("");
  };

  
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

  const filteredRecipes = filterRecipes(recipes, {
    titleFilter,
    countryFilter,
    ingredientsFilterList,
  });

  const totalRecipes = filteredRecipes.length;


  return (
    <Box sx={{ p: 4 }}>
      <RecipeFilterUI
        titleFilter={titleFilter}
        countryFilter={countryFilter}
        ingredientsFilter={ingredientsFilter}
        ingredientsFilterList={ingredientsFilterList}
        onAddIngredient={handleAddIngredient}
        onDeleteIngredient={handleDeleteIngredient}
        onClearIngredients={handleClearIngredients}
        onTitleChange={setTitleFilter}
        onCountryChange={setCountryFilter}
        onIngredientChange={setIngredientsFilter}
        showIngredients={false}
      />
      
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
      <CardList recipes={filteredRecipes} />

    </Box>


  );
}