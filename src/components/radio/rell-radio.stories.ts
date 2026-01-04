import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'rell-radio',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    value: {
      control: 'text',
      description: 'Radio value',
    },
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
      description: 'Radio size',
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
  render: () => `
    <rell-radio name="example" value="option1">Option 1</rell-radio>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-radio name="size" value="sm" size="sm">Small</rell-radio>
      <rell-radio name="size" value="md" size="md" checked>Medium</rell-radio>
      <rell-radio name="size" value="lg" size="lg">Large</rell-radio>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-radio name="disabled" value="enabled">Enabled</rell-radio>
      <rell-radio name="disabled" value="disabled" disabled>Disabled</rell-radio>
      <rell-radio name="disabled" value="checked-disabled" checked disabled>Checked Disabled</rell-radio>
    </div>
  `,
};

export const WithError: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-radio name="error-example" value="option1" error error-message="Please select an option">
        Option 1
      </rell-radio>
      <rell-radio name="error-example" value="option2">
        Option 2
      </rell-radio>
      <rell-radio name="error-example" value="option3">
        Option 3
      </rell-radio>
    </div>
  `,
};

