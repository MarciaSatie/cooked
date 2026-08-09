// The root object returned by the API call

// List of Type Recipe
export interface RecipesList {
  meals: Recipe[] | null;
}

// Type of Ingredient Array, that will be added to CleanRecipe
export interface IngredientItem {
    name: string;
    measure: string;
  }
  
// Type for Short Recipe object (this wil be used in the app)
export interface CleanRecipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strCountry: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    // New ingredient item objects array replaces fields 1-20!
    ingredientsList: IngredientItem[]; 
    isFavorite: boolean;
  }


// A single recipe object (RAW info from API) containing all its possible database properties
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  
  // Optional/Nullable meta fields from the database
  strMealAlternate?: string | null;
  strCountry?: string | null;
  strSource?: string | null;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;

  // Ingredients (TheMealDB lists exactly 1 to 20 sequentially)
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strIngredient16?: string | null;
  strIngredient17?: string | null;
  strIngredient18?: string | null;
  strIngredient19?: string | null;
  strIngredient20?: string | null;

  // Measurements matching the ingredients above
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strMeasure16?: string | null;
  strMeasure17?: string | null;
  strMeasure18?: string | null;
  strMeasure19?: string | null;
  strMeasure20?: string | null;
}

export interface ReviewList {
  reviewList: Review[];
}

export interface Review {
  id: string;
  recipeId: string;
  authorId: string;
  author: string;
  content: string;
  rating: number;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription:  string;
}

export type FilterOption = "title" | "country" | "ingredients";