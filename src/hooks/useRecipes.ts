import { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipes-api';
import type {Recipe} from '../types/interfaces';

export const useRecipes = (id:string) =>{
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        // 1. Create an inner async function so we can use "await"
        async function loadData() {
          try {
            // Make the API call (returns the raw HTTP response)
            const response = await getRecipes(id);
      
            // Extract the actual JSON data payload from the response
            const data = await response.json();
            console.log(data);
            // 4. Update state with the meals array (or empty array if missing)
            if (data && data.meals) {
              setRecipes(data.meals);
            } else {
              setRecipes([]);
            }
          } catch (err) {
            // 5. Catch network failures or parsing errors
            console.log('Failed to fetch recipes.');
            console.error(err);
          } 
        }
      
        // Execute the function immediately
        loadData();
      }, [id]); //  Added `id` to the dependency array so the hook refetches if the ID changes
      // The empty array [] means this runs exactly ONCE when the page loads
    
    return {recipes}}