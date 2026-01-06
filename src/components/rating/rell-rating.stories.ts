import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Rating',
  component: 'rell-rating',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Rating value',
    },
    max: {
      control: 'number',
      description: 'Maximum rating',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Rating size',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    'allow-half': {
      control: 'boolean',
      description: 'Allow half stars',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-rating value="3"></rell-rating>`,
};

export const Interactive: Story = {
  render: () => `<rell-rating></rell-rating>`,
};

export const Readonly: Story = {
  render: () => `<rell-rating value="4" readonly></rell-rating>`,
};

export const HalfStars: Story = {
  render: () => `<rell-rating value="3.5" allow-half></rell-rating>`,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-rating value="4" size="sm"></rell-rating>
      <rell-rating value="4" size="md"></rell-rating>
      <rell-rating value="4" size="lg"></rell-rating>
    </rell-stack>
  `,
};

export const CustomMax: Story = {
  render: () => `<rell-rating value="7" max="10"></rell-rating>`,
};

export const Disabled: Story = {
  render: () => `<rell-rating value="3" disabled></rell-rating>`,
};

