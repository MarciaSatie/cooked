import { useState, type ChangeEvent } from "react";
import { useQueryRecipesPerCategory } from '../hooks/useRecipes';

export function RecipeTest() {
  const [category, setCategory] = useState("Seafood");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const { recipes, isLoading, isError, error } = useQueryRecipesPerCategory(category);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipes By Category API Data</h1>
      <br />
      <h2>API for useQueryRecipesPerCategory Method</h2>

      <div>
        <input
          type="text"
          value={category}
          onChange={handleChange}
          placeholder={category}
        />
      </div>

      {isLoading && <p>Loading recipes...</p>}
      {isError && (
        <p style={{ color: 'crimson' }}>
          Failed to load recipes: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

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