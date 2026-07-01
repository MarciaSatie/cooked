import { useEffect, useState } from "react";
import { getRecipes, getRecipeListByFirstLetter } from "../api/recipes-api";
import type { RecipesList, Recipe,CleanRecipe } from "../types/interfaces";

/**
 * Fetches recipe data for a given meal ID, converts each raw API recipe into
 * the app's cleaned recipe shape, and returns the transformed list.
 *
 * @param id - The MealDB recipe ID to fetch.
 * @returns An object containing the cleaned `recipes` array.
 */
export const useRecipeByID = (id: string) => {
  const [recipes, setRecipes] = useState<CleanRecipe[]>([]);

  useEffect(() => {
    // 1. Create an inner async function so we can use "await"
    async function loadData() {
      try {
        // Make the API call (returns the raw HTTP response)
        const response = await getRecipes(id);

        // Extract the actual JSON data payload from the response
        const data: RecipesList = await response.json();

        // 4. Update state with the meals array (or empty array if missing)
        if (data && data.meals) {
          const cleanData: CleanRecipe[] = data.meals.map((rawMeal) => ({
            idMeal: rawMeal.idMeal,
            strMeal: rawMeal.strMeal,
            strCategory: rawMeal.strCategory,
            strArea: rawMeal.strArea,
            strInstructions: rawMeal.strInstructions,
            strMealThumb: rawMeal.strMealThumb,
            strTags: rawMeal.strTags,
            strYoutube: rawMeal.strYoutube,
            ingredientsList: getIngredientList(rawMeal),
            isFavorite:false,
          }));
        

          setRecipes(cleanData);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        // 5. Catch network failures or parsing errors
        console.log("Failed to fetch recipes.");
        console.error(err);
      }
    }

    // Execute the function immediately
    loadData();
  }, [id]); //  Added `id` to the dependency array so the hook refetches if the ID changes
  // The empty array [] means this runs exactly ONCE when the page loads

  return { recipes };
};

/**
 * Fetches List of recipes data for First Letter, converts each raw API recipe into
 * the app's cleaned recipe shape, and returns the transformed list.
 *
 * @param letter - Alphabetic Letter to fetch.
 * @returns An object containing the cleaned `recipes` array.
 */
export const useRecipesByFirstLetter = (letter: string) => {
  const [recipes, setRecipes] = useState<CleanRecipe[]>([]);

  useEffect(() => {
    // 1. Create an inner async function so we can use "await"
    async function loadData() {
      try {
        // Make the API call (returns the raw HTTP response)
        const response = await getRecipeListByFirstLetter(letter);

        // Extract the actual JSON data payload from the response
        const data: RecipesList = await response.json();

        // 4. Update state with the meals array (or empty array if missing)
        if (data && data.meals) {
          const cleanData: CleanRecipe[] = data.meals.map((rawMeal) => ({
            idMeal: rawMeal.idMeal,
            strMeal: rawMeal.strMeal,
            strCategory: rawMeal.strCategory,
            strArea: rawMeal.strArea,
            strInstructions: rawMeal.strInstructions,
            strMealThumb: rawMeal.strMealThumb,
            strTags: rawMeal.strTags,
            strYoutube: rawMeal.strYoutube,
            ingredientsList: getIngredientList(rawMeal),
            isFavorite:false,
          }));
        

          setRecipes(cleanData);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        // 5. Catch network failures or parsing errors
        console.log("Failed to fetch recipes.");
        console.error(err);
      }
    }

    // Execute the function immediately
    loadData();
  }, [letter]); //  Added `id` to the dependency array so the hook refetches if the ID changes
  // The empty array [] means this runs exactly ONCE when the page loads

  return { recipes };
};


type Ingredient = {
  name: string;
  measure: string;
};

const getIngredientList = (recipe: Recipe): Ingredient[] => {
  const list: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];

    if (typeof ingredient === "string" && ingredient.trim() !== "") {
      list.push({
        name: ingredient.trim(),
        measure: typeof measure === "string" ? measure.trim() : "",
      });
    }
  }

  return list;
};

