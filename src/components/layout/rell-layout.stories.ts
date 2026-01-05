import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Layout',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const BasicLayout: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <rell-header>
        <rell-typography variant="h3">Header</rell-typography>
      </rell-header>
      <rell-body>
        <rell-typography variant="body">Main content goes here</rell-typography>
      </rell-body>
      <rell-footer>
        <rell-typography variant="caption" color="secondary">Footer</rell-typography>
      </rell-footer>
    </div>
  `,
};

export const StickyHeader: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <rell-header sticky>
        <rell-typography variant="h3">Sticky Header</rell-typography>
      </rell-header>
      <rell-body>
        <div style="height: 200vh;">
          <rell-typography variant="body">Scroll to see sticky header</rell-typography>
        </div>
      </rell-body>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <rell-header variant="elevated">
        <rell-typography variant="h3">Elevated Header</rell-typography>
      </rell-header>
      <rell-body variant="secondary">
        <rell-typography variant="body">Secondary body background</rell-typography>
      </rell-body>
      <rell-footer variant="elevated">
        <rell-typography variant="caption" color="secondary">Elevated Footer</rell-typography>
      </rell-footer>
    </div>
  `,
};

export const WithMaxWidth: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <rell-header>
        <rell-typography variant="h3">Header</rell-typography>
      </rell-header>
      <rell-body max-width="1200px">
        <rell-typography variant="body">Content with max width</rell-typography>
      </rell-body>
      <rell-footer>
        <rell-typography variant="caption" color="secondary">Footer</rell-typography>
      </rell-footer>
    </div>
  `,
};

