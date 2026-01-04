import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Checkbox Group',
  component: 'rell-checkbox-group',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected values (JSON array)',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Group orientation',
    },
    gap: {
      control: 'text',
      description: 'Gap between checkboxes',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-checkbox-group>
      <rell-checkbox value="option1">Option 1</rell-checkbox>
      <rell-checkbox value="option2" checked>Option 2</rell-checkbox>
      <rell-checkbox value="option3">Option 3</rell-checkbox>
    </rell-checkbox-group>
  `,
};

export const WithInitialValues: Story = {
  render: () => `
    <rell-checkbox-group value='["option1","option3"]'>
      <rell-checkbox value="option1">Option 1</rell-checkbox>
      <rell-checkbox value="option2">Option 2</rell-checkbox>
      <rell-checkbox value="option3">Option 3</rell-checkbox>
    </rell-checkbox-group>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-checkbox-group orientation="horizontal">
      <rell-checkbox value="react">React</rell-checkbox>
      <rell-checkbox value="vue">Vue</rell-checkbox>
      <rell-checkbox value="angular">Angular</rell-checkbox>
      <rell-checkbox value="svelte">Svelte</rell-checkbox>
    </rell-checkbox-group>
  `,
};

export const WithDisabled: Story = {
  render: () => `
    <rell-checkbox-group>
      <rell-checkbox value="enabled1">Enabled Option 1</rell-checkbox>
      <rell-checkbox value="enabled2" checked>Enabled Option 2</rell-checkbox>
      <rell-checkbox value="disabled" disabled>Disabled Option</rell-checkbox>
    </rell-checkbox-group>
  `,
};

