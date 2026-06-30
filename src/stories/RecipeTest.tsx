import { useRecipes } from '../hooks/useRecipes';

export function RecipeTest() {
  const { recipes } = useRecipes('52772');

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
        {JSON.stringify(recipes, null, 2)}
      </pre>
    </div>
  );
}

