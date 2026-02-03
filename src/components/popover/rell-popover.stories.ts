import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Popover',
  component: 'rell-popover',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Popover position',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Trigger type',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="click">
        <rell-button variant="primary" slot="trigger">Click me</rell-button>
        <div slot="title">Popover Title</div>
        <div>This is the popover content. You can put any content here.</div>
      </rell-popover>
    </div>
  `,
};

export const Positions: Story = {
  render: () => `
    <div style="padding: 6rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <rell-popover position="top" trigger="click">
        <rell-button variant="primary" slot="trigger">Top</rell-button>
        <div>Popover on top</div>
      </rell-popover>
      
      <div style="display: flex; gap: 2rem;">
        <rell-popover position="left" trigger="click">
          <rell-button variant="primary" slot="trigger">Left</rell-button>
          <div>Popover on left</div>
        </rell-popover>
        
        <rell-popover position="right" trigger="click">
          <rell-button variant="primary" slot="trigger">Right</rell-button>
          <div>Popover on right</div>
        </rell-popover>
      </div>
      
      <rell-popover position="bottom" trigger="click">
        <rell-button variant="primary" slot="trigger">Bottom</rell-button>
        <div>Popover on bottom</div>
      </rell-popover>
    </div>
  `,
};

export const WithHeader: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="click" closable>
        <rell-button variant="primary" slot="trigger">Open Popover</rell-button>
        <div slot="title">Popover with Header</div>
        <div>This popover has a header with a title and close button.</div>
      </rell-popover>
    </div>
  `,
};

export const WithFooter: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="click" closable>
        <rell-button variant="primary" slot="trigger">Open Popover</rell-button>
        <div slot="title">Popover with Footer</div>
        <div>This popover has a footer with action buttons.</div>
        <div slot="footer">
          <rell-button variant="ghost" size="sm">Cancel</rell-button>
          <rell-button variant="primary" size="sm">Confirm</rell-button>
        </div>
      </rell-popover>
    </div>
  `,
};

export const HoverTrigger: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="hover">
        <rell-button variant="primary" slot="trigger">Hover me</rell-button>
        <div slot="title">Hover Popover</div>
        <div>This popover opens on hover instead of click.</div>
      </rell-popover>
    </div>
  `,
};

export const WithoutArrow: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="click" arrow="false">
        <rell-button variant="primary" slot="trigger">No Arrow</rell-button>
        <div>This popover doesn't have an arrow.</div>
      </rell-popover>
    </div>
  `,
};

export const RichContent: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-popover trigger="click" closable>
        <rell-button variant="primary" slot="trigger">Rich Content</rell-button>
        <div slot="title">Rich Content Popover</div>
        <div>
          <p>This popover contains rich content with multiple elements.</p>
          <rell-divider></rell-divider>
          <rell-item clickable>
            <span slot="title">Item 1</span>
            <span slot="description">Description for item 1</span>
          </rell-item>
          <rell-item clickable>
            <span slot="title">Item 2</span>
            <span slot="description">Description for item 2</span>
          </rell-item>
        </div>
      </rell-popover>
    </div>
  `,
};

