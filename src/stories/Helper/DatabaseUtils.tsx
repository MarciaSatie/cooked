import * as React from "react";
import { useState } from "react";
import { Box, Button} from '@mui/material';
import type { CleanRecipe } from "../../types/interfaces";
import {AddRecipeToDataBase} from "../../supabase/database/utils"
import { useAuth } from "../../supabase/auth";

const sampleRecipes: CleanRecipe[] = [
  {
    idMeal: "1",
    strMeal: "Spaghetti Carbonara",
    strCategory: "Pasta",
    strArea: "Italian",
    strCountry: "Italy",
    strInstructions: "Cook pasta and mix with sauce.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Pasta", measure: "200g" },{ name: "Tomato", measure: "4" }],
    isFavorite: false,
  },
  {
    idMeal: "2",
    strMeal: "Chicken Curry",
    strCategory: "Chicken",
    strArea: "Indian",
    strCountry: "India",
    strInstructions: "Simmer chicken with curry spices.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Chicken", measure: "300g" }],
    isFavorite: true,
  },
  {
    idMeal: "3",
    strMeal: "Taco Bowl",
    strCategory: "Mexican",
    strArea: "Mexican",
    strCountry: "Mexico",
    strInstructions: "Assemble taco ingredients in a bowl.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Beans", measure: "1 cup" }],
    isFavorite: false,
  },
  {
    idMeal: "4",
    strMeal: "Spaghetti Carbonara and Tuna",
    strCategory: "Pasta",
    strArea: "Italian",
    strCountry: "Italy",
    strInstructions: "Cook pasta and mix with sauce.",
    strMealThumb: "",
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: "Pasta", measure: "200g" },{ name: "Tomato", measure: "4" },{ name: "Tuna", measure: "1 can" }],
    isFavorite: false,
  },
];

const userID = "e0435dea-466d-41a7-9640-c335de2d95b0"

export function DatabaseUtils() {
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(false);
  const[responseData, setResponseData] = useState<any>(null);

  const handleAddIngredient = async () => {
    setLoading(true);
    setMessage("");
    setResponseData(null);

    try {
      setMessage("⏳ Adding recipe to database...");
      const data = await AddRecipeToDataBase(userID, sampleRecipes[0]);
      
      setMessage("✅ Recipe added successfully!");
      setResponseData(data);
      console.log("Supabase Response:", data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`❌ Error: ${errorMessage}`);
      setResponseData(error);
      console.error("Supabase Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "720px", fontFamily: "sans-serif" }}>
      <Box sx={{ display: "flex" }}>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          sx={{ mt: 2 }} 
          onClick={handleAddIngredient}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </Box>

      {message && (
        <p style={{ 
          marginTop: "16px", 
          padding: "10px",
          backgroundColor: message.includes("✅") ? "#e8f5e9" : message.includes("❌") ? "#ffebee" : "#fff3e0",
          borderRadius: "4px",
          fontWeight: "bold"
        }}>
          {message}
        </p>
      )}

      {responseData && (
        <div style={{ 
          marginTop: "16px", 
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "12px",
          maxHeight: "200px",
          overflow: "auto"
        }}>
          <strong>Response Data:</strong>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}