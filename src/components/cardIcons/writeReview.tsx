import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import { BaseMovieProps } from "../../types/interfaces";

type WriteReviewProps = {
  movie: BaseMovieProps;
};

const WriteReviewIcon: React.FC<WriteReviewProps> = ({ movie }) => {
  return (
    <Link to="/reviews/form" state={{ movieId: movie.id }}>
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;