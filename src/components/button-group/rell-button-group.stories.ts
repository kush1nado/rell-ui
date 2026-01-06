import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ButtonGroup',
  component: 'rell-button-group',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Button group orientation',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    gap: {
      control: 'text',
      description: 'Gap between buttons',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => `
    <rell-button-group>
      <rell-button>Left</rell-button>
      <rell-button>Center</rell-button>
      <rell-button>Right</rell-button>
    </rell-button-group>
  `,
};

export const Vertical: Story = {
  render: () => `
    <rell-button-group orientation="vertical">
      <rell-button>Top</rell-button>
      <rell-button>Middle</rell-button>
      <rell-button>Bottom</rell-button>
    </rell-button-group>
  `,
};

export const WithGap: Story = {
  render: () => `
    <rell-button-group gap="0.5rem">
      <rell-button>Button 1</rell-button>
      <rell-button>Button 2</rell-button>
      <rell-button>Button 3</rell-button>
    </rell-button-group>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-button-group variant="primary">
        <rell-button>Primary</rell-button>
        <rell-button>Primary</rell-button>
      </rell-button-group>
      <rell-button-group variant="outline">
        <rell-button>Outline</rell-button>
        <rell-button>Outline</rell-button>
      </rell-button-group>
      <rell-button-group variant="ghost">
        <rell-button>Ghost</rell-button>
        <rell-button>Ghost</rell-button>
      </rell-button-group>
    </rell-stack>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-button-group size="sm">
        <rell-button>Small</rell-button>
        <rell-button>Small</rell-button>
      </rell-button-group>
      <rell-button-group size="md">
        <rell-button>Medium</rell-button>
        <rell-button>Medium</rell-button>
      </rell-button-group>
      <rell-button-group size="lg">
        <rell-button>Large</rell-button>
        <rell-button>Large</rell-button>
      </rell-button-group>
    </rell-stack>
  `,
};

