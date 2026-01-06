import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Search',
  component: 'rell-search',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Search placeholder',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Search size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-search></rell-search>`,
};

export const WithPlaceholder: Story = {
  render: () => `<rell-search placeholder="Search products..."></rell-search>`,
};

export const Clearable: Story = {
  render: () => `<rell-search clearable value="Search term"></rell-search>`,
};

export const Loading: Story = {
  render: () => `<rell-search loading value="Searching..."></rell-search>`,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-search size="sm" placeholder="Small search"></rell-search>
      <rell-search size="md" placeholder="Medium search"></rell-search>
      <rell-search size="lg" placeholder="Large search"></rell-search>
    </rell-stack>
  `,
};

export const Disabled: Story = {
  render: () => `<rell-search disabled value="Disabled search"></rell-search>`,
};

