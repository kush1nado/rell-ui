import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'rell-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-checkbox>Accept terms</rell-checkbox>`,
};

export const Checked: Story = {
  render: () => `<rell-checkbox checked>Accept terms</rell-checkbox>`,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-checkbox size="sm">Small checkbox</rell-checkbox>
      <rell-checkbox size="md" checked>Medium checkbox</rell-checkbox>
      <rell-checkbox size="lg">Large checkbox</rell-checkbox>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-checkbox>Unchecked</rell-checkbox>
      <rell-checkbox indeterminate>Indeterminate</rell-checkbox>
      <rell-checkbox checked>Checked</rell-checkbox>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-checkbox>Enabled</rell-checkbox>
      <rell-checkbox disabled>Disabled</rell-checkbox>
      <rell-checkbox checked disabled>Checked Disabled</rell-checkbox>
    </div>
  `,
};

