// src/api/recipes-api.ts

export const getRecipes = (id: string): Promise<Response> => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
};

export const getRecipeListByFirstLetter = (letter:string): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
};

export const get1RandomRecipe = (): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
};

export const getCategoriesList = (): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
};

export const getRecipesPerCategory = (category:string): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
};

export const filterByMainIngredient = (ingredient:string): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
};

export const filterByIngredient = (ingredient:string): Promise<Response> =>{
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
};

export const filterByArea = (area:string): Promise<Response> =>{
    return fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${area}`);
};