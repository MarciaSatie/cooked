import type { CleanRecipe } from "../types/interfaces";

/**
 * Describes the available search filters that can be applied to a list of recipes.
 */
type RecipeFilters = {
  titleFilter: string;
  countryFilter: string;
  ingredientsFilterList: string[];
};

/**
 * Filters a collection of recipes based on the provided title, country, and ingredient criteria.
 * Matching is case-insensitive and recipes must satisfy all active filters to be returned.
 *
 * @param recipes The recipes to evaluate.
 * @param filters The filtering options to apply.
 * @returns A new array containing only the recipes that match the supplied filters.
 */
export function filterRecipes(recipes: CleanRecipe[], filters: RecipeFilters): CleanRecipe[] {
  // Normalize the title filter so matching is case-insensitive.
  const titleQuery = filters.titleFilter.trim().toLowerCase();

  // Normalize the country filter so matching is case-insensitive.
  const countryQuery = filters.countryFilter.trim().toLowerCase();

  // Go through every recipe and keep only the ones that match all active filters.
  return recipes.filter((recipe) => {
    // Match the recipe name against the title search text.
    const matchesTitle = !titleQuery || recipe.strMeal.toLowerCase().includes(titleQuery);

    // Match the recipe country against the country search text.
    const matchesCountry = !countryQuery || recipe.strCountry.toLowerCase().includes(countryQuery);

    // If no ingredients were selected, keep the recipe.
    // Otherwise, check whether at least one selected ingredient exists in the recipe.
    const matchesIngredients =
      filters.ingredientsFilterList.length === 0 ||
      filters.ingredientsFilterList.some((selectedIngredient) =>
        // Search through the recipe ingredient list for a matching ingredient name.
        recipe.ingredientsList.some((ingredient) =>
          ingredient.name.toLowerCase().includes(selectedIngredient.toLowerCase())
        )
      );

    // Keep the recipe only if it matches title, country, and ingredients.
    return matchesTitle && matchesCountry && matchesIngredients;
  });
}