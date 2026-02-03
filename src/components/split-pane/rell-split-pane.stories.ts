import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/SplitPane',
  component: 'rell-split-pane',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Split orientation',
    },
    split: {
      control: 'number',
      description: 'Split percentage',
    },
    min: {
      control: 'number',
      description: 'Minimum split percentage',
    },
    max: {
      control: 'number',
      description: 'Maximum split percentage',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => `
    <rell-split-pane orientation="horizontal" split="50" style="height: 400px;">
      <div slot="pane1" style="padding: 2rem; background: var(--rell-surface-elevated);">
        <h3>Left Pane</h3>
        <p>This is the left pane content. You can resize by dragging the divider.</p>
      </div>
      <div slot="pane2" style="padding: 2rem; background: var(--rell-bg-secondary);">
        <h3>Right Pane</h3>
        <p>This is the right pane content. Drag the divider to resize.</p>
      </div>
    </rell-split-pane>
  `,
};

export const Vertical: Story = {
  render: () => `
    <rell-split-pane orientation="vertical" split="40" style="height: 400px;">
      <div slot="pane1" style="padding: 2rem; background: var(--rell-surface-elevated);">
        <h3>Top Pane</h3>
        <p>This is the top pane content.</p>
      </div>
      <div slot="pane2" style="padding: 2rem; background: var(--rell-bg-secondary);">
        <h3>Bottom Pane</h3>
        <p>This is the bottom pane content.</p>
      </div>
    </rell-split-pane>
  `,
};

export const WithLimits: Story = {
  render: () => `
    <rell-split-pane orientation="horizontal" split="50" min="20" max="80" style="height: 400px;">
      <div slot="pane1" style="padding: 2rem; background: var(--rell-surface-elevated);">
        <h3>Left Pane</h3>
        <p>This pane has min 20% and max 80% limits.</p>
      </div>
      <div slot="pane2" style="padding: 2rem; background: var(--rell-bg-secondary);">
        <h3>Right Pane</h3>
        <p>Try dragging the divider to see the limits.</p>
      </div>
    </rell-split-pane>
  `,
};

