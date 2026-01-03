import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Input',
  component: 'rell-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input placeholder="Enter text..."></rell-input>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input value="Cyberpunk 2077" placeholder="Enter text..."></rell-input>
    </div>
  `,
};

export const Types: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input type="text" placeholder="Text input"></rell-input>
      <rell-input type="email" placeholder="Email input"></rell-input>
      <rell-input type="password" placeholder="Password input"></rell-input>
      <rell-input type="number" placeholder="Number input"></rell-input>
      <rell-input type="search" placeholder="Search input"></rell-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input size="sm" placeholder="Small input"></rell-input>
      <rell-input size="md" placeholder="Medium input"></rell-input>
      <rell-input size="lg" placeholder="Large input"></rell-input>
    </div>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input placeholder="Normal state"></rell-input>
      <rell-input placeholder="Disabled state" disabled></rell-input>
      <rell-input placeholder="Error state" error></rell-input>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 300px;">
      <rell-typography variant="caption" color="secondary">Username</rell-typography>
      <rell-input placeholder="Enter username"></rell-input>
    </div>
  `,
};
