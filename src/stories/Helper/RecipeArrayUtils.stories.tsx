import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeArrayUtilsPlayground } from './RecipeArrayUtilsPlayground';


const meta: Meta<typeof RecipeArrayUtilsPlayground> = {
  title: 'Helper-Test/Array Utils Playground',
  component: RecipeArrayUtilsPlayground,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RecipeArrayUtilsPlayground>;

export const Default: Story = {name: `Helper`};
