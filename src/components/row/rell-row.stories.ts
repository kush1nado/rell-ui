import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Layout/Row',
  component: 'rell-row',
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'text',
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'Vertical alignment',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal alignment',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow wrapping',
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex direction',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-row>
      <rell-button variant="primary">Button 1</rell-button>
      <rell-button variant="secondary">Button 2</rell-button>
      <rell-button variant="outline">Button 3</rell-button>
    </rell-row>
  `,
};

export const WithGap: Story = {
  render: () => `
    <rell-row gap="2rem">
      <rell-button variant="primary">Button 1</rell-button>
      <rell-button variant="secondary">Button 2</rell-button>
      <rell-button variant="outline">Button 3</rell-button>
    </rell-row>
  `,
};

export const AlignCenter: Story = {
  render: () => `
    <rell-row align="center" style="height: 100px;">
      <rell-button variant="primary">Button 1</rell-button>
      <rell-button variant="secondary">Button 2</rell-button>
    </rell-row>
  `,
};

export const JustifySpaceBetween: Story = {
  render: () => `
    <rell-row justify="space-between">
      <rell-button variant="primary">Left</rell-button>
      <rell-button variant="secondary">Right</rell-button>
    </rell-row>
  `,
};

export const WithWrap: Story = {
  render: () => `
    <rell-row wrap style="max-width: 400px;">
      <rell-button variant="primary">Button 1</rell-button>
      <rell-button variant="secondary">Button 2</rell-button>
      <rell-button variant="outline">Button 3</rell-button>
      <rell-button variant="ghost">Button 4</rell-button>
    </rell-row>
  `,
};

export const ColumnDirection: Story = {
  render: () => `
    <rell-row direction="column" gap="1rem">
      <rell-button variant="primary">Button 1</rell-button>
      <rell-button variant="secondary">Button 2</rell-button>
      <rell-button variant="outline">Button 3</rell-button>
    </rell-row>
  `,
};

