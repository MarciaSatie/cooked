import { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipes-api';

export function RecipeTest() {
  const [data, setData] = useState<string>('Loading...');

  useEffect(() => {
    getRecipes('52772')
      .then(r => r.json())
      .then(data => setData(JSON.stringify(data, null, 2)))
      .catch(err => setData(`Error: ${err.message}`));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe API Data</h2>
      <pre style={{ 
        background: '#f5f5f5',
        padding: '15px',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '600px',
        fontSize: '12px'
      }}>
        {data}
      </pre>
    </div>
  );
}
