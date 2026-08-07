import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatabaseUtils } from './DatabaseUtils';

const meta: Meta<typeof DatabaseUtils> = {
  title: 'Helper-Test/DatabaseUtils',
  component: DatabaseUtils,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatabaseUtils>;

export const Default: Story = {
  name: 'Helper',
};
