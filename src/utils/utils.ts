import type { CleanRecipe } from '../types/interfaces';

/**
 * Formats recipe instructions into a cleaned array of individual instruction steps.
 *
 * @param recipe The recipe object whose instructions should be formatted.
 * @returns An array of trimmed instruction steps, or an empty array if no instructions are available.
 */
export function recipeInstructionsFormatter(recipe: CleanRecipe): string[] {
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