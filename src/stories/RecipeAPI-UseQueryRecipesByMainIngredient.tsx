import { useState, type ChangeEvent } from "react";
import { useQueryRecipesByMainIngredient } from '../hooks/useRecipes';

export function RecipeTest() {
  const [ingredient, setIngredient] = useState("Chicken");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };

  const { recipes, isLoading, isError, error } = useQueryRecipesByMainIngredient(ingredient);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipes By Main Ingredient API Data</h1>
      <br />
      <h2>API for useQueryRecipesByMainIngredient Method</h2>

      <div>
        <input
          type="text"
          value={ingredient}
          onChange={handleChange}
          placeholder={ingredient}
        />
      </div>

      {isLoading && <p>Loading recipes...</p>}
      {isError && (
        <p style={{ color: 'crimson' }}>
          Failed to load recipes: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {/* pre: It is a built-in element used to display text exactly as it is written in your code, preserving both spaces and line breaks. */}
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
        {JSON.stringify(recipes, null, 2)}
      </pre>
    </div>
  );
}