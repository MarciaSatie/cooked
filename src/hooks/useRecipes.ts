import { useEffect, useState } from "react";
import { getRecipes, getRecipeListByFirstLetter,get1RandomRecipe } from "../api/recipes-api";
import type { RecipesList, Recipe,CleanRecipe } from "../types/interfaces";
import { useQuery } from '@tanstack/react-query';

// #region Use Queries 
export const useQueryRecipesByFirstLetter = (letter: string) => {
  // useQuery returns data, loading, and error states automatically
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // 1. The Query Key tracks the changing letter dependency
    queryKey: ['recipes', letter], 
    // 2. The Query Function executes the actual network request
    queryFn: async () => {
      const response = await getRecipeListByFirstLetter(letter);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }
      return recipeFormatter(data);
    },
    // 3. Optimization: don't fetch if the letter is empty
    enabled: !!letter, 
  });

  return { recipes, isLoading, isError, error };
};

export const useQueryRecipeByID = (id:string)=>{
  //get1RandomRecipe
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // 1. The Query Key tracks the changing letter dependency
    queryKey: ['recipes',id], 
    // 2. The Query Function executes the actual network request
    queryFn: async () => {
      const response = await getRecipes(id);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }
      return recipeFormatter(data);
    },
    enabled: !!id, 
  });
  return { recipes, isLoading, isError, error };
};

export const useQuerySurpriseMe1= ()=>{
  //get1RandomRecipe
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // 1. The Query Key tracks the changing letter dependency
    queryKey: ['recipes'], 
    // 2. The Query Function executes the actual network request
    queryFn: async () => {
      const response = await get1RandomRecipe();
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }
      return recipeFormatter(data);
    },

  });
  return { recipes, isLoading, isError, error };
};

export const useQuerySurpriseMe10 = () => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    queryKey: ['recipes'], 
    queryFn: async () => {
      const dataList: CleanRecipe[] = [];

      for (let i = 0; i < 10; i++) {
        const response = await get1RandomRecipe();
        const data: RecipesList = await response.json();

        if (!data.meals) {
          continue; 
        }

        // Destructure the formatted array into dataList (to avoid nestead arrays)
        dataList.push(...recipeFormatter(data)); 
      }

      return dataList;
    }, 
  });

  return { recipes, isLoading, isError, error };
};

// #endregion
// #region Use Effect API 

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
          const cleanData: CleanRecipe[] = recipeFormatter(data);
        

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
          const cleanData: CleanRecipe[] = recipeFormatter(data);

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

// #endregion
// #region HELPERS 
const recipeFormatter = (data: RecipesList) => {
  if (!data.meals) return [];

  return data.meals.map((rawMeal) => ({
    idMeal: rawMeal.idMeal,
    strMeal: rawMeal.strMeal,
    strCategory: rawMeal.strCategory,
    strArea: rawMeal.strArea,
    strInstructions: rawMeal.strInstructions,
    strMealThumb: rawMeal.strMealThumb,
    strTags: rawMeal.strTags,
    strYoutube: rawMeal.strYoutube,
    ingredientsList: getIngredientList(rawMeal),
    isFavorite: false,
  }));
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


// #endregion