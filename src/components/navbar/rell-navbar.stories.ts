import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navbar',
  component: 'rell-navbar',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'transparent'],
      description: 'Navbar variant',
    },
    sticky: {
      control: 'boolean',
      description: 'Sticky navbar',
    },
    height: {
      control: 'text',
      description: 'Navbar height',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-navbar>
      <div slot="start">
        <rell-typography variant="h4">Logo</rell-typography>
      </div>
      <div slot="center">
        <rell-button variant="ghost">Home</rell-button>
        <rell-button variant="ghost">About</rell-button>
        <rell-button variant="ghost">Contact</rell-button>
      </div>
      <div slot="end">
        <rell-button variant="primary">Sign In</rell-button>
      </div>
    </rell-navbar>
  `,
};

export const Sticky: Story = {
  render: () => `
    <rell-navbar sticky>
      <div slot="start">
        <rell-typography variant="h4">Logo</rell-typography>
      </div>
      <div slot="center">
        <rell-button variant="ghost">Home</rell-button>
        <rell-button variant="ghost">About</rell-button>
      </div>
      <div slot="end">
        <rell-avatar fallback="JD"></rell-avatar>
      </div>
    </rell-navbar>
    <rell-box padding="2rem" style="height: 200vh;">
      <rell-typography variant="body">Scroll to see sticky navbar</rell-typography>
    </rell-box>
  `,
};

export const Elevated: Story = {
  render: () => `
    <rell-navbar variant="elevated">
      <div slot="start">
        <rell-typography variant="h4">Logo</rell-typography>
      </div>
      <div slot="center">
        <rell-button variant="ghost">Home</rell-button>
        <rell-button variant="ghost">About</rell-button>
      </div>
      <div slot="end">
        <rell-button variant="primary">Get Started</rell-button>
      </div>
    </rell-navbar>
  `,
};

export const WithAvatar: Story = {
  render: () => `
    <rell-navbar>
      <div slot="start">
        <rell-typography variant="h4">Logo</rell-typography>
      </div>
      <div slot="end">
        <rell-avatar src="https://i.pravatar.cc/150?img=1" alt="User" fallback="JD">
          <rell-badge slot="badge" variant="success" dot></rell-badge>
        </rell-avatar>
      </div>
    </rell-navbar>
  `,
};

