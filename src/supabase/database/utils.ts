import { supabase } from '../supabaseClient'
//import { useAuth } from "../../supabase/auth";
import type {CleanRecipe} from '../../types/interfaces'

export async function AddRecipeToDataBase(recipe: CleanRecipe):Promise<void> {
  // 1) Get the current auth user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) {
    console.error("Auth user error:", userErr.message);
    return;
  }
  if (!user) {
    console.error("No logged-in user");
    return;
  }

  // 2) Insert into favoriteRecipes linked to this user
  const { data, error } = await supabase
    .from("favoriteRecipes")
    .upsert(
      {
        user_id: user.id,
        recipe_id: recipe.idMeal,
        recipe,
      },
      { onConflict: "user_id,recipe_id" }
    )
    .select();

  if (error) {
    console.error("Insert error:", error.message);
    return;
  }

  console.log("Inserted:", data);
}