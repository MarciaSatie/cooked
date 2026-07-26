import { useState, type ChangeEvent } from "react";
import { useQueryRecipesByArea } from '../hooks/useRecipes';

export function RecipeTest() {
  const [area, setArea] = useState("Canadian");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArea(event.target.value);
  };

  const { recipes, isLoading, isError, error } = useQueryRecipesByArea(area);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipes By Area API Data</h1>
      <br />
      <h2>API for useQueryRecipesByArea Method</h2>

      <div>
        <input
          type="text"
          value={area}
          onChange={handleChange}
          placeholder={area}
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