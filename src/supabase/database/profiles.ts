import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../supabaseEnv";

const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();

const supabase = createClient(supabaseUrl, supabasePublishableKey);

/**
 * Create a new profile entry when a user signs up
 * @param user - The authenticated user object from Supabase Auth
 */
export async function createProfile(user: User) {
  if (!user) {
    throw new Error("User object is required to create a profile");
  }

  console.log("📤 Creating profile for user:", { id: user.id, email: user.email });

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error("❌ Profile creation failed:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  console.log("✅ Profile created successfully:", data);
  return data;
}

/**
 * Get a user's profile
 * @param userId - The user ID
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("❌ Failed to fetch profile:", error.message);
    throw error;
  }

  return data;
}

/**
 * Update user profile information
 * @param userId - The user ID
 * @param updates - The profile data to update
 */
export async function updateProfile(
  userId: string,
  updates: { email?: string; [key: string]: unknown }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select();

  if (error) {
    console.error("❌ Profile update failed:", error.message);
    throw error;
  }

  console.log("✅ Profile updated successfully:", data);
  return data;
}

