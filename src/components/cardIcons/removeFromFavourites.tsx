import React, { useContext } from "react";
import type { MouseEvent } from "react"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { RecipesContext } from "../../contexts/recipesContext";
import type{ CleanRecipe } from "../../types/interfaces";// because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type

interface RemoveFromFavouritesIconProps {
  recipe: CleanRecipe;
}

const RemoveFromFavourites: React.FC<RemoveFromFavouritesIconProps> = ({ recipe }) => {
  const context = useContext(RecipesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(recipe);
  };

  return (
    <IconButton aria-label="remove from favourites" onClick={onUserRequest}>
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavourites;