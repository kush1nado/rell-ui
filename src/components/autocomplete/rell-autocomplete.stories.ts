import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Autocomplete',
  component: 'rell-autocomplete',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Autocomplete placeholder',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Autocomplete size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    'min-length': {
      control: 'number',
      description: 'Minimum characters to show suggestions',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-autocomplete>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="cherry">Cherry</option>
      <option value="date">Date</option>
      <option value="elderberry">Elderberry</option>
    </rell-autocomplete>
  `,
};

export const WithMinLength: Story = {
  render: () => `
    <rell-autocomplete min-length="2">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </rell-autocomplete>
  `,
};

export const Loading: Story = {
  render: () => `
    <rell-autocomplete loading>
      <option value="option1">Option 1</option>
    </rell-autocomplete>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-autocomplete size="sm" placeholder="Small">
        <option value="1">Option 1</option>
      </rell-autocomplete>
      <rell-autocomplete size="md" placeholder="Medium">
        <option value="1">Option 1</option>
      </rell-autocomplete>
      <rell-autocomplete size="lg" placeholder="Large">
        <option value="1">Option 1</option>
      </rell-autocomplete>
    </rell-stack>
  `,
};

