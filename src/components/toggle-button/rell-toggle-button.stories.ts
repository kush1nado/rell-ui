import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ToggleButton',
  component: 'rell-toggle-button',
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Button variant',
    },
    value: {
      control: 'text',
      description: 'Button value',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-toggle-button>Toggle</rell-toggle-button>`,
};

export const Checked: Story = {
  render: () => `<rell-toggle-button checked>Checked</rell-toggle-button>`,
};

export const Variants: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="1rem">
      <rell-toggle-button variant="primary">Primary</rell-toggle-button>
      <rell-toggle-button variant="secondary">Secondary</rell-toggle-button>
      <rell-toggle-button variant="outline">Outline</rell-toggle-button>
    </rell-stack>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="1rem" align="center">
      <rell-toggle-button size="sm">Small</rell-toggle-button>
      <rell-toggle-button size="md">Medium</rell-toggle-button>
      <rell-toggle-button size="lg">Large</rell-toggle-button>
    </rell-stack>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="1rem">
      <rell-toggle-button>❤️</rell-toggle-button>
      <rell-toggle-button checked>⭐</rell-toggle-button>
      <rell-toggle-button>🔔</rell-toggle-button>
    </rell-stack>
  `,
};

