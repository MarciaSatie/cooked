// api/recipes/index.ts
import { createClient } from "@supabase/supabase-js";
import type { IncomingMessage } from 'http';
import type { ServerResponse } from 'http';
import { getSupabaseConfig } from "../src/supabase/supabaseEnv";

const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();
const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Pull the Supabase access token from the incoming request.
// The API can only know the current user if the client sends its session token.
function getAccessToken(req: IncomingMessage) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7).trim();
}


export default async function handler(req: IncomingMessage & { method?: string; body?: any }, res: ServerResponse & { json?: (data: any) => void; statusCode?: number }) {
  // Only allow GET requests for this custom endpoint
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.json?.({ error: 'Method Not Allowed' });
  }

  try {
    // Read the caller's access token before touching the database.
    const accessToken = getAccessToken(req);

    if (!accessToken) {
      res.statusCode = 401;
      return res.json?.({ error: 'Missing authorization token' });
    }

    // Ask Supabase Auth which user owns this token.
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

    if (userError || !userData.user) {
      res.statusCode = 401;
      return res.json?.({ error: 'Unauthorized' });
    }

    // This is the logged-in user's id; use it to scope the query.
    const loggedUserId = userData.user.id;

    // Only return favorite recipes that belong to the authenticated user.
    const { data, error } = await supabase
      .from('favoriteRecipes')
      .select('*')
      .eq('user_id', loggedUserId);

    if (error) {
      res.statusCode = 400;
      return res.json?.({ error: error.message });
    }

    // Cache briefly so repeated requests can reuse the result for a moment.
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    
    // Return the persistent backend data cleanly
    res.statusCode = 200;
    return res.json?.(data);
  } catch (err: any) {
    res.statusCode = 500;
    return res.json?.({ error: 'Internal Server Error', details: err.message });
  }
}
