import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'rell-chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'outline'],
      description: 'Chip variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    clickable: {
      control: 'boolean',
      description: 'Make chip clickable',
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
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <rell-chip>Default</rell-chip>
      <rell-chip variant="primary">Primary</rell-chip>
      <rell-chip variant="secondary">Secondary</rell-chip>
      <rell-chip variant="success">Success</rell-chip>
      <rell-chip variant="warning">Warning</rell-chip>
      <rell-chip variant="error">Error</rell-chip>
      <rell-chip variant="info">Info</rell-chip>
      <rell-chip variant="outline">Outline</rell-chip>
    </div>
  `,
};

export const Closable: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <rell-chip closable>Closable</rell-chip>
      <rell-chip variant="primary" closable>Primary Closable</rell-chip>
      <rell-chip variant="success" closable>Success Closable</rell-chip>
      <rell-chip variant="outline" closable>Outline Closable</rell-chip>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <rell-chip size="sm">Small</rell-chip>
      <rell-chip size="md">Medium</rell-chip>
      <rell-chip size="lg">Large</rell-chip>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <rell-chip>
        <rell-svg name="check" slot="icon" size="16"></rell-svg>
        With Icon
      </rell-chip>
      <rell-chip variant="primary" closable>
        <rell-svg name="star" slot="icon" size="16"></rell-svg>
        Starred
      </rell-chip>
      <rell-chip variant="success" closable>
        <rell-svg name="check" slot="icon" size="16"></rell-svg>
        Verified
      </rell-chip>
    </div>
  `,
};

export const Clickable: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <rell-chip clickable>Clickable</rell-chip>
      <rell-chip variant="primary" clickable>Primary Clickable</rell-chip>
      <rell-chip variant="outline" clickable>Outline Clickable</rell-chip>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <rell-chip disabled>Disabled</rell-chip>
      <rell-chip variant="primary" disabled>Primary Disabled</rell-chip>
      <rell-chip variant="outline" disabled closable>Outline Disabled</rell-chip>
    </div>
  `,
};

export const FilterChips: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <rell-chip variant="primary" closable>Filter 1</rell-chip>
        <rell-chip variant="primary" closable>Filter 2</rell-chip>
        <rell-chip variant="primary" closable>Filter 3</rell-chip>
      </div>
      <p style="color: var(--rell-text-secondary); font-size: 0.875rem;">
        Use closable chips for filters and tags
      </p>
    </div>
  `,
};

