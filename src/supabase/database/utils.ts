import { createClient } from "@supabase/supabase-js";
import type { CleanRecipe } from "../../types/interfaces";
import { getSupabaseConfig } from "../supabaseEnv";

const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();

const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Call this when you want to favorite a recipe
export async function AddRecipeToDataBase(recipe: CleanRecipe) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not authenticated.");
  
  const recipeId = String(recipe.idMeal);
  const { ...recipeDataToStore } = recipe;

  const { data, error } = await supabase
    .from("favoriteRecipes")
    .upsert(
      {
        user_id: user.id, // ✅ always present when authenticated
        recipe_id: recipeId,
        recipe: recipeDataToStore,
      },
      { onConflict: "user_id,recipe_id" }
    )
    .select();

  if (error) throw error;
  return data;
}


export async function RemoveRecipeToDataBase(recipe: CleanRecipe) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not authenticated.");
  
  const recipeId = String(recipe.idMeal);

  const { data, error } = await supabase
    .from("favoriteRecipes")
    .delete()
    .eq("user_id", user.id)
    .eq("recipe_id", recipeId)
    .select();

  if (error) throw error;
  return data;
}