import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/SplitButton',
  component: 'rell-split-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-split-button>
      <rell-button slot="button" variant="primary">Save</rell-button>
      <div slot="menu">
        <div class="split-button-item">Save As...</div>
        <div class="split-button-item">Save All</div>
        <div class="split-button-item disabled">Export</div>
        <div class="split-button-item danger">Delete</div>
      </div>
    </rell-split-button>
  `,
};

export const Secondary: Story = {
  render: () => `
    <rell-split-button variant="secondary">
      <rell-button slot="button" variant="secondary">Action</rell-button>
      <div slot="menu">
        <div class="split-button-item">Option 1</div>
        <div class="split-button-item">Option 2</div>
        <div class="split-button-item">Option 3</div>
      </div>
    </rell-split-button>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rell-split-button size="sm">
        <rell-button slot="button" variant="primary" size="sm">Small</rell-button>
        <div slot="menu">
          <div class="split-button-item">Option 1</div>
        </div>
      </rell-split-button>
      <rell-split-button size="md">
        <rell-button slot="button" variant="primary" size="md">Medium</rell-button>
        <div slot="menu">
          <div class="split-button-item">Option 1</div>
        </div>
      </rell-split-button>
      <rell-split-button size="lg">
        <rell-button slot="button" variant="primary" size="lg">Large</rell-button>
        <div slot="menu">
          <div class="split-button-item">Option 1</div>
        </div>
      </rell-split-button>
    </div>
  `,
};

