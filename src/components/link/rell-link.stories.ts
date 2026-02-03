import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Link',
  component: 'rell-link',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'text'],
      description: 'Link variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size',
    },
    underline: {
      control: 'boolean',
      description: 'Show underline',
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
    <div style="padding: 2rem;">
      <p>
        This is a paragraph with a <rell-link href="#default">default link</rell-link> inside it.
      </p>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <rell-link href="#primary" variant="primary">Primary Link</rell-link>
      <rell-link href="#secondary" variant="secondary">Secondary Link</rell-link>
      <rell-link href="#success" variant="success">Success Link</rell-link>
      <rell-link href="#warning" variant="warning">Warning Link</rell-link>
      <rell-link href="#error" variant="error">Error Link</rell-link>
      <rell-link href="#info" variant="info">Info Link</rell-link>
      <rell-link href="#text" variant="text">Text Link</rell-link>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <rell-link href="#small" size="sm">Small Link</rell-link>
      <rell-link href="#medium" size="md">Medium Link</rell-link>
      <rell-link href="#large" size="lg">Large Link</rell-link>
    </div>
  `,
};

export const WithoutUnderline: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <p>
        This is a paragraph with a <rell-link href="#no-underline" underline="false">link without underline</rell-link> inside it.
      </p>
      <p>
        Hover to see the underline appear.
      </p>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <rell-link href="#external" target="_blank">
        <rell-svg name="external" slot="icon" size="16"></rell-svg>
        External Link
      </rell-link>
      <rell-link href="#download" variant="primary">
        <rell-svg name="download" slot="icon" size="16"></rell-svg>
        Download
      </rell-link>
      <rell-link href="#info" variant="info">
        <rell-svg name="info" slot="icon" size="16"></rell-svg>
        More Info
      </rell-link>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <rell-link href="#disabled" disabled>Disabled Link</rell-link>
      <rell-link href="#disabled-primary" variant="primary" disabled>Disabled Primary Link</rell-link>
    </div>
  `,
};

export const External: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <p>
        <rell-link href="https://example.com" target="_blank">
          External Link
          <rell-svg name="external" slot="icon" size="14"></rell-svg>
        </rell-link>
      </p>
    </div>
  `,
};

