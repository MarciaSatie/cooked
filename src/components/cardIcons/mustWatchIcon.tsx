import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

interface MustWatchIconProps {
  movie: BaseMovieProps;
}

const MustWatchIcon: React.FC<MustWatchIconProps> = ({ movie }) => {
  const context = useContext(MoviesContext);
  const isMustWatch = context.mustWatch.includes(movie.id);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <PlaylistAddIcon color={isMustWatch ? "error" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default MustWatchIcon;