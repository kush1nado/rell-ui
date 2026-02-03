import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'rell-dropdown',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
      description: 'Dropdown position',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Trigger type',
    },
    closable: {
      control: 'boolean',
      description: 'Close on item click',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Open Menu</rell-button>
        <button class="dropdown-item">Profile</button>
        <button class="dropdown-item">Settings</button>
        <button class="dropdown-item">Logout</button>
      </rell-dropdown>
    </div>
  `,
};

export const WithDividers: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Menu with Dividers</rell-button>
        <button class="dropdown-item">New File</button>
        <button class="dropdown-item">Open</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item">Save</button>
        <button class="dropdown-item">Save As</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item">Exit</button>
      </rell-dropdown>
    </div>
  `,
};

export const WithHeaders: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Menu with Headers</rell-button>
        <div class="dropdown-header">File</div>
        <button class="dropdown-item">New</button>
        <button class="dropdown-item">Open</button>
        <div class="dropdown-divider"></div>
        <div class="dropdown-header">Edit</div>
        <button class="dropdown-item">Cut</button>
        <button class="dropdown-item">Copy</button>
        <button class="dropdown-item">Paste</button>
      </rell-dropdown>
    </div>
  `,
};

export const WithDangerItems: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Menu with Danger</rell-button>
        <button class="dropdown-item">Edit</button>
        <button class="dropdown-item">Duplicate</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item danger">Delete</button>
      </rell-dropdown>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Menu with Disabled</rell-button>
        <button class="dropdown-item">Available</button>
        <button class="dropdown-item disabled">Disabled</button>
        <button class="dropdown-item">Another Available</button>
      </rell-dropdown>
    </div>
  `,
};

export const Positions: Story = {
  render: () => `
    <div style="padding: 6rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <rell-dropdown position="top" trigger="click">
        <rell-button variant="primary" slot="trigger">Top</rell-button>
        <button class="dropdown-item">Item 1</button>
        <button class="dropdown-item">Item 2</button>
      </rell-dropdown>
      
      <div style="display: flex; gap: 2rem;">
        <rell-dropdown position="left" trigger="click">
          <rell-button variant="primary" slot="trigger">Left</rell-button>
          <button class="dropdown-item">Item 1</button>
          <button class="dropdown-item">Item 2</button>
        </rell-dropdown>
        
        <rell-dropdown position="right" trigger="click">
          <rell-button variant="primary" slot="trigger">Right</rell-button>
          <button class="dropdown-item">Item 1</button>
          <button class="dropdown-item">Item 2</button>
        </rell-dropdown>
      </div>
      
      <rell-dropdown position="bottom" trigger="click">
        <rell-button variant="primary" slot="trigger">Bottom</rell-button>
        <button class="dropdown-item">Item 1</button>
        <button class="dropdown-item">Item 2</button>
      </rell-dropdown>
    </div>
  `,
};

export const HoverTrigger: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="hover">
        <rell-button variant="primary" slot="trigger">Hover me</rell-button>
        <button class="dropdown-item">Item 1</button>
        <button class="dropdown-item">Item 2</button>
        <button class="dropdown-item">Item 3</button>
      </rell-dropdown>
    </div>
  `,
};

export const WithItems: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <rell-dropdown trigger="click">
        <rell-button variant="primary" slot="trigger">Menu with Items</rell-button>
        <rell-item clickable>
          <span slot="title">Profile</span>
          <span slot="description">View your profile</span>
        </rell-item>
        <rell-item clickable>
          <span slot="title">Settings</span>
          <span slot="description">Manage settings</span>
        </rell-item>
        <rell-item clickable>
          <span slot="title">Logout</span>
        </rell-item>
      </rell-dropdown>
    </div>
  `,
};

