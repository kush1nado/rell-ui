import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Radio Group',
  component: 'rell-radio-group',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value',
    },
    name: {
      control: 'text',
      description: 'Group name',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Group orientation',
    },
    gap: {
      control: 'text',
      description: 'Gap between radios',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-radio-group>
      <rell-radio value="option1">Option 1</rell-radio>
      <rell-radio value="option2">Option 2</rell-radio>
      <rell-radio value="option3">Option 3</rell-radio>
    </rell-radio-group>
  `,
};

export const WithInitialValue: Story = {
  render: () => `
    <rell-radio-group value="option2">
      <rell-radio value="option1">Option 1</rell-radio>
      <rell-radio value="option2">Option 2 (selected)</rell-radio>
      <rell-radio value="option3">Option 3</rell-radio>
    </rell-radio-group>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-radio-group orientation="horizontal">
      <rell-radio value="left">Left</rell-radio>
      <rell-radio value="center">Center</rell-radio>
      <rell-radio value="right">Right</rell-radio>
    </rell-radio-group>
  `,
};

export const WithDisabled: Story = {
  render: () => `
    <rell-radio-group>
      <rell-radio value="enabled1">Enabled Option 1</rell-radio>
      <rell-radio value="enabled2">Enabled Option 2</rell-radio>
      <rell-radio value="disabled" disabled>Disabled Option</rell-radio>
    </rell-radio-group>
  `,
};

