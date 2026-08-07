import { createClient } from "@supabase/supabase-js";
import type { CleanRecipe } from "../../types/interfaces";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Call this when you want to favorite a recipe
export async function AddRecipeToDataBase(userId: string, recipe: CleanRecipe) {
  const recipeId = String(recipe.idMeal);

  // Destructure to remove frontend-only state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isFavorite, ...recipeDataToStore } = recipe;

  console.log("📤 Sending to Supabase:", { userId, recipeId, recipe: recipeDataToStore });

  const { data, error } = await supabase
  .from("favoriteRecipes")
  .upsert({
    user_id: userId,
    recipe_id: recipeId,
    recipe: recipeDataToStore,
  }, { onConflict: 'user_id, recipe_id' }) // Matches your composite primary key
  .select();

  console.log("📥 Supabase Response - Data:", data);
  console.log("📥 Supabase Response - Error:", error);

  if (error) {
    console.error("❌ Supabase Error Details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }
  
  return data;
}
