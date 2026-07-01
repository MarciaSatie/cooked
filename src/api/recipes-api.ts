// src/api/recipes-api.ts

export const getRecipes = (id: string): Promise<Response> => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
};

export const getRecipeListByFirstLetter = (letter:string): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
};