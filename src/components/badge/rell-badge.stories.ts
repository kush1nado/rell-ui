import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'rell-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Badge variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Dot badge (no text)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => `<rell-badge variant="primary">12</rell-badge>`,
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rell-badge variant="primary">Primary</rell-badge>
      <rell-badge variant="secondary">Secondary</rell-badge>
      <rell-badge variant="success">Success</rell-badge>
      <rell-badge variant="warning">Warning</rell-badge>
      <rell-badge variant="error">Error</rell-badge>
      <rell-badge variant="info">Info</rell-badge>
      <rell-badge variant="neutral">Neutral</rell-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rell-badge variant="primary" size="sm">Small</rell-badge>
      <rell-badge variant="primary" size="md">Medium</rell-badge>
      <rell-badge variant="primary" size="lg">Large</rell-badge>
    </div>
  `,
};

export const Dot: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rell-badge variant="primary" dot></rell-badge>
      <rell-badge variant="success" dot></rell-badge>
      <rell-badge variant="error" dot></rell-badge>
      <rell-badge variant="warning" dot></rell-badge>
    </div>
  `,
};

export const WithText: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <rell-typography variant="body">Notifications</rell-typography>
        <rell-badge variant="error">5</rell-badge>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <rell-typography variant="body">Messages</rell-typography>
        <rell-badge variant="primary">12</rell-badge>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <rell-typography variant="body">Status</rell-typography>
        <rell-badge variant="success" dot></rell-badge>
      </div>
    </div>
  `,
};

export const OnButton: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <rell-button variant="primary" style="position: relative;">
        Notifications
        <rell-badge variant="error" size="sm" style="position: absolute; top: -8px; right: -8px;">3</rell-badge>
      </rell-button>
      <rell-button variant="secondary">
        Messages
        <rell-badge variant="primary" size="sm" style="margin-left: 0.5rem;">12</rell-badge>
      </rell-button>
    </div>
  `,
};

