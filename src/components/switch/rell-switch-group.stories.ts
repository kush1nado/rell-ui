import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Switch Group',
  component: 'rell-switch-group',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Group orientation',
    },
    gap: {
      control: 'text',
      description: 'Gap between switches',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => `
    <rell-switch-group>
      <rell-switch label="Email notifications"></rell-switch>
      <rell-switch checked label="Push notifications"></rell-switch>
      <rell-switch label="SMS notifications"></rell-switch>
    </rell-switch-group>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-switch-group orientation="horizontal">
      <rell-switch label="Option 1"></rell-switch>
      <rell-switch checked label="Option 2"></rell-switch>
      <rell-switch label="Option 3"></rell-switch>
    </rell-switch-group>
  `,
};

export const WithGap: Story = {
  render: () => `
    <rell-switch-group gap="2rem">
      <rell-switch label="Feature 1"></rell-switch>
      <rell-switch checked label="Feature 2"></rell-switch>
      <rell-switch label="Feature 3"></rell-switch>
    </rell-switch-group>
  `,
};

