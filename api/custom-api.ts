import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../src/supabase/supabaseEnv";

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