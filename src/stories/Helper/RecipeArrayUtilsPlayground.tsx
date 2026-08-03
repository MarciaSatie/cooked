import * as React from 'react';
import type { CleanRecipe } from '../../types/interfaces';
import {
  filterRecipesByCategory,
  getFavoriteRecipes,
  sortRecipesByName,
  toggleRecipeFavorite,
} from '../../utils/recipeArrayUtils';

const sampleRecipes: CleanRecipe[] = [
  {
    idMeal: '1',
    strMeal: 'Spaghetti Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strCountry: 'Italy',
    strInstructions: 'Cook pasta and mix with sauce.',
    strMealThumb: '',
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: 'Pasta', measure: '200g' }],
    isFavorite: false,
  },
  {
    idMeal: '2',
    strMeal: 'Chicken Curry',
    strCategory: 'Chicken',
    strArea: 'Indian',
    strCountry: 'India',
    strInstructions: 'Simmer chicken with curry spices.',
    strMealThumb: '',
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: 'Chicken', measure: '300g' }],
    isFavorite: true,
  },
  {
    idMeal: '3',
    strMeal: 'Taco Bowl',
    strCategory: 'Mexican',
    strArea: 'Mexican',
    strCountry: 'Mexico',
    strInstructions: 'Assemble taco ingredients in a bowl.',
    strMealThumb: '',
    strTags: null,
    strYoutube: null,
    ingredientsList: [{ name: 'Beans', measure: '1 cup' }],
    isFavorite: false,
  },
];

export function RecipeArrayUtilsPlayground() {
  const [recipes, setRecipes] = React.useState<CleanRecipe[]>(sampleRecipes);
  const [categoryFilter, setCategoryFilter] = React.useState('');

  const handleToggleFavorite = (idMeal: string) => {
    setRecipes((current) => toggleRecipeFavorite(current, idMeal));
  };

  const filteredByCategory = filterRecipesByCategory(recipes, categoryFilter);
  const favoriteRecipes = getFavoriteRecipes(recipes);
  const sortedRecipes = sortRecipesByName(recipes);

  return (
    <div style={{ width: '720px', fontFamily: 'sans-serif' }}>
      <h2>Recipe array utilities playground</h2>
      <p>Use this Storybook view to try array helpers with recipe data.</p>

      <label style={{ display: 'block', marginBottom: '8px' }}>
        Category filter
        <input
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          placeholder="e.g. Pasta"
          style={{ display: 'block', width: '100%', marginTop: '6px', padding: '8px' }}
        />
      </label>

      <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
        <section>
          <h3>Original recipes</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto' }}>
            {JSON.stringify(recipes, null, 2)}
          </pre>
        </section>

        <section>
          <h3>Filtered by category</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto' }}>
            {JSON.stringify(filteredByCategory, null, 2)}
          </pre>
        </section>

        <section>
          <h3>Favorites</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto' }}>
            {JSON.stringify(favoriteRecipes, null, 2)}
          </pre>
        </section>

        <section>
          <h3>Sorted by name</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto' }}>
            {JSON.stringify(sortedRecipes, null, 2)}
          </pre>
        </section>
      </div>

      <div style={{ marginTop: '16px' }}>
        <button onClick={() => handleToggleFavorite('1')}>Toggle favorite for Spaghetti Carbonara</button>
      </div>
    </div>
  );
}
