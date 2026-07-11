import { useQuerySurpriseMe10 } from '../hooks/useRecipes';
//import { useState } from "react";


export function RecipeTest() {

  const { recipes, isLoading, isError, error } = useQuerySurpriseMe10();
  const totalRecipes: number = recipes.length;
  return (
    <div style={{ padding: '20px' }}>
      <h1>Random 10 Recipe</h1>
      <br />
      <h2>API for useQuerySurpriseMe10 Method</h2>

      {isLoading && <p>Loading recipe...</p>}
      {isError && (
        <p style={{ color: 'crimson' }}>
          Failed to load recipe: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      <p> Total recipes = {totalRecipes}</p>

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