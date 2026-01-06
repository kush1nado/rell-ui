import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Item',
  component: 'rell-item',
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    clickable: {
      control: 'boolean',
      description: 'Clickable state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Item size',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Item variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => `
    <rell-item>
      <span slot="title">Item Title</span>
    </rell-item>
  `,
};

export const WithDescription: Story = {
  render: () => `
    <rell-item>
      <span slot="title">Item Title</span>
      <span slot="description">This is a description of the item</span>
    </rell-item>
  `,
};

export const WithIcon: Story = {
  render: () => `
    <rell-item>
      <rell-svg name="user" size="20" slot="icon"></rell-svg>
      <span slot="title">User Profile</span>
      <span slot="description">Manage your profile settings</span>
    </rell-item>
  `,
};

export const Clickable: Story = {
  render: () => `
    <rell-item clickable>
      <span slot="title">Clickable Item</span>
      <span slot="description">Click me to trigger an action</span>
    </rell-item>
  `,
};

export const WithAction: Story = {
  render: () => `
    <rell-item clickable>
      <span slot="title">Item with Action</span>
      <span slot="description">This item has an action button</span>
      <rell-button variant="ghost" size="sm" slot="action">Action</rell-button>
    </rell-item>
  `,
};

export const Selected: Story = {
  render: () => `
    <rell-item selected>
      <span slot="title">Selected Item</span>
      <span slot="description">This item is selected</span>
    </rell-item>
  `,
};

export const Disabled: Story = {
  render: () => `
    <rell-item disabled>
      <span slot="title">Disabled Item</span>
      <span slot="description">This item is disabled</span>
    </rell-item>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-item variant="default">
        <span slot="title">Default Variant</span>
      </rell-item>
      <rell-item variant="outlined">
        <span slot="title">Outlined Variant</span>
      </rell-item>
      <rell-item variant="filled">
        <span slot="title">Filled Variant</span>
      </rell-item>
    </rell-stack>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-item size="sm">
        <span slot="title">Small Item</span>
      </rell-item>
      <rell-item size="md">
        <span slot="title">Medium Item</span>
      </rell-item>
      <rell-item size="lg">
        <span slot="title">Large Item</span>
      </rell-item>
    </rell-stack>
  `,
};

export const WithLink: Story = {
  render: () => `
    <rell-item href="/dashboard" clickable>
      <span slot="title">Dashboard</span>
      <span slot="description">Go to dashboard</span>
    </rell-item>
  `,
};

