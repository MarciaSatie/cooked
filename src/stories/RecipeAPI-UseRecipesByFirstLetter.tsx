import { useRecipesByFirstLetter } from '../hooks/useRecipes';
import { useState } from "react";
import LettersBTN from '../components/lettersBTN';

export function RecipeTest() {
  const [chosenLetter, setchosenLetter] = useState("A");
  const handleChildSelection = (letter: string) => {
    setchosenLetter(letter);
  };
  const { recipes } = useRecipesByFirstLetter(chosenLetter);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe List By First Letter API Data</h1>
      <br />
      <h2>API for useRecipesByFirstLetter Method</h2>
      
      {/* selectedLetter: Alphabetic char input.
          onLetterSelect: Callback function to send new letter input value up tot eh parent component.*/}
      <LettersBTN
        selectedLetter={chosenLetter}
        onLetterSelect={handleChildSelection}
      />

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