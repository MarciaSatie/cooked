import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeAPI-UseQueryRecipesByMainIngredient';

const meta = {
  title: 'Testing/UseQuery/UseQueryRecipesByMainIngredient',
  component: RecipeTest,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UseQueryRecipesByMainIngredient',
};