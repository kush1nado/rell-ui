import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Resizable',
  component: 'rell-resizable',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description: 'Resize direction',
    },
    'min-width': {
      control: 'number',
      description: 'Minimum width in pixels',
    },
    'min-height': {
      control: 'number',
      description: 'Minimum height in pixels',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => `
    <rell-resizable direction="horizontal" min-width="200" max-width="800" style="width: 400px; height: 200px;">
      <div style="padding: 2rem; background: var(--rell-surface-elevated); border-radius: 8px; height: 100%;">
        <h3>Resizable Box</h3>
        <p>Drag the right edge to resize horizontally</p>
      </div>
    </rell-resizable>
  `,
};

export const Vertical: Story = {
  render: () => `
    <rell-resizable direction="vertical" min-height="150" max-height="500" style="width: 400px; height: 200px;">
      <div style="padding: 2rem; background: var(--rell-surface-elevated); border-radius: 8px; height: 100%;">
        <h3>Resizable Box</h3>
        <p>Drag the bottom edge to resize vertically</p>
      </div>
    </rell-resizable>
  `,
};

export const Both: Story = {
  render: () => `
    <rell-resizable direction="both" min-width="200" min-height="150" style="width: 400px; height: 200px;">
      <div style="padding: 2rem; background: var(--rell-surface-elevated); border-radius: 8px; height: 100%;">
        <h3>Resizable Box</h3>
        <p>Drag any edge or corner to resize</p>
      </div>
    </rell-resizable>
  `,
};

export const WithLimits: Story = {
  render: () => `
    <rell-resizable direction="both" min-width="200" min-height="150" max-width="600" max-height="400" style="width: 400px; height: 200px;">
      <div style="padding: 2rem; background: var(--rell-surface-elevated); border-radius: 8px; height: 100%;">
        <h3>Resizable Box</h3>
        <p>This box has min/max limits. Try resizing to see them.</p>
      </div>
    </rell-resizable>
  `,
};

