import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Select',
  component: 'rell-select',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value(s)',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </rell-select>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select value="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </rell-select>
    </div>
  `,
};

export const Multiple: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </rell-select>
    </div>
  `,
};

export const MultipleWithValues: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select multiple value='["2","4"]'>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </rell-select>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-select size="sm">
        <option value="1">Small select</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select size="md">
        <option value="1">Medium select</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select size="lg">
        <option value="1">Large select</option>
        <option value="2">Option 2</option>
      </rell-select>
    </div>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-select>
        <option value="1">Normal state</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select disabled>
        <option value="1">Disabled state</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select error>
        <option value="1">Error state</option>
        <option value="2">Option 2</option>
      </rell-select>
    </div>
  `,
};

export const WithPlaceholder: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select placeholder="Choose your option...">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </rell-select>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 300px;">
      <rell-typography variant="caption" color="secondary">Choose an option</rell-typography>
      <rell-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </rell-select>
    </div>
  `,
};

export const MultipleWithManyOptions: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-select multiple placeholder="Select multiple options...">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
        <option value="solid">Solid</option>
        <option value="lit">Lit</option>
        <option value="preact">Preact</option>
      </rell-select>
    </div>
  `,
};
