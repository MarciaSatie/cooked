import { useEffect, useState } from "react";
import { getRecipes, getRecipeListByFirstLetter,get1RandomRecipe } from "../api/recipes-api";
import type { RecipesList, Recipe,CleanRecipe } from "../types/interfaces";
import { useQuery } from '@tanstack/react-query';

// #region Use Queries 
/**
 * Fetches recipes that start with a given first letter using React Query.
 *
 * @param letter - The first letter used to filter recipes.
 * @returns The loaded recipes plus loading and error state.
 */
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

/**
 * Fetches recipes for a specific MealDB recipe ID using React Query.
 *
 * @param id - The MealDB recipe ID.
 * @returns The loaded recipes plus loading and error state.
 */
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
  const recipe = recipes[0];
  return { recipe, isLoading, isError, error };
};

/**
 * Fetches one random recipe using React Query.
 *
 * @returns One random recipe plus loading and error state.
 */
export const useQuerySurpriseMe1 = () => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    queryKey: ['surprise-me', 1],
    queryFn: async () => {
      const response = await get1RandomRecipe();
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }

      return recipeFormatter(data);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { recipes, isLoading, isError, error };
};

/**
 * Fetches ten random recipes in parallel using React Query.
 *
 * @returns Ten random recipes plus loading, error, and refetch state.
 */
export const useQuerySurpriseMe10 = () => {
  // useQuery manages the API request state for us and gives back the loaded recipes plus status flags.
  const { data: recipes = [], isLoading, isError, error, refetch } = useQuery<CleanRecipe[]>({
    // This key uniquely identifies this query in React Query's cache.
    queryKey: ['surprise-me', 10],
    // This function runs when React Query needs to fetch 10 random recipes.
    queryFn: async () => {
      // Start 10 random API requests at the same time instead of waiting for each one in order.
      const responses = await Promise.all(
        Array.from({ length: 10 }, () => get1RandomRecipe())
      );

      // Turn each HTTP response into JSON so we can read the recipe data.
      const payloads = await Promise.all(
        responses.map(async (response) => response.json() as Promise<RecipesList>)
      );

      //flatMap: worlk slike Map, but also "flatten" teh array creating just 1 level array (avoiding nesting)
      //https://saynaesmailzadeh.medium.com/exploring-the-depths-of-map-vs-flatmap-in-javascript-react-js-and-typescript-f6c97c34fb62
      return payloads.flatMap((data) => recipeFormatter(data));
    },
    // Keep the data fresh for 30 minutes so React Query does not refetch too often.
    staleTime: 30 * 60 * 1000,
    // Do not refetch automatically when the user switches back to this tab/window.
    refetchOnWindowFocus: false,
  });

  // Return the recipes and the query state so the page can render loading and error states.
  return { recipes, isLoading, isError, error, refetch };
};

// #endregion
// #region Use Effect API 

/**
 * Fetches recipe data for a given meal ID with useEffect and local state.
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
 * Fetches recipes for a given first letter with useEffect and local state.
 *
 * @param letter - The letter used to filter recipes.
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
/**
 * Converts a MealDB payload into the app's cleaned recipe shape.
 *
 * @param data - Raw MealDB recipe response data.
 * @returns An array of cleaned recipes.
 */
const recipeFormatter = (data: RecipesList): CleanRecipe[] => {
  if (!data.meals) return [];

  return data.meals.map((rawMeal) => ({
    idMeal: rawMeal.idMeal,
    strMeal: rawMeal.strMeal,
    strCategory: rawMeal.strCategory,
    strArea: rawMeal.strArea,
    strCountry: rawMeal.strCountry ?? "",
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

/**
 * Collects the non-empty ingredient and measure pairs from a raw recipe.
 *
 * @param recipe - A raw MealDB recipe.
 * @returns The parsed ingredient list.
 */
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