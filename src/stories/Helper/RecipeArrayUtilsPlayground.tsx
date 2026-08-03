import * as React from "react";
import { useState } from "react";
import { Box, Button, Chip} from '@mui/material';
import TextField from "@mui/material/TextField";
import type { CleanRecipe } from "../../types/interfaces";

const sampleRecipes: CleanRecipe[] = [
  {
    idMeal: "1",
    strMeal: "Spaghetti Carbonara",
    strCategory: "Pasta",
    strArea: "Italian",
    strCountry: "Italy",
    strInstructions: "Cook pasta and mix with sauce.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Pasta", measure: "200g" },{ name: "Tomato", measure: "4" }],
    isFavorite: false,
  },
  {
    idMeal: "2",
    strMeal: "Chicken Curry",
    strCategory: "Chicken",
    strArea: "Indian",
    strCountry: "India",
    strInstructions: "Simmer chicken with curry spices.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Chicken", measure: "300g" }],
    isFavorite: true,
  },
  {
    idMeal: "3",
    strMeal: "Taco Bowl",
    strCategory: "Mexican",
    strArea: "Mexican",
    strCountry: "Mexico",
    strInstructions: "Assemble taco ingredients in a bowl.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Beans", measure: "1 cup" }],
    isFavorite: false,
  },
  {
    idMeal: "4",
    strMeal: "Spaghetti Carbonara and Tuna",
    strCategory: "Pasta",
    strArea: "Italian",
    strCountry: "Italy",
    strInstructions: "Cook pasta and mix with sauce.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Pasta", measure: "200g" },{ name: "Tomato", measure: "4" },{ name: "Tuna", measure: "1 can" }],
    isFavorite: false,
  },
];

export function RecipeArrayUtilsPlayground() {
  const [titleFilter, setTitleFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [ingredientsFilterList, setIngredientsFilterList] = useState<string[]>([]);

  const handleAddIngredient = () => {
    const nextIngredient = ingredientsFilter.trim();
    // if list includes prevIngredients return true else false
    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.includes(nextIngredient)? prevIngredients: [...prevIngredients,nextIngredient]
    );
    setIngredientsFilter("");
  }

  const handleDeleteIngredient =(ingredientToRemove:string) => {
    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredientToRemove)
    );
  }

  const filteredRecipes = sampleRecipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(titleFilter.toLowerCase())&&
    recipe.strCountry.toLowerCase().includes(countryFilter.toLowerCase())&&
    ingredientsFilterList.every((selectedIngredient) => 
      // Search through the recipe ingredient list for a matching ingredient name.
      recipe.ingredientsList.some((ingredient) =>
        ingredient.name.toLowerCase().includes(selectedIngredient.toLowerCase())
      )
    )
  );



  return (
    <div style={{ width: "720px", fontFamily: "sans-serif" }}>
      <h2>Recipe Filter Playground</h2>
      <hr></hr>
      <Box>
        <p>Testing Filter by Title.</p>
        <TextField
          sx={{ mt: 2, width: "100%", backgroundColor: "white" }}
          label="Recipe name"
          type="search"
          variant="filled"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />

      </Box>
      <Box>
        <TextField
            sx={{ mt: 2, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
            id="country-search"
            label="Country"
            type="search"
            variant="filled"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
        />
      </Box>

      <Box sx={{display:"flex"}}>
        <TextField
            sx={{ mr: 1, mt:2, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
            id="Ingredients-search"
            label="Ingredients"
            type="search"
            variant="filled"
            value={ingredientsFilter}
            onChange={(e) => setIngredientsFilter(e.target.value)}

        />

        <Button variant="contained" color="secondary" size="small" sx={{ mt: 2 }} onClick={handleAddIngredient}>
            Add
        </Button>
    </Box>
    <Box>
      <p>List of Filter Ingredients:</p>
      <p>
          {ingredientsFilterList.map((ingredient) => (
              <Chip
                color="secondary"
                key={ingredient}
                label={ingredient}
                onDelete={() => handleDeleteIngredient(ingredient)}
                sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </p>
    </Box>
    <Box>
        <p>Filter Results:</p>
          <ul>
            {filteredRecipes.map((recipe) => (
                <li key={recipe.idMeal}>
                {recipe.strMeal} -- 
                {recipe.strCountry} --
                Ingredients: 
                {recipe.ingredientsList
                  .map((ing) => ing.name + " (" + ing.measure + ")")
                  .join(", ")}
              </li>
            ))}
          </ul>
          <hr></hr>
      </Box>

    </div>
  );
}