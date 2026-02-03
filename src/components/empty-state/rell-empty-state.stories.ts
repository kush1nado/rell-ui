import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/EmptyState',
  component: 'rell-empty-state',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Empty state variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Empty state size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-empty-state>
      <rell-svg slot="icon" name="folder" size="64"></rell-svg>
      <h3 slot="title">No items found</h3>
      <p slot="description">There are no items to display. Try adjusting your filters or add a new item.</p>
      <rell-button slot="action" variant="primary">Add Item</rell-button>
    </rell-empty-state>
  `,
};

export const WithCustomIcon: Story = {
  render: () => `
    <rell-empty-state>
      <rell-svg slot="icon" name="search" size="64"></rell-svg>
      <h3 slot="title">No results</h3>
      <p slot="description">We couldn't find anything matching your search. Try different keywords.</p>
    </rell-empty-state>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <rell-empty-state size="sm">
        <h3 slot="title">Small</h3>
        <p slot="description">Small empty state</p>
      </rell-empty-state>
      <rell-empty-state size="md">
        <h3 slot="title">Medium</h3>
        <p slot="description">Medium empty state</p>
      </rell-empty-state>
      <rell-empty-state size="lg">
        <h3 slot="title">Large</h3>
        <p slot="description">Large empty state</p>
      </rell-empty-state>
    </div>
  `,
};

