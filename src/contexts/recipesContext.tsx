import React, { useState, useCallback } from "react";
import type { CleanRecipe, Review } from "../types/interfaces";
import { useQueryGetFavoriteRecipesList } from "../hooks/useRecipes";


interface recipeContextInterface {
  favourites: string[];
  favoriteRecipes: CleanRecipe[];
  addToFavourites: (recipe: CleanRecipe) => void;
  removeFromFavourites: (recipe: CleanRecipe) => void;
  addReview: (recipe: CleanRecipe, review: Review) => void;
  addToMustWatch: (recipe: CleanRecipe) => void;
  mustWatch: string[];
}

const initialContextState: recipeContextInterface = {
  favourites: [],
  favoriteRecipes: [],
  mustWatch: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  addReview: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const RecipesContext = React.createContext<recipeContextInterface>(
  initialContextState
);

const RecipesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { recipes } = useQueryGetFavoriteRecipesList();
  const [favoriteRecipesOverride, setFavoriteRecipesOverride] = useState<CleanRecipe[] | null>(null);
  const [mustWatch, setMustWatch] = useState<string[]>([]);
  const [, setMyReviews] = useState<Review[]>([]);

  const favoriteRecipes = favoriteRecipesOverride ?? recipes;

  const favourites = favoriteRecipes.map((recipe) => recipe.idMeal);

  const addToFavourites = useCallback((recipe: CleanRecipe) => {
    setFavoriteRecipesOverride((prevFavoriteRecipes) => {
      const currentFavoriteRecipes = prevFavoriteRecipes ?? recipes;

      if (!currentFavoriteRecipes.some((savedRecipe) => savedRecipe.idMeal === recipe.idMeal)) {
        return [...currentFavoriteRecipes, recipe];
      }

      return currentFavoriteRecipes;
    });
  }, [recipes]);

  const removeFromFavourites = useCallback((recipe: CleanRecipe) => {
    setFavoriteRecipesOverride((prevFavoriteRecipes) => {
      const currentFavoriteRecipes = prevFavoriteRecipes ?? recipes;

      return currentFavoriteRecipes.filter((savedRecipe) => savedRecipe.idMeal !== recipe.idMeal);
    });
  }, [recipes]);

  const addToMustWatch = useCallback((recipe: CleanRecipe) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(recipe.idMeal)) {
        return [...prevMustWatch, recipe.idMeal];
      }
      return prevMustWatch;
    });
  }, []);


  const addReview = useCallback((recipe: CleanRecipe, review: Review) => {
    setMyReviews((prevReviews) => [
      ...prevReviews,
      { ...review, recipeId: recipe.idMeal },
    ]);
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        favourites,
        favoriteRecipes,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        addReview,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
export default RecipesContextProvider;