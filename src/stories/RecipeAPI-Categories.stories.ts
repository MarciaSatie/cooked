import type { Meta, StoryObj } from '@storybook/react-vite';
import { Categories } from './RecipeAPI-Categories';


const meta = {
  title: 'Testing/UseQuery/Categories',
  component: Categories,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof Categories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Categories',
};
