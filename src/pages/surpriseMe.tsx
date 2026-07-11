// src/pages/Recipes.tsx
import { useState } from "react";
import { Box, Typography, Divider,Pagination } from "@mui/material";
import { useQuerySurpriseMe10 } from "../hooks/useRecipes";
import RecipeCard from "../components/recipeCard";
import { IconButton, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Spinner from "../components/spinner";

export default function SurpriseMe() {
  const [page, setPage] = useState(1);
  const { recipes, isLoading, isError, error,refetch } = useQuerySurpriseMe10();
  const RECIPES_PER_PAGE = 5;

  const handleChangeRecipes = () => {
    refetch(); 
  };

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

  return (
    <Box sx={{ p: 4 }}>
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