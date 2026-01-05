import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'rell-drawer',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Open state',
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer position',
    },
    width: {
      control: 'text',
      description: 'Drawer width (or height for top/bottom)',
    },
    overlay: {
      control: 'boolean',
      description: 'Show overlay',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Left: Story = {
  render: () => `
    <rell-drawer open position="left" overlay>
      <div slot="header">
        <rell-typography variant="h3">Menu</rell-typography>
      </div>
      <rell-typography variant="body">Drawer content goes here</rell-typography>
      <div slot="footer">
        <rell-button variant="primary">Save</rell-button>
      </div>
    </rell-drawer>
    <script>
      setTimeout(() => {
        const drawer = document.querySelector('rell-drawer');
        if (drawer) {
          drawer.addEventListener('close', () => {
            console.log('Drawer closed');
          });
        }
      }, 100);
    </script>
  `,
};

export const Right: Story = {
  render: () => `
    <rell-drawer open position="right" overlay>
      <div slot="header">
        <rell-typography variant="h3">Settings</rell-typography>
      </div>
      <rell-typography variant="body">Settings content</rell-typography>
    </rell-drawer>
  `,
};

export const Top: Story = {
  render: () => `
    <rell-drawer open position="top" width="300px" overlay>
      <div slot="header">
        <rell-typography variant="h3">Top Drawer</rell-typography>
      </div>
      <rell-typography variant="body">Content from top</rell-typography>
    </rell-drawer>
  `,
};

export const Bottom: Story = {
  render: () => `
    <rell-drawer open position="bottom" width="400px" overlay>
      <div slot="header">
        <rell-typography variant="h3">Bottom Drawer</rell-typography>
      </div>
      <rell-typography variant="body">Content from bottom</rell-typography>
    </rell-drawer>
  `,
};

export const WithoutOverlay: Story = {
  render: () => `
    <rell-drawer open position="left">
      <div slot="header">
        <rell-typography variant="h3">No Overlay</rell-typography>
      </div>
      <rell-typography variant="body">Drawer without overlay</rell-typography>
    </rell-drawer>
  `,
};

export const WithContent: Story = {
  render: () => `
    <rell-drawer open position="right" width="400px" overlay>
      <div slot="header">
        <rell-typography variant="h3">User Profile</rell-typography>
      </div>
      <rell-stack gap="1rem">
        <rell-avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="xl" fallback="JD"></rell-avatar>
        <rell-typography variant="h4">John Doe</rell-typography>
        <rell-typography variant="body" color="secondary">john.doe@example.com</rell-typography>
        <rell-divider></rell-divider>
        <rell-button variant="primary" full-width>Edit Profile</rell-button>
      </rell-stack>
      <div slot="footer">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="primary">Save</rell-button>
      </div>
    </rell-drawer>
  `,
};

