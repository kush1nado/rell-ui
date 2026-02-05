import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Layout/Background',
  component: 'rell-background',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background variant="grid"></rell-background>
      <rell-typography variant="h2">Grid Pattern Background</rell-typography>
      <rell-typography>This background uses a grid pattern.</rell-typography>
    </div>
  `,
};

export const Dots: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background pattern="dots"></rell-background>
      <rell-typography variant="h2">Dots Pattern Background</rell-typography>
      <rell-typography>This background uses a dots pattern.</rell-typography>
    </div>
  `,
};

export const Lines: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background pattern="lines"></rell-background>
      <rell-typography variant="h2">Lines Pattern Background</rell-typography>
      <rell-typography>This background uses a lines pattern.</rell-typography>
    </div>
  `,
};

export const Gradient: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background gradient="cyan-magenta"></rell-background>
      <rell-typography variant="h2">Gradient Background</rell-typography>
      <rell-typography>This background uses a gradient overlay.</rell-typography>
    </div>
  `,
};

export const GradientWithPattern: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background pattern="grid" gradient="cyan-magenta-pink" opacity="0.8"></rell-background>
      <rell-typography variant="h2">Gradient + Pattern</rell-typography>
      <rell-typography>This background combines a gradient with a grid pattern.</rell-typography>
    </div>
  `,
};

export const WithBlur: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem; background: linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta));">
      <rell-background blur="10px" opacity="0.5"></rell-background>
      <rell-typography variant="h2" color="primary">Blur Effect</rell-typography>
      <rell-typography color="primary">This background has a blur effect applied.</rell-typography>
    </div>
  `,
};

export const CustomOpacity: Story = {
  render: () => `
    <div style="position: relative; width: 100%; height: 400px; padding: 2rem;">
      <rell-background pattern="dots" opacity="0.3"></rell-background>
      <rell-typography variant="h2">Low Opacity Pattern</rell-typography>
      <rell-typography>This background has reduced opacity for a subtle effect.</rell-typography>
    </div>
  `,
};

