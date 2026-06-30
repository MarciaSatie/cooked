import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipes-api";
import type { RecipesList, Recipe,CleanRecipe } from "../types/interfaces";

export const useRecipes = (id: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
          const ingredientObj = getIngredientList(data.meals[0]);
          const cleanData: CleanRecipe[] = data.meals.map((rawMeal) => ({
            idMeal: rawMeal.idMeal,
            strMeal: rawMeal.strMeal,
            strCategory: rawMeal.strCategory,
            strArea: rawMeal.strArea,
            strInstructions: rawMeal.strInstructions,
            strMealThumb: rawMeal.strMealThumb,
            strTags: rawMeal.strTags,
            strYoutube: rawMeal.strYoutube,
            ingredientsList: ingredientObj,
          }));
        

          setRecipes(cleanData);
          console.log(ingredientObj);
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

