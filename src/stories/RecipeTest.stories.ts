import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeTest';

const meta = {
  title: 'Testing/RecipeAPI',
  component: RecipeTest,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
