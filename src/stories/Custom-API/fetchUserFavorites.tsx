import { useState } from "react";
import { Box, Button } from "@mui/material";
import { fetchUserFavorites } from "../../../api/custom-api";

type FetchUserFavoritesFn = typeof fetchUserFavorites;

type FavoriteRecipe = {
  idMeal: string;
  strMeal: string;
  user_id: string;
};

type FetchUserFavoritesTesterProps = {
  fetchFavorites?: FetchUserFavoritesFn;
};

export function FetchUserFavoritesTester({
  fetchFavorites = fetchUserFavorites,
}: FetchUserFavoritesTesterProps) {
  const [message, setMessage] = useState("Click the button to test the helper.");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecipe[] | null>(null);

  const handleFetchFavorites = async () => {
    try {
      setLoading(true);
      setMessage("Loading favorites for the logged-in user...");
      setFavorites(null);

      const data = await fetchFavorites();

      setFavorites(data as FavoriteRecipe[]);
      setMessage("Favorites loaded successfully.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 720,
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        fontFamily: "sans-serif",
      }}
    >
      <Button variant="contained" onClick={handleFetchFavorites} disabled={loading}>
        {loading ? "Loading..." : "Fetch favorites"}
      </Button>

      <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
        {message}
      </Box>

      {favorites && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
          <strong>Returned rows:</strong>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(favorites, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
}