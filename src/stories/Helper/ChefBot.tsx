import * as React from 'react';
import { useState, useEffect } from 'react';
import { generateRecipe } from '../../../api/chat';

// 1. Define an interface for the component state matching your schema
interface RecipeState {
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string[];
  };
}

export function ChefBot() {
  // 2. Initialize state to hold the recipe data (initially null)
  const [recipeData, setRecipeData] = useState<RecipeState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Use useEffect to run the async function safely on mount
  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        // Await the asynchronous backend call
        const data = await generateRecipe("Generate a simple recipe using "); 
        setRecipeData(data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
        setError("Could not load recipe from the AI server.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, []); // Empty array ensures this only runs once when page loads

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ai Response Test</h1>
      <br />
      <h2>API for AI Method</h2>

      {/* 4. Handle Loading and Error states conditionally */}
      {loading && <p>Thinking up a delicious pasta recipe...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
      {/* 5. Render the JSON cleanly once data arrives */}
      {!loading && !error && recipeData && (
        <pre
          style={{
            background: '#f5f5f5',
            padding: '15px',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '600px',
            fontSize: '12px',
          }}
        >
          {JSON.stringify(recipeData, null, 2)}
        </pre>
      )}
    </div>
  );
}
