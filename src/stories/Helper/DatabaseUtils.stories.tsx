import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatabaseUtils } from './DatabaseUtils';
import type { CleanRecipe } from '../../types/interfaces';

const meta: Meta<typeof DatabaseUtils> = {
  title: 'Helper-Test/DatabaseUtils',
  component: DatabaseUtils,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatabaseUtils>;

// Mock API lives in the story so Storybook can open without a real Supabase login.
// DatabaseUtils.tsx stays reusable because the story passes the API in as a prop.
const mockAddRecipeToDataBase = async (recipe: CleanRecipe) => [
  {
    id: 'mock-row-1',
    user_id: 'mock-user-1',
    recipe_id: recipe.idMeal,
    recipe,
  },
];

export const Default: Story = {
  name: 'Helper',
  render: () => <DatabaseUtils addRecipeToDataBase={mockAddRecipeToDataBase} />,
};
