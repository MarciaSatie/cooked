import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeTest';

const meta = {
  title: 'Testing/RecipeAPI',
  component: RecipeTest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mealId: {
      control: 'text',
      description: 'The meal ID to fetch from the API',
    },
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultMeal: Story = {
  args: {
    mealId: '52772',
  },
};

export const DifferentMeal: Story = {
  args: {
    mealId: '52795',
  },
};
