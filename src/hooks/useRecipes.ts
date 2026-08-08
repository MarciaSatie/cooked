import { useEffect, useState } from "react";
import { 
  getRecipes, 
  getRecipeListByFirstLetter,
  get1RandomRecipe,
  getCategoriesList,
  getRecipesPerCategory,
  filterByMainIngredient,
  filterByIngredient,
  filterByArea
} from "../api/recipes-api";
import type { RecipesList, Recipe, CleanRecipe, Category } from "../types/interfaces";
import { useQuery } from '@tanstack/react-query';
import { fetchUserFavorites} from "../../api/custom-api";

//#region Custom Queries
export const useQueryGetFavoriteRecipesList = () => {
  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["favorite-recipes"],
    queryFn: fetchUserFavorites,
    /* select => takes the data after it coming from the database and changes it into the format page needs.
    first, fetch the raw rows from Supabase
    then, pick the recipe part from each row
    then, give the page a clean list of recipes
     */
    select: (rows) => {
      const recipes: CleanRecipe[] = [];

      if (Array.isArray(rows)) {
        for (const row of rows) {
          if (row?.recipe) {
            recipes.push(row.recipe as CleanRecipe);
          }
        }
      }

      return recipes;
    },
  });

  return { recipes, isLoading, isError, error };
};
//#endrefion


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
    queryKey: ['surprise-me1', 1],
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

export const useQueryCategoriesList = () => {
  const { data: categories = [], isLoading, isError, error } = useQuery<Category[]>({
    queryKey: ['category', 1],
    queryFn: async () => {
      const response = await getCategoriesList();
      const data: { categories: Category[] } = await response.json();

      if (!data.categories) {
        return [];
      }

      return data.categories;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { categories, isLoading, isError, error };
};

/**
 * Fetches recipes for a given category using React Query.
 *
 * @param category - The MealDB category used to filter recipes.
 * @returns The loaded recipes plus loading and error state.
 */
export const useQueryRecipesPerCategory = (category: string) => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // Include the category in the key so React Query caches each category as a separate result.
    /*So if the category changes from Pasta to Chicken, it does not reuse the old data. 
     * It stores and fetches them separately, which prevents showing the wrong recipes for the wrong category.
     */
    queryKey: ['recipes', 'category', category],
    queryFn: async () => {
      const response = await getRecipesPerCategory(category);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }

      return recipeFormatter(data);
    },
    enabled: !!category,
  });

  return { recipes, isLoading, isError, error };
};

/**
 * Fetches recipes for a given main ingredient using React Query.
 *
 * @param ingredient - The MealDB ingredient used to filter recipes.
 * @returns The loaded recipes plus loading and error state.
 */
export const useQueryRecipesByMainIngredient = (ingredient: string) => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // Include the category in the key so React Query caches each ingredient as a separate result.
    /*So if the category changes from Pasta to Chicken, it does not reuse the old data. 
     * It stores and fetches them separately, which prevents showing the wrong recipes for the wrong category.
     */
    queryKey: ['recipes', 'main-ingredient', ingredient],
    queryFn: async () => {
      const response = await filterByMainIngredient(ingredient);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }

      return recipeFormatter(data);
    },
    enabled: !!ingredient,
  });

  return { recipes, isLoading, isError, error };
};

/**
 * Fetches recipes for a given ingredient using React Query.
 *
 * @param ingredient - The MealDB ingredient used to filter recipes.
 * @returns The loaded recipes plus loading and error state.
 */
export const useQueryRecipesByIngredient = (ingredient: string) => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // Include the category in the key so React Query caches each ingredient as a separate result.
    /*So if the category changes from Pasta to Chicken, it does not reuse the old data. 
     * It stores and fetches them separately, which prevents showing the wrong recipes for the wrong category.
     */
    queryKey: ['recipes', 'ingredient', ingredient],
    queryFn: async () => {
      const response = await filterByIngredient(ingredient);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }

      return recipeFormatter(data);
    },
    enabled: !!ingredient,
  });

  return { recipes, isLoading, isError, error };
};

/**
 * Fetches recipes for a given area using React Query.
 *
 * @param area - The MealDB area used to filter recipes.
 * @returns The loaded recipes plus loading and error state.
 */
export const useQueryRecipesByArea = (area: string) => {
  const { data: recipes = [], isLoading, isError, error } = useQuery<CleanRecipe[]>({
    // Include the category in the key so React Query caches each area as a separate result.
    /*So if the category changes from Pasta to Chicken, it does not reuse the old data. 
     * It stores and fetches them separately, which prevents showing the wrong recipes for the wrong category.
     */
    queryKey: ['recipes', 'area', area],
    queryFn: async () => {
      const response = await filterByArea(area);
      const data: RecipesList = await response.json();

      if (!data.meals) {
        return [];
      }

      return recipeFormatter(data);
    },
    enabled: !!area,
  });

  return { recipes, isLoading, isError, error };
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