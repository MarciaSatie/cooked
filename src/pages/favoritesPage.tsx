import { Box, Typography, Divider } from "@mui/material";
import CardList from "../components/cardList";
import { useQueryGetFavoriteRecipesList } from "../hooks/useRecipes";

export default function FavoritesPage() {
  const { recipes, isLoading, isError, error } = useQueryGetFavoriteRecipesList();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your favorite recipes
      </Typography>

      <Divider sx={{ my: 3 }} />

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
        <CardList recipes={recipes} />
      )}
    </Box>
  );
}