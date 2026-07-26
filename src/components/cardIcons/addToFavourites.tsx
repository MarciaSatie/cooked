import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

interface AddToFavouritesIconProps {
  movie: BaseMovieProps;
}

const AddToFavouritesIcon: React.FC<AddToFavouritesIconProps> = ({ movie }) => {
  const context = useContext(MoviesContext);
  const isFavourite = context.favourites.includes(movie.id);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };

  return (
    <IconButton aria-label="add to favourites" onClick={onUserSelect}>
      <FavoriteIcon color={isFavourite ? "error" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;