import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import RecipeCard from "../recipeCard";
import type { CleanRecipe } from "../../types/interfaces";


type CardListProps = {
  recipes: CleanRecipe[];
};

export default function CardList({ recipes }: CardListProps) {
  const [page, setPage] = useState(1);
  const RECIPES_PER_PAGE = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [recipes]);

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
    <>
      {/* Pagination Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, width: "100%" }}>
        <Pagination
          count={Math.max(totalPages, 1)}
          page={page}
          onChange={handleRecipesPerPage}
          color="primary"
          sx={{ mb: 3 }}
        />
      </Box>

      {/* Cards */}
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
        {recipesPerPage.map((recipe) => (
          <div key={recipe.idMeal}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </Box>
    </>
  );
}