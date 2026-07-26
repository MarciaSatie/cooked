import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeAPI-UseQueryRecipesPerCategory';

const meta = {
  title: 'Testing/UseQuery/UseQueryRecipesPerCategory',
  component: RecipeTest,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UseQueryRecipesPerCategory',
};