import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChefBot } from './ChefBot';


const meta = {
  title: 'Testing/Helper/ChefBot',

  component: ChefBot,
  parameters: {
    layout: 'Top',
  },
} satisfies Meta<typeof ChefBot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ChefBot',
};
