import { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipes-api';

interface RecipeTestProps {
  mealId?: string;
}

export function RecipeTest({ mealId = '52772' }: RecipeTestProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getRecipes(mealId)
      .then(r => r.json())
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mealId]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Recipe API Test</h2>
      <p>Meal ID: <strong>{mealId}</strong></p>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {data && (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px' }}>
          <h3>API Response:</h3>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '500px'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
