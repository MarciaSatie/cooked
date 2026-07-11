import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeTest } from './RecipeAPI-UseQuerySurpriseMe1';


const meta = {
  title: 'Testing/UseQuery/UseQuerySurpriseMe1',
  component: RecipeTest,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof RecipeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UseQuerySurpriseMe1',
};
