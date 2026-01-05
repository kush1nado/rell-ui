import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Box',
  component: 'rell-box',
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'text',
      description: 'Box padding',
    },
    margin: {
      control: 'text',
      description: 'Box margin',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'elevated'],
      description: 'Box variant',
    },
    'border-radius': {
      control: 'text',
      description: 'Border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl'],
      description: 'Box shadow',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-box>
      <rell-typography variant="body">Default box content</rell-typography>
    </rell-box>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-box variant="default">
        <rell-typography variant="body">Default variant</rell-typography>
      </rell-box>
      <rell-box variant="outlined">
        <rell-typography variant="body">Outlined variant</rell-typography>
      </rell-box>
      <rell-box variant="filled">
        <rell-typography variant="body">Filled variant</rell-typography>
      </rell-box>
      <rell-box variant="elevated" shadow="md">
        <rell-typography variant="body">Elevated variant</rell-typography>
      </rell-box>
    </rell-stack>
  `,
};

export const WithPadding: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-box padding="1rem">
        <rell-typography variant="body">Small padding</rell-typography>
      </rell-box>
      <rell-box padding="2rem">
        <rell-typography variant="body">Large padding</rell-typography>
      </rell-box>
    </rell-stack>
  `,
};

export const WithBorderRadius: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-box border-radius="0.5rem">
        <rell-typography variant="body">Rounded box</rell-typography>
      </rell-box>
      <rell-box border-radius="1rem">
        <rell-typography variant="body">More rounded</rell-typography>
      </rell-box>
    </rell-stack>
  `,
};

export const WithShadow: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-box shadow="sm">
        <rell-typography variant="body">Small shadow</rell-typography>
      </rell-box>
      <rell-box shadow="md">
        <rell-typography variant="body">Medium shadow</rell-typography>
      </rell-box>
      <rell-box shadow="lg">
        <rell-typography variant="body">Large shadow</rell-typography>
      </rell-box>
    </rell-stack>
  `,
};
