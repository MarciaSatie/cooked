import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useQueryCategoriesList,useQueryRecipesPerCategory } from '../hooks/useRecipes';
import DropDownMenu from '../components/dropdownMenu'
import Spinner from "../components/spinner";
import CardList from "../components/cardList"
import RecipeFilterUI from "../components/recipeFilterUI";
import { filterRecipes } from "../utils/recipeFilters";

export default function CategoriesPage() {
  
  const { categories } = useQueryCategoriesList();
  const [titleFilter, setTitleFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [ingredientsFilterList, setIngredientsFilterList] = useState<string[]>([]);

  
  const handleAddIngredient = () => {
    const nextIngredient = ingredientsFilter.trim();

    if (!nextIngredient) {
      return;
    }

    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.includes(nextIngredient)
        ? prevIngredients
        : [...prevIngredients, nextIngredient]
    );
    setIngredientsFilter("");
  };

  const handleDeleteIngredient = (ingredientToRemove: string) => {
    setIngredientsFilterList((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredientToRemove)
    );
  };

  const handleClearIngredients = () => {
    setIngredientsFilterList([]);
    setIngredientsFilter("");
  };


  // Extract just the category names
  const categoryNames: string[] = categories.map(item => item.strCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');

  // Callback function that receives the string from the child
  const handleMenuSelection = (value: string) => {
    setSelectedCategory(value);
    console.log("Parent received value:", value);
  };

  const { recipes, isLoading, isError, error } = useQueryRecipesPerCategory(selectedCategory);
  if (isLoading) {
    return <Spinner />;
  }

  const filteredRecipes = filterRecipes(recipes, {
    titleFilter,
    countryFilter,
    ingredientsFilterList,
  });

  const totalRecipes = recipes.length;


  return (
    <Box sx={{ p: 4 }}>

      <RecipeFilterUI
        titleFilter={titleFilter}
        countryFilter={countryFilter}
        ingredientsFilter={ingredientsFilter}
        ingredientsFilterList={ingredientsFilterList}
        onAddIngredient={handleAddIngredient}
        onDeleteIngredient={handleDeleteIngredient}
        onClearIngredients={handleClearIngredients}
        onTitleChange={setTitleFilter}
        onCountryChange={setCountryFilter}
        onIngredientChange={setIngredientsFilter}
        showIngredients={false}
      />

      <Typography variant="h4" gutterBottom>
        Recipes per Categories
      </Typography>
      <Divider sx={{ my: 3 }} />

      <p>Current category is : {selectedCategory}</p>
      <DropDownMenu
        name={selectedCategory}
        listOption= {categoryNames}
        onSelect={handleMenuSelection} 
      />

      {isLoading && <p>Loading recipes...</p>}
      {isError && (
          <p style={{ color: 'crimson' }}>
            Failed to load recipes: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        )}


      <Divider sx={{ my: 3 }} />
      <p>Total Recipes: {totalRecipes}</p>
      {isError && <Typography color="error">{error instanceof Error ? error.message : 'Failed to load recipes.'}</Typography>}
      {/* Card List Component*/}
      <CardList recipes={filteredRecipes} />

    </Box>


  );
}