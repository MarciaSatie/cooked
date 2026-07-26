import { useContext } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CardList from "../components/cardList"
import { RecipesContext } from "../contexts/recipesContext";

export default function FavoritesPage() {
  const { favoriteRecipes } = useContext(RecipesContext);


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your favorite recipes
      </Typography>

      <Divider sx={{ my: 3 }} />
      {favoriteRecipes.length === 0 ? (
        <Typography color="text.secondary">
          No favorites yet. Add some recipes from the home page or recipe details.
        </Typography>
      ) : (
        <CardList recipes={favoriteRecipes} />
      )}
    </Box>
  );
}