import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/Section',
  component: 'rell-section',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-section>
      <rell-typography variant="h2">Section Title</rell-typography>
      <rell-typography>This is a default section with primary background.</rell-typography>
    </rell-section>
  `,
};

export const Secondary: Story = {
  render: () => `
    <rell-section variant="secondary">
      <rell-typography variant="h2">Secondary Section</rell-typography>
      <rell-typography>This section has a secondary background.</rell-typography>
    </rell-section>
  `,
};

export const Gradient: Story = {
  render: () => `
    <rell-section variant="gradient">
      <rell-typography variant="h2">Gradient Section</rell-typography>
      <rell-typography>This section has a gradient background.</rell-typography>
    </rell-section>
  `,
};

export const CustomBackground: Story = {
  render: () => `
    <rell-section background="linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta))">
      <rell-typography variant="h2" color="primary">Custom Background</rell-typography>
      <rell-typography color="primary">This section has a custom gradient background.</rell-typography>
    </rell-section>
  `,
};

export const WithOverflow: Story = {
  render: () => `
    <rell-section overflow="hidden" padding="1rem">
      <rell-typography variant="h2">Overflow Hidden</rell-typography>
      <rell-typography>This section has overflow hidden. Content that exceeds the boundaries will be clipped.</rell-typography>
    </rell-section>
  `,
};

export const WithPosition: Story = {
  render: () => `
    <rell-section position="relative" z-index="10">
      <rell-typography variant="h2">Positioned Section</rell-typography>
      <rell-typography>This section has relative positioning with z-index.</rell-typography>
    </rell-section>
  `,
};

export const CustomPadding: Story = {
  render: () => `
    <rell-section padding="3rem">
      <rell-typography variant="h2">Custom Padding</rell-typography>
      <rell-typography>This section has custom padding of 3rem.</rell-typography>
    </rell-section>
  `,
};

