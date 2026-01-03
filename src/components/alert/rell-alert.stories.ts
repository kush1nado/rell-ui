import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'rell-alert',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Alert type',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'subtle'],
      description: 'Alert variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    icon: {
      control: 'boolean',
      description: 'Show icon',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => `
    <rell-alert type="success">
      <div class="alert-title">Success!</div>
      <div class="alert-message">Your action was completed successfully.</div>
    </rell-alert>
  `,
};

export const Warning: Story = {
  render: () => `
    <rell-alert type="warning">
      <div class="alert-title">Warning</div>
      <div class="alert-message">Please review your input before proceeding.</div>
    </rell-alert>
  `,
};

export const Error: Story = {
  render: () => `
    <rell-alert type="error">
      <div class="alert-title">Error</div>
      <div class="alert-message">Something went wrong. Please try again.</div>
    </rell-alert>
  `,
};

export const Info: Story = {
  render: () => `
    <rell-alert type="info">
      <div class="alert-title">Information</div>
      <div class="alert-message">Here is some useful information for you.</div>
    </rell-alert>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-alert type="success" variant="filled">
        <div class="alert-message">Filled variant</div>
      </rell-alert>
      <rell-alert type="success" variant="outlined">
        <div class="alert-message">Outlined variant</div>
      </rell-alert>
      <rell-alert type="success" variant="subtle">
        <div class="alert-message">Subtle variant</div>
      </rell-alert>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () => `
    <rell-alert type="info" dismissible>
      <div class="alert-title">Dismissible Alert</div>
      <div class="alert-message">Click the × button to close this alert.</div>
    </rell-alert>
  `,
};

export const WithoutIcon: Story = {
  render: () => `
    <rell-alert type="success" icon="false">
      <div class="alert-message">Alert without icon</div>
    </rell-alert>
  `,
};

export const Simple: Story = {
  render: () => `
    <rell-alert type="info">
      <div class="alert-message">Simple alert message without title</div>
    </rell-alert>
  `,
};

