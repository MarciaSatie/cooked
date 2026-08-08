// src/pages/Recipes.tsx
import { useState } from "react";
import { Box, Typography, Divider} from "@mui/material";
import { useQuerySurpriseMe10 } from "../hooks/useRecipes";
import { IconButton, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Spinner from "../components/spinner";
import CardList from "../components/cardList"
import RecipeFilterUI from "../components/recipeFilterUI";
import { filterRecipes } from "../utils/recipeFilters";

export default function SurpriseMe() {

  const { recipes, isLoading, isError, error,refetch } = useQuerySurpriseMe10();

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

  const handleChangeRecipes = () => {
    refetch(); 
  };

  const filteredRecipes = filterRecipes(recipes, {
    titleFilter,
    countryFilter,
    ingredientsFilterList,
  });
  if (isLoading) {
    return <Spinner />;
  }


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
      />

      <Typography variant="h4" gutterBottom>
        Need new ideas?{" "}
        <Box component="span" sx={{ color: "primary.main",fontSize: "1.5rem" }}>
          check our 10 Random Recipes{" "}
        </Box>
      </Typography>

      <Divider sx={{ my: 3 }} />


      {isLoading && <Typography>Loading recipes...</Typography>}
      {isError && (
        <Typography color="error">
          {error instanceof Error ? error.message : "Failed to load recipes."}
        </Typography>
      )}

      <Typography sx={{
        fontFamily: "'Playfair Display', 'serif'",
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize:"1.5rem",
        letterSpacing: '0.5em',
        lineHeight: 1.2,
        color: 'text.primary',
        mb: 4, 
      }}> Need more inspiration?</Typography>
      <Button variant="outlined">
        <IconButton onClick={handleChangeRecipes} color="primary">
          Try a new Selection <RefreshIcon />
        </IconButton>
      </Button>
      <Divider sx={{ my: 3 }} />

      {/* Card List Component*/}
      <CardList recipes={filteredRecipes} />
    </Box>
  );
}