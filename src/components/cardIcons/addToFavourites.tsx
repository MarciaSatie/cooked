import React, { useContext } from "react";
import type { MouseEvent } from "react"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RecipesContext } from "../../contexts/recipesContext";
import type { CleanRecipe } from "../../types/interfaces"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type

interface AddToFavouritesIconProps {
  recipe: CleanRecipe;
}

const AddToFavouritesIcon: React.FC<AddToFavouritesIconProps> = ({ recipe }) => {
  const context = useContext(RecipesContext);
  const isFavourite = context.favourites.includes(recipe.idMeal);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(recipe);
  };

  return (
    <IconButton aria-label="add to favourites" onClick={onUserSelect}>
      <FavoriteIcon color={isFavourite ? "error" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;