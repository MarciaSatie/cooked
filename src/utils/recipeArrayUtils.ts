import type { CleanRecipe } from '../types/interfaces';

/**
 * Toggles the favorite state of the recipe with the specified meal ID.
 *
 * @param recipes The recipe list to update.
 * @param idMeal The meal ID of the recipe to toggle.
 * @returns A new array with the matching recipe favorite status flipped.
 */
export function toggleRecipeFavorite(recipes: CleanRecipe[], idMeal: string): CleanRecipe[] {
  return recipes.map((recipe) =>
    recipe.idMeal === idMeal ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
  );
}

/**
 * Returns a new array of recipes sorted alphabetically by meal name.
 *
 * @param recipes The recipes to sort.
 * @returns A new sorted array of recipes.
 */
export function sortRecipesByName(recipes: CleanRecipe[]): CleanRecipe[] {
  return [...recipes].sort((left, right) => left.strMeal.localeCompare(right.strMeal));
}

/**
 * Returns only the recipes marked as favorites.
 *
 * @param recipes The recipes to filter.
 * @returns A new array containing only favorite recipes.
 */
export function getFavoriteRecipes(recipes: CleanRecipe[]): CleanRecipe[] {
  return recipes.filter((recipe) => recipe.isFavorite);
}

/**
 * Filters recipes by category using a case-insensitive partial match.
 * If the category filter is empty, all recipes are returned.
 *
 * @param recipes The recipes to filter.
 * @param category The category text to match against each recipe.
 * @returns A new array containing only recipes whose category matches the supplied value.
 */
export function filterRecipesByCategory(recipes: CleanRecipe[], category: string): CleanRecipe[] {
  const normalizedCategory = category.trim().toLowerCase();

  if (!normalizedCategory) {
    return recipes;
  }

  return recipes.filter((recipe) => recipe.strCategory.toLowerCase().includes(normalizedCategory));
}
