import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../src/supabase/supabaseEnv";
import type { Review } from "../src/types/interfaces";

const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();
const supabase = createClient(supabaseUrl, supabasePublishableKey);

/**
 * Fetch the favorites for the currently logged-in Supabase user.
 *
 * The helper first asks Supabase Auth for the current session user, then
 * passes that user's id into the `get_user_favorites` database function.
 */
export async function fetchUserFavorites() {
  // Read the current authenticated user from Supabase Auth.
  const { data: { user }, error: userErr } = await supabase.auth.getUser();

  if (userErr || !user) {
    // Stop early if the request is not authenticated.
    throw new Error("Not authenticated.");
  }
  // Call the SQL function that returns only this user's saved favorites.
  const { data, error } = await supabase.rpc("get_user_favorites", {
    logged_user_id: user.id,
  });

  // Surface any database error to the caller.
  if (error) throw error;

  // Return the favorite recipe rows from the database function.
  return data;
}


export async function addReview(
  recipeID: string,
  author: string,
  content: string,
  rating: number
) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();

  if (userErr || !user) {
    throw new Error("Not authenticated.");
  }

  const { data, error } = await supabase.rpc("addReview", {
    p_recipe_id: recipeID,
    p_author_id: user.id,
    p_author: author,
    p_content: content,
    p_rating: rating,
  });

  if (error) throw error;

  return data; // true for success
}

export async function getReviewsByRecipeId(recipeId: string): Promise<Review[]> {
  const { data, error } = await supabase.rpc("getreviewsbyrecipe", {
    p_recipe_id: recipeId,
  });

  if (error) throw error;

  return data ?? [];
}

// function to handle the GitHub sign-in trigger
export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'https://cooked-kgtd.vercel.app/', // Your live Vercel URL
    },
  })
  if (error) throw error;

  return data;
}
