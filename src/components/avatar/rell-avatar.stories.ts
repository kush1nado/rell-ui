import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'rell-avatar',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    variant: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text when image fails',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-avatar fallback="JD"></rell-avatar>`,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack direction="horizontal" align="center" gap="1rem">
      <rell-avatar size="sm" fallback="S"></rell-avatar>
      <rell-avatar size="md" fallback="M"></rell-avatar>
      <rell-avatar size="lg" fallback="L"></rell-avatar>
      <rell-avatar size="xl" fallback="XL"></rell-avatar>
    </rell-stack>
  `,
};

export const WithImage: Story = {
  render: () => `
    <rell-stack direction="horizontal" align="center" gap="1rem">
      <rell-avatar src="https://i.pravatar.cc/150?img=1" alt="User"></rell-avatar>
      <rell-avatar src="https://i.pravatar.cc/150?img=2" alt="User" size="lg"></rell-avatar>
    </rell-stack>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack direction="horizontal" align="center" gap="1rem">
      <rell-avatar variant="circle" fallback="C"></rell-avatar>
      <rell-avatar variant="square" fallback="S"></rell-avatar>
    </rell-stack>
  `,
};

export const WithBadge: Story = {
  render: () => `
    <rell-stack direction="horizontal" align="center" gap="1rem">
      <rell-avatar fallback="JD">
        <rell-badge slot="badge" variant="success" dot></rell-badge>
      </rell-avatar>
      <rell-avatar fallback="AB" size="lg">
        <rell-badge slot="badge" variant="error">5</rell-badge>
      </rell-avatar>
    </rell-stack>
  `,
};

export const Group: Story = {
  render: () => `
    <rell-stack direction="horizontal" align="center" gap="-0.5rem">
      <rell-avatar fallback="A" size="sm" style="margin-left: -0.5rem;"></rell-avatar>
      <rell-avatar fallback="B" size="sm" style="margin-left: -0.5rem;"></rell-avatar>
      <rell-avatar fallback="C" size="sm" style="margin-left: -0.5rem;"></rell-avatar>
      <rell-avatar fallback="+3" size="sm" style="margin-left: -0.5rem;"></rell-avatar>
    </rell-stack>
  `,
};

