
import React, { useContext } from "react";
import type { MouseEvent } from "react"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RecipesContext } from "../../contexts/recipesContext";
import type { CleanRecipe } from "../../types/interfaces"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type


const AddToFavouritesIcon: React.FC<CleanRecipe> = (movie) => {
  const context = useContext(RecipesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
