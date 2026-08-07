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
