import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeAPI-UseQueryRecipesByIngredient';

const meta = {
  title: 'Testing/UseQuery/UseQueryRecipesByIngredient',
  component: RecipeTest,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UseQueryRecipesByIngredient',
};