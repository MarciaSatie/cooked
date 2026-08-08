import React from "react";
import { Box, Typography } from '@mui/material';
import type { CleanRecipe, Review } from '../../types/interfaces';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import WriteReview from "./writeReview";
import ReviewTable from "./reviewTable"




type RecipeReviewProps = {
  recipe: CleanRecipe;
};

const prototypeReviewList: Review[] = [
  {
    recipeId: "52772",
    authorId: "author-1",
    author: "Marcia",
    content: "This recipe was easy to follow and tasted great.",
    rating: 4.5,
  },
  {
    recipeId: "52773",
    authorId: "author-2",
    author: "Alex",
    content: "Very clear instructions, but I added extra seasoning.",
    rating: 4,
  },
  {
    recipeId: "52774",
    authorId: "author-3",
    author: "Sam",
    content: "Nice idea, but I would reduce the cooking time a little.",
    rating: 3.5,
  },
];

export default function RecipeReview({ recipe }: RecipeReviewProps) {
  const id = React.useId(); // Needed for Accordion Component (mainly with multiples accordions)
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
            <ReviewTable reviewList={prototypeReviewList} />
          </AccordionDetails>
        </Accordion>
   
    </Box>
  );
}


