import React, { useContext, useState } from "react";
import type { FormEvent } from "react";
import { Alert, Box, Button, Rating, Snackbar, TextField, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { CleanRecipe, Review } from "../../types/interfaces";
import { RecipesContext } from "../../contexts/recipesContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RateReviewIcon from '@mui/icons-material/RateReview';

type WriteReviewProps = {
  recipe: CleanRecipe;
};


export  function WriteReview({ recipe }: WriteReviewProps) {
  const context = useContext(RecipesContext);
  // These state values store what the user types or selects in the form.
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);



  // Labels shown under the star rating when the user hovers or selects a value.
  const labels: { [index: number]: string } = {
    0.5: "Terrible",
    1: "Terrible+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Average",
    3: "Average+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  // This runs when the user submits the review form.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const review: Review = {
      author,
      content,
      agree: false,
      rating,
      recipeId: recipe.idMeal,
    };

    context.addReview(recipe, review);
    setOpen(true);
    setAuthor("");
    setContent("");
    setRating(3);
  };

  return (
    <Box component="div" sx={{ mt: 2, width:"80%", mx:"auto" }}>

      {/* Success message shown after the review is submitted. */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
          <Typography variant="h6">Thank you for submitting a review</Typography>
        </Alert>
      </Snackbar>

      {/* The full review form starts here. */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Author field: user writes their name here. */}
        <TextField
          sx={{ mt: 2, width: "100%" }}
          variant="outlined"
          margin="normal"
          required
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          id="author"
          label="Author's name"
          autoFocus
        />

        {/* Review text field: user writes the review content here. */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={content}
          onChange={(event) => setContent(event.target.value)}
          label="Review text"
          id="review"
          multiline
          minRows={6}
        />

        {/* Rating stars: user chooses a rating with hover feedback. */}
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(_event, newValue) => {
            setRating(newValue ?? 0);
          }}
          onChangeActive={(_event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />

        {/* Text shown under the stars to explain the selected rating. */}
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>

        {/* Submit and reset buttons for the form. */}
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              setAuthor("");
              setContent("");
              setRating(3);
              setHover(-1);
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default function AccordionWriteReview({ recipe }: WriteReviewProps){
  const id = React.useId(); // Needed for Accordion Component (mainly with multiples accordions)
  return(
    <>
      <div>
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
      </div>
    </>
  )
}