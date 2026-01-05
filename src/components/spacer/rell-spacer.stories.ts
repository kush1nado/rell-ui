import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Spacer',
  component: 'rell-spacer',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
      description: 'Spacer size',
    },
    axis: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Spacer axis',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => `
    <div>
      <rell-button>Button 1</rell-button>
      <rell-spacer></rell-spacer>
      <rell-button>Button 2</rell-button>
    </div>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <div style="display: flex; height: 200px;">
      <rell-button>Button 1</rell-button>
      <rell-spacer axis="horizontal"></rell-spacer>
      <rell-button>Button 2</rell-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div>
      <rell-button>Top</rell-button>
      <rell-spacer size="0.5rem"></rell-spacer>
      <rell-button>Small gap</rell-button>
      <rell-spacer size="2rem"></rell-spacer>
      <rell-button>Large gap</rell-button>
      <rell-spacer size="4rem"></rell-spacer>
      <rell-button>Extra large gap</rell-button>
    </div>
  `,
};

export const InFlex: Story = {
  render: () => `
    <div style="display: flex; align-items: center;">
      <rell-button>Left</rell-button>
      <rell-spacer axis="horizontal"></rell-spacer>
      <rell-button>Right</rell-button>
    </div>
  `,
};
