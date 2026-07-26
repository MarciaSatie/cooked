import * as React from 'react';
import { useQueryCategoriesList } from '../hooks/useRecipes';
import DropDownMenu from '../components/dropdownMenu'

export function Categories() {
  const { categories } = useQueryCategoriesList();

  // Extract just the category names
  const categoryNames: string[] = categories.map(item => item.strCategory);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  // Callback function that receives the string from the child
  const handleMenuSelection = (value: string) => {
    setSelectedCategory(value);
    console.log("Parent received value:", value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe List By First Letter API Data</h1>
      <br />
      <h2>API for Category Method</h2>
     
      <DropDownMenu
        name={`Category List`}
        listOption= {categoryNames}
        onSelect={handleMenuSelection} 
      />
       <p>Selected category is : {selectedCategory}</p>

      
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
        {JSON.stringify(categories, null, 2)}
      </pre>
    </div>
  );
}