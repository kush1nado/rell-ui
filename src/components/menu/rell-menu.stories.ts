import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Menu',
  component: 'rell-menu',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Menu variant',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Menu orientation',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => `
    <rell-menu>
      <rell-menu-item active>Home</rell-menu-item>
      <rell-menu-item>About</rell-menu-item>
      <rell-menu-item>Services</rell-menu-item>
      <rell-menu-divider></rell-menu-divider>
      <rell-menu-item>Contact</rell-menu-item>
      <rell-menu-item disabled>Settings</rell-menu-item>
    </rell-menu>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-menu orientation="horizontal">
      <rell-menu-item active>Home</rell-menu-item>
      <rell-menu-item>About</rell-menu-item>
      <rell-menu-item>Services</rell-menu-item>
      <rell-menu-divider></rell-menu-divider>
      <rell-menu-item>Contact</rell-menu-item>
    </rell-menu>
  `,
};

export const Outlined: Story = {
  render: () => `
    <rell-menu variant="outlined">
      <rell-menu-item active>Dashboard</rell-menu-item>
      <rell-menu-item>Projects</rell-menu-item>
      <rell-menu-item>Tasks</rell-menu-item>
      <rell-menu-divider></rell-menu-divider>
      <rell-menu-item variant="danger">Delete</rell-menu-item>
    </rell-menu>
  `,
};

