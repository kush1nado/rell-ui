import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Slider',
  component: 'rell-slider',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Slider value',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    'show-value': {
      control: 'boolean',
      description: 'Show value tooltip',
    },
    marks: {
      control: 'boolean',
      description: 'Show marks',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-slider value="50"></rell-slider>`,
};

export const WithValue: Story = {
  render: () => `<rell-slider value="75" show-value></rell-slider>`,
};

export const WithMarks: Story = {
  render: () => `<rell-slider value="50" marks min="0" max="100"></rell-slider>`,
};

export const CustomRange: Story = {
  render: () => `<rell-slider value="25" min="0" max="200" step="5" show-value></rell-slider>`,
};

export const Disabled: Story = {
  render: () => `<rell-slider value="50" disabled></rell-slider>`,
};

export const Steps: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="caption" color="secondary">Step: 1</rell-typography>
        <rell-slider value="50" step="1" show-value></rell-slider>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">Step: 10</rell-typography>
        <rell-slider value="50" step="10" show-value></rell-slider>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">Step: 25</rell-typography>
        <rell-slider value="50" step="25" show-value></rell-slider>
      </div>
    </rell-stack>
  `,
};

