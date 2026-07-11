// src/pages/Recipes.tsx

import { Box, Typography, Divider } from "@mui/material";
import { useQuerySurpriseMe10 } from "../hooks/useRecipes";
import RecipeCard from "../components/recipeCard";
import { IconButton, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Spinner from "../components/spinner";

export default function SurpriseMe() {
  const { recipes, isLoading, isError, error,refetch } = useQuerySurpriseMe10();

  const handleChangeRecipes = () => {
    refetch(); 
  };

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Need new ideas?{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
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

      <h2> Need more inspiration?</h2>
      <Button variant="outlined">
        <IconButton onClick={handleChangeRecipes} color="primary">
          Try new Selection <RefreshIcon />
        </IconButton>
      </Button>
      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(1, minmax(0, 1fr))",
            md: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
}
