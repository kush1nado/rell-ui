import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'rell-skeleton',
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Skeleton width',
    },
    height: {
      control: 'text',
      description: 'Skeleton height',
    },
    variant: {
      control: 'select',
      options: ['rect', 'circle', 'text'],
      description: 'Skeleton variant',
    },
    animated: {
      control: 'boolean',
      description: 'Animated skeleton',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => `<rell-skeleton></rell-skeleton>`,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-skeleton variant="rect" width="100%" height="100px"></rell-skeleton>
      <rell-skeleton variant="circle" width="60px" height="60px"></rell-skeleton>
      <rell-skeleton variant="text" width="100%" height="1rem"></rell-skeleton>
      <rell-skeleton variant="text" width="80%" height="1rem"></rell-skeleton>
      <rell-skeleton variant="text" width="60%" height="1rem"></rell-skeleton>
    </rell-stack>
  `,
};

export const Animated: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-skeleton animated width="100%" height="100px"></rell-skeleton>
      <rell-skeleton animated variant="circle" width="60px" height="60px"></rell-skeleton>
      <rell-skeleton animated variant="text" width="100%" height="1rem"></rell-skeleton>
      <rell-skeleton animated variant="text" width="80%" height="1rem"></rell-skeleton>
    </rell-stack>
  `,
};

export const CardSkeleton: Story = {
  render: () => `
    <rell-card style="max-width: 400px;">
      <rell-stack gap="1rem">
        <rell-skeleton animated variant="circle" width="48px" height="48px"></rell-skeleton>
        <rell-skeleton animated variant="text" width="100%" height="1.5rem"></rell-skeleton>
        <rell-skeleton animated variant="text" width="100%" height="1rem"></rell-skeleton>
        <rell-skeleton animated variant="text" width="80%" height="1rem"></rell-skeleton>
        <rell-skeleton animated variant="rect" width="100%" height="200px"></rell-skeleton>
      </rell-stack>
    </rell-card>
  `,
};

export const ListSkeleton: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-skeleton animated variant="rect" width="100%" height="60px"></rell-skeleton>
      <rell-skeleton animated variant="rect" width="100%" height="60px"></rell-skeleton>
      <rell-skeleton animated variant="rect" width="100%" height="60px"></rell-skeleton>
      <rell-skeleton animated variant="rect" width="100%" height="60px"></rell-skeleton>
    </rell-stack>
  `,
};

