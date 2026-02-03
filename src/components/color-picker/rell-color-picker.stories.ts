import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ColorPicker',
  component: 'rell-color-picker',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'color',
      description: 'Selected color value',
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb'],
      description: 'Color format',
    },
    'show-alpha': {
      control: 'boolean',
      description: 'Show alpha channel',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-color-picker value="#00ffff"></rell-color-picker>
  `,
};

export const CustomColor: Story = {
  render: () => `
    <rell-color-picker value="#ff00ff"></rell-color-picker>
  `,
};

export const WithPresets: Story = {
  render: () => {
    const presets = [
      '#00ffff', '#ff00ff', '#ffff00', '#00ff00',
      '#ff0000', '#0000ff', '#ffffff', '#000000'
    ].join(',');
    return `
      <rell-color-picker value="#00ffff" presets="${presets}"></rell-color-picker>
    `;
  },
};

export const Multiple: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <rell-color-picker value="#00ffff"></rell-color-picker>
      <rell-color-picker value="#ff00ff"></rell-color-picker>
      <rell-color-picker value="#ffff00"></rell-color-picker>
    </div>
  `,
};

