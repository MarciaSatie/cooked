import { useContext } from "react";
import type { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { SxProps, Theme } from "@mui/material/styles";
import type { CleanRecipe } from "../../types/interfaces";
import { RecipesContext } from "../../contexts/recipesContext";
import { AddRecipeToDataBase, RemoveRecipeToDataBase } from "../../supabase/database/utils" 

type FavoriteToggleProps = {
  recipe: CleanRecipe;
  sx?: SxProps<Theme>;
};

export default function FavoriteToggle({ recipe, sx }: FavoriteToggleProps) {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(RecipesContext);
  const isFavourite = favourites.includes(recipe.idMeal);
  const mergedSx = [
    {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      position: "relative",
      zIndex: 2,
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      },
    },
    //if sx is already an array, use it as-is
    //if sx is one style object, put it inside an array
    //if sx does not exist, use an empty array
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []), // it wraps your object in an array so the code can merge styles consistently.
  ];

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavourite) {
      removeFromFavourites(recipe);
      await RemoveRecipeToDataBase(recipe);
      return;
    }

    addToFavourites(recipe);
    await AddRecipeToDataBase(recipe);
  };

  return (
    <Tooltip title={isFavourite ? "Remove from favourites" : "Add to favourites"} arrow>
      <IconButton
        onClick={handleClick}
        sx={mergedSx}
      >
        <FavoriteIcon sx={{ color: isFavourite ? "#e53935" : "#b0bec5" }} />
      </IconButton>
    </Tooltip>
  );
}