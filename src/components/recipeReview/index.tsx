import { Box, Divider } from '@mui/material';
import type { CleanRecipe } from '../../types/interfaces';
import AccordionWriteReview from "./writeReview";

type RecipeReviewProps = {
  recipe: CleanRecipe;
};

export default function RecipeReview({ recipe }: RecipeReviewProps) {
  return (
    <Box>

      <AccordionWriteReview recipe={recipe} />
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}


