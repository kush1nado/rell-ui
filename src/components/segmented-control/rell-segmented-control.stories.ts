import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/SegmentedControl',
  component: 'rell-segmented-control',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Control size',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: 'Control variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-segmented-control value="option1">
      <rell-segmented-control-item value="option1">Option 1</rell-segmented-control-item>
      <rell-segmented-control-item value="option2">Option 2</rell-segmented-control-item>
      <rell-segmented-control-item value="option3">Option 3</rell-segmented-control-item>
    </rell-segmented-control>
  `,
};

export const Outlined: Story = {
  render: () => `
    <rell-segmented-control value="left" variant="outlined">
      <rell-segmented-control-item value="left">Left</rell-segmented-control-item>
      <rell-segmented-control-item value="center">Center</rell-segmented-control-item>
      <rell-segmented-control-item value="right">Right</rell-segmented-control-item>
    </rell-segmented-control>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-segmented-control value="sm" size="sm">
        <rell-segmented-control-item value="sm">Small</rell-segmented-control-item>
        <rell-segmented-control-item value="md">Medium</rell-segmented-control-item>
      </rell-segmented-control>
      <rell-segmented-control value="md" size="md">
        <rell-segmented-control-item value="sm">Small</rell-segmented-control-item>
        <rell-segmented-control-item value="md">Medium</rell-segmented-control-item>
      </rell-segmented-control>
      <rell-segmented-control value="lg" size="lg">
        <rell-segmented-control-item value="sm">Small</rell-segmented-control-item>
        <rell-segmented-control-item value="md">Medium</rell-segmented-control-item>
      </rell-segmented-control>
    </div>
  `,
};

