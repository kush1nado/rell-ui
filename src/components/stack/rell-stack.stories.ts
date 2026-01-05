import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Stack',
  component: 'rell-stack',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Stack direction',
    },
    gap: {
      control: 'text',
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'Align items',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content',
    },
    wrap: {
      control: 'boolean',
      description: 'Wrap items',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => `
    <rell-stack>
      <rell-button>Button 1</rell-button>
      <rell-button>Button 2</rell-button>
      <rell-button>Button 3</rell-button>
    </rell-stack>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-stack direction="horizontal">
      <rell-button>Button 1</rell-button>
      <rell-button>Button 2</rell-button>
      <rell-button>Button 3</rell-button>
    </rell-stack>
  `,
};

export const WithGap: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <rell-card>
        <rell-typography variant="h4">Card 1</rell-typography>
      </rell-card>
      <rell-card>
        <rell-typography variant="h4">Card 2</rell-typography>
      </rell-card>
    </rell-stack>
  `,
};

export const Aligned: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <rell-typography variant="caption" color="secondary">Center</rell-typography>
        <rell-stack align="center">
          <rell-button>Button 1</rell-button>
          <rell-button>Button 2</rell-button>
        </rell-stack>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">Flex End</rell-typography>
        <rell-stack align="flex-end">
          <rell-button>Button 1</rell-button>
          <rell-button>Button 2</rell-button>
        </rell-stack>
      </div>
    </div>
  `,
};

export const Justified: Story = {
  render: () => `
    <rell-stack direction="horizontal" justify="space-between">
      <rell-button variant="ghost">Left</rell-button>
      <rell-button variant="primary">Center</rell-button>
      <rell-button variant="ghost">Right</rell-button>
    </rell-stack>
  `,
};

export const WithWrap: Story = {
  render: () => `
    <rell-stack direction="horizontal" wrap gap="1rem">
      <rell-button>Button 1</rell-button>
      <rell-button>Button 2</rell-button>
      <rell-button>Button 3</rell-button>
      <rell-button>Button 4</rell-button>
      <rell-button>Button 5</rell-button>
      <rell-button>Button 6</rell-button>
    </rell-stack>
  `,
};
