import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ContextMenu',
  component: 'rell-context-menu',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-context-menu>
      <div style="padding: 4rem; background: var(--rell-surface-elevated); border-radius: 8px; text-align: center;">
        <p>Right-click anywhere in this area to open context menu</p>
      </div>
      <div slot="menu">
        <div class="context-menu-item">Copy</div>
        <div class="context-menu-item">Cut</div>
        <div class="context-menu-item">Paste</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item">Select All</div>
        <div class="context-menu-item disabled">Undo</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger">Delete</div>
      </div>
    </rell-context-menu>
  `,
};

export const WithHeader: Story = {
  render: () => `
    <rell-context-menu>
      <div style="padding: 4rem; background: var(--rell-surface-elevated); border-radius: 8px; text-align: center;">
        <p>Right-click to open menu</p>
      </div>
      <div slot="menu">
        <div class="context-menu-header">Edit</div>
        <div class="context-menu-item">Copy</div>
        <div class="context-menu-item">Cut</div>
        <div class="context-menu-item">Paste</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-header">View</div>
        <div class="context-menu-item">Zoom In</div>
        <div class="context-menu-item">Zoom Out</div>
      </div>
    </rell-context-menu>
  `,
};

