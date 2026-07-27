import type { CleanRecipe } from '../types/interfaces';

/**
 * reorganise the information from API in a array of objects of ingredients {name, measure}
 * @param recipe type CleanRecipe : recipe object
 * @returns Array of (Ingredients) Objcts {name, measure}
 */

export function recipeInstructionsFormatter(recipe:CleanRecipe):string[]{
    const instructions = recipe.strInstructions ?? '';

    if (!instructions.trim()) {
        return [];
    }

    const instructionSteps = instructions
    .split(/\n+/)//breaks the instructions into chunks wherever there is one or more newline characters.
    .flatMap((section) => section.split(/\.\s+/)) // breaks each chunk into smaller sentences using a period followed by spaces.
    .map((step) => step.trim().replace(/\.$/, '')) // removes extra spaces and strips a trailing period from each step.
    .filter(Boolean);//removes empty strings so only real steps remain.

    return instructionSteps
}