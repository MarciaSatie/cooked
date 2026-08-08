import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CardList from "../components/cardList";
import { useQueryGetFavoriteRecipesList } from "../hooks/useRecipes";
import RecipeFilterUI from "../components/recipeFilterUI";
import { filterRecipes } from "../utils/recipeFilters";


export default function FavoritesPage() {
  const { recipes, isLoading, isError, error } = useQueryGetFavoriteRecipesList();

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
      />

      <Typography variant="h4" gutterBottom>
        Your favorite recipes
      </Typography>

      <Divider sx={{ my: 3 }} />

      <p>Total Recipes: {totalRecipes}</p>
      {isLoading ? (
        <Typography color="text.secondary">Loading favorites...</Typography>
      ) : isError ? (
        <Typography color="error">
          {error instanceof Error ? error.message : "Failed to load favorites."}
        </Typography>
      ) : recipes.length === 0 ? (
        <Typography color="text.secondary">
          No favorites yet. Add some recipes from the home page or recipe details.
        </Typography>
      ) : (
        <CardList recipes={filteredRecipes} />
      )}
    </Box>
  );
}