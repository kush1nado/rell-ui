import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Select',
  component: 'rell-select',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Выбранное значение',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли селект',
    },
    error: {
      control: 'boolean',
      description: 'Есть ли ошибка',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер селекта',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select>
        <option value="">Select an option...</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </rell-select>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-select value="2">
        <option value="">Select an option...</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </rell-select>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-select size="sm">
        <option value="">Small select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select size="md">
        <option value="">Medium select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select size="lg">
        <option value="">Large select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
    </div>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-select>
        <option value="">Normal state</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select disabled>
        <option value="">Disabled state</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
      <rell-select error>
        <option value="">Error state</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </rell-select>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 300px;">
      <rell-typography variant="caption" color="secondary">Choose an option</rell-typography>
      <rell-select>
        <option value="">Select...</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="neon">Neon</option>
        <option value="digital">Digital</option>
        <option value="future">Future</option>
      </rell-select>
    </div>
  `,
};
