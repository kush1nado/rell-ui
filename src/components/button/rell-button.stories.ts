import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Button',
  component: 'rell-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Вариант кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка',
    },
    'full-width': {
      control: 'boolean',
      description: 'Занимает ли кнопка всю ширину',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => `<rell-button variant="primary">Primary Button</rell-button>`,
};

export const Secondary: Story = {
  render: () => `<rell-button variant="secondary">Secondary Button</rell-button>`,
};

export const Outline: Story = {
  render: () => `<rell-button variant="outline">Outline Button</rell-button>`,
};

export const Ghost: Story = {
  render: () => `<rell-button variant="ghost">Ghost Button</rell-button>`,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rell-button variant="primary" size="sm">Small</rell-button>
      <rell-button variant="primary" size="md">Medium</rell-button>
      <rell-button variant="primary" size="lg">Large</rell-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <rell-button variant="primary" disabled>Disabled Primary</rell-button>
      <rell-button variant="secondary" disabled>Disabled Secondary</rell-button>
      <rell-button variant="outline" disabled>Disabled Outline</rell-button>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-button variant="primary" full-width>Full Width Button</rell-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-button variant="primary">Primary</rell-button>
      <rell-button variant="secondary">Secondary</rell-button>
      <rell-button variant="outline">Outline</rell-button>
      <rell-button variant="ghost">Ghost</rell-button>
    </div>
  `,
};
