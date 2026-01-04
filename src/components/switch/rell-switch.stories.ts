import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Switch',
  component: 'rell-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    label: {
      control: 'text',
      description: 'Switch label',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    'error-message': {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-switch label="Enable notifications"></rell-switch>`,
};

export const Checked: Story = {
  render: () => `<rell-switch checked label="Enable notifications"></rell-switch>`,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-switch size="sm" label="Small switch"></rell-switch>
      <rell-switch size="md" label="Medium switch"></rell-switch>
      <rell-switch size="lg" label="Large switch"></rell-switch>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-switch label="Enabled switch"></rell-switch>
      <rell-switch disabled label="Disabled switch"></rell-switch>
      <rell-switch checked disabled label="Checked disabled switch"></rell-switch>
    </div>
  `,
};

export const WithSlot: Story = {
  render: () => `
    <rell-switch>
      <rell-typography variant="body">Custom label with typography</rell-typography>
    </rell-switch>
  `,
};

export const WithError: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-switch error error-message="You must enable notifications to continue">
        Enable notifications
      </rell-switch>
      <rell-switch error error-message="This feature requires your consent">
        Enable data collection
      </rell-switch>
    </div>
  `,
};

