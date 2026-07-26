import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import type { CleanRecipe } from "../../types/interfaces"; // because of  tsconfig.app.json has verbatimModuleSyntax: true ; equires types to be imported with import type

type WriteReviewProps = {
  recipe: CleanRecipe;
};

const WriteReviewIcon: React.FC<WriteReviewProps> = ({ recipe }) => {
  return (
    <Link to="/reviews/form" state={{ recipeId: recipe.idMeal }}>
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;