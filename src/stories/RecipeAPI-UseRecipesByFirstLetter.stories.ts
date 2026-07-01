import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeAPI-UseRecipesByFirstLetter';


const meta = {
  title: 'Testing/RecipeAPI-UseRecipesByFirstLetter',
  component: RecipeTest,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UseRecipesByFirstLetter',
};
