import { useQueryRecipeByID } from '../hooks/useRecipes';
import { useState } from "react";


export function RecipeTest() {
  const [id,setID] = useState("52772");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*event: The JavaScript object containing information about the user's action (like a keystroke)..
      target: The specific HTML element that triggered the action (in this case, your <input /> element)..
      value: The actual text content currently living inside that input element.
     */
    setID(event.target.value); 
  };

  const { recipe, isLoading, isError, error } = useQueryRecipeByID(id);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Random Recipe</h1>
      <br />
      <h2>API for useQueryRecipeByID Method</h2>

      <div>
        {/* Text Input Fild to add ID */}
        <input 
          type="ID" 
          value={id} 
          onChange={handleChange} 
          placeholder= {id}
        />
      </div>

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
        {recipe ? JSON.stringify(recipe, null, 2) : 'No recipe found'}
      </pre>
    </div>
  );
}