import React, { useState, useCallback } from "react";
import type { CleanRecipe, Review } from "../types/interfaces";

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
  const [favoriteRecipes, setFavoriteRecipes] = useState<CleanRecipe[]>([]);
  const [mustWatch, setMustWatch] = useState<string[]>([]);
  const [, setMyReviews] = useState<Review[]>([]);
  const favourites = favoriteRecipes.map((recipe) => recipe.idMeal);

  const addToFavourites = useCallback((recipe: CleanRecipe) => {
    setFavoriteRecipes((prevFavoriteRecipes) => {
      if (!prevFavoriteRecipes.some((savedRecipe) => savedRecipe.idMeal === recipe.idMeal)) {
        return [...prevFavoriteRecipes, recipe];
      }
      return prevFavoriteRecipes;
    });
  }, []);

  const removeFromFavourites = useCallback((recipe: CleanRecipe) => {
    setFavoriteRecipes((prevFavoriteRecipes) =>
      prevFavoriteRecipes.filter((savedRecipe) => savedRecipe.idMeal !== recipe.idMeal)
    );
  }, []);

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