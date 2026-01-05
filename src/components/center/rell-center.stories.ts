import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Center',
  component: 'rell-center',
  tags: ['autodocs'],
  argTypes: {
    axis: {
      control: 'select',
      options: ['both', 'horizontal', 'vertical'],
      description: 'Center axis',
    },
    inline: {
      control: 'boolean',
      description: 'Inline center',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Both: Story = {
  render: () => `
    <rell-center style="height: 200px; border: 1px dashed var(--rell-border-default);">
      <rell-button>Centered Button</rell-button>
    </rell-center>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-center axis="horizontal" style="height: 100px; border: 1px dashed var(--rell-border-default);">
      <rell-button>Horizontally Centered</rell-button>
    </rell-center>
  `,
};

export const Vertical: Story = {
  render: () => `
    <rell-center axis="vertical" style="height: 200px; border: 1px dashed var(--rell-border-default);">
      <rell-button>Vertically Centered</rell-button>
    </rell-center>
  `,
};

export const Inline: Story = {
  render: () => `
    <div>
      Text before <rell-center inline><rell-badge>Centered</rell-badge></rell-center> text after
    </div>
  `,
};

export const WithContent: Story = {
  render: () => `
    <rell-center style="height: 300px; border: 1px dashed var(--rell-border-default);">
      <rell-card style="width: 300px;">
        <rell-typography variant="h3">Centered Card</rell-typography>
        <rell-typography variant="body" color="secondary">
          This card is centered both horizontally and vertically
        </rell-typography>
      </rell-card>
    </rell-center>
  `,
};
