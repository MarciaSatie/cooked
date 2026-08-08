import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CardList from "../components/cardList";
import { fetchUserFavorites } from "../../api/custom-api";
import type { CleanRecipe } from "../types/interfaces";

export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<CleanRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        const rows = await fetchUserFavorites();
        const recipes: CleanRecipe[] = [];

        // Each database row includes a `recipe` object. Pull that object for the card list.
        if (Array.isArray(rows)) {
          for (const row of rows) {
            if (row?.recipe) {
              recipes.push(row.recipe as CleanRecipe);
            }
          }
        }

        setFavoriteRecipes(recipes);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load favorites.";
        setError(message);
      } finally {
        setLoading(false);
      }
      
    };

    void loadFavorites();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your favorite recipes
      </Typography>

      <Divider sx={{ my: 3 }} />
      {loading ? (
        <Typography color="text.secondary">Loading favorites...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : favoriteRecipes.length === 0 ? (
        <Typography color="text.secondary">
          No favorites yet. Add some recipes from the home page or recipe details.
        </Typography>
      ) : (
        <CardList recipes={favoriteRecipes} />
      )}
    </Box>
  );
}