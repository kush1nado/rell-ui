import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'rell-divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Divider variant',
    },
    label: {
      control: 'text',
      description: 'Divider label',
    },
    spacing: {
      control: 'text',
      description: 'Spacing around divider',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-typography variant="body">Content above</rell-typography>
      <rell-divider></rell-divider>
      <rell-typography variant="body">Content below</rell-typography>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-typography variant="body">Content above</rell-typography>
      <rell-divider label="OR"></rell-divider>
      <rell-typography variant="body">Content below</rell-typography>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-typography variant="body">Solid divider</rell-typography>
      <rell-divider variant="solid"></rell-divider>
      <rell-typography variant="body">Dashed divider</rell-typography>
      <rell-divider variant="dashed"></rell-divider>
      <rell-typography variant="body">Dotted divider</rell-typography>
      <rell-divider variant="dotted"></rell-divider>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => `
    <div style="display: flex; align-items: center; height: 200px;">
      <rell-typography variant="body">Left</rell-typography>
      <rell-divider orientation="vertical"></rell-divider>
      <rell-typography variant="body">Right</rell-typography>
    </div>
  `,
};

export const WithSpacing: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-typography variant="body">Content with spacing</rell-typography>
      <rell-divider spacing="2rem" label="Section"></rell-divider>
      <rell-typography variant="body">More content</rell-typography>
    </div>
  `,
};

