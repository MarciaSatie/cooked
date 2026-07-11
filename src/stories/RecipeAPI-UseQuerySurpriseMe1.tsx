import { useQuerySurpriseMe1 } from '../hooks/useRecipes';
//import { useState } from "react";


export function RecipeTest() {

  const { recipes, isLoading, isError, error } = useQuerySurpriseMe1();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Random Recipe</h1>
      <br />
      <h2>API for UseQuerySurpriseMe1 Method</h2>

      {isLoading && <p>Loading recipe...</p>}
      {isError && (
        <p style={{ color: 'crimson' }}>
          Failed to load recipe: {error instanceof Error ? error.message : 'Unknown error'}
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