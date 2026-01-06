import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Card',
  component: 'rell-card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Card variant',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    padding: {
      control: 'text',
      description: 'Card padding',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-card>
      <rell-typography variant="h3">Card Title</rell-typography>
      <rell-typography variant="body" color="secondary">
        This is a simple card component. You can add any content inside it.
      </rell-typography>
    </rell-card>
  `,
};

export const WithHeader: Story = {
  render: () => `
    <rell-card>
      <div slot="header">
        <rell-typography variant="h3">Card with Header</rell-typography>
      </div>
      <rell-typography variant="body" color="secondary">
        This card has a header section. The header is separated from the body content.
      </rell-typography>
    </rell-card>
  `,
};

export const WithStructuredHeader: Story = {
  render: () => `
    <rell-card>
      <div slot="header-icon" style="display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
        Folder
      </div>
      <div slot="header-title">
        <rell-typography variant="h3">Card Title</rell-typography>
        <rell-typography variant="caption" color="tertiary">With structured header</rell-typography>
      </div>
      <div slot="header-action">
        <rell-badge variant="success" dot></rell-badge>
      </div>
      <rell-typography variant="body" color="secondary">
        This card has a structured header with icon, title, and action badge.
      </rell-typography>
    </rell-card>
  `,
};

export const WithBadgeInHeader: Story = {
  render: () => `
    <rell-card>
      <div slot="header-icon" style="display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
        Action
      </div>
      <div slot="header-title">
        <rell-typography variant="h3">Notifications</rell-typography>
      </div>
      <div slot="header-action">
        <rell-badge variant="error">5</rell-badge>
      </div>
      <rell-typography variant="body" color="secondary">
        You have 5 new notifications waiting for you.
      </rell-typography>
    </rell-card>
  `,
};

export const WithFooter: Story = {
  render: () => `
    <rell-card>
      <rell-typography variant="h3">Card with Footer</rell-typography>
      <rell-typography variant="body" color="secondary">
        This card has a footer section at the bottom.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="primary">Action</rell-button>
      </div>
    </rell-card>
  `,
};

export const Complete: Story = {
  render: () => `
    <rell-card>
      <div slot="header">
        <rell-typography variant="h3">Complete Card</rell-typography>
        <rell-typography variant="caption" color="tertiary">With header and footer</rell-typography>
      </div>
      <rell-typography variant="body" color="secondary">
        This is a complete card with header, body, and footer sections. Perfect for displaying structured content.
      </rell-typography>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="primary">Confirm</rell-button>
      </div>
    </rell-card>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-card variant="elevated">
        <rell-typography variant="h4">Elevated Card</rell-typography>
        <rell-typography variant="body" color="secondary">With shadow</rell-typography>
      </rell-card>
      <rell-card variant="outlined">
        <rell-typography variant="h4">Outlined Card</rell-typography>
        <rell-typography variant="body" color="secondary">With border</rell-typography>
      </rell-card>
      <rell-card variant="flat">
        <rell-typography variant="h4">Flat Card</rell-typography>
        <rell-typography variant="body" color="secondary">No shadow, no border</rell-typography>
      </rell-card>
    </div>
  `,
};

export const WithHover: Story = {
  render: () => `
    <rell-card hover>
      <rell-typography variant="h3">Hover Card</rell-typography>
      <rell-typography variant="body" color="secondary">
        Hover over this card to see the effect. It will lift up slightly.
      </rell-typography>
    </rell-card>
  `,
};

export const WithContent: Story = {
  render: () => `
    <rell-card>
      <div slot="header">
        <rell-typography variant="h3">Product Card</rell-typography>
      </div>
      <div style="margin-bottom: 1rem;">
        <div style="background: var(--rell-surface-hover); height: 200px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <rell-typography variant="body" color="tertiary">Image placeholder</rell-typography>
        </div>
      </div>
      <rell-typography variant="h4">Product Name</rell-typography>
      <rell-typography variant="body" color="secondary" style="margin-bottom: 1rem;">
        Product description goes here. This card can contain any content you need.
      </rell-typography>
      <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
        <rell-typography variant="h4" color="accent">$99.99</rell-typography>
        <rell-button variant="primary">Add to Cart</rell-button>
      </div>
    </rell-card>
  `,
};

export const CustomPadding: Story = {
  render: () => `
    <rell-card padding="2rem">
      <rell-typography variant="h3">Custom Padding</rell-typography>
      <rell-typography variant="body" color="secondary">
        This card has custom padding of 2rem.
      </rell-typography>
    </rell-card>
  `,
};

