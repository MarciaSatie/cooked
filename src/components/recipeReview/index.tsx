import React from "react";
import { Box, Typography } from '@mui/material';
import type { CleanRecipe } from '../../types/interfaces';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import WriteReview from "./writeReview";
import ReviewTable from "./reviewTable"
import { useQueryGetReviewsByRecipeId } from "../../hooks/useRecipes";




type RecipeReviewProps = {
  recipe: CleanRecipe;
};




export default function RecipeReview({ recipe }: RecipeReviewProps) {
  const id = React.useId(); // Needed for Accordion Component (mainly with multiples accordions)
  
  const reviews = useQueryGetReviewsByRecipeId(recipe.idMeal)
  return (
    <Box>
      <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`${id}-panel1-content`}
            id={`${id}-panel1-header`}
          >
              <Typography component="span" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RateReviewIcon color="primary" fontSize="large" />
                {/* Page heading for the review form. */}
                <Typography component="h2" variant="h5" sx={{ ml: 2 }}>
                    Write a review
                </Typography>
              </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <WriteReview recipe={recipe} />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`${id}-panel2-content`}
            id={`${id}-panel2-header`}
          >
              <Typography component="span" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SpeakerNotesIcon color="primary" fontSize="large" />
                {/* Page heading for the review form. */}
                <Typography component="h2" variant="h5" sx={{ ml: 2 }}>
                    Reviews
                </Typography>
              </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <ReviewTable reviewList={reviews.reviews} />
          </AccordionDetails>
        </Accordion>
        <p>{reviews.error}</p>
    </Box>
  );
}


