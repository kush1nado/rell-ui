import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Modal',
  component: 'rell-modal',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Open modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    'close-on-backdrop': {
      control: 'boolean',
      description: 'Close on backdrop click',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const modal = document.createElement('rell-modal');
    modal.setAttribute('open', '');
    modal.setAttribute('closable', '');
    modal.setAttribute('close-on-backdrop', '');
    modal.innerHTML = `
      <span slot="title">Modal Title</span>
      <rell-typography variant="body">
        This is a modal component. It's similar to dialog but with more emphasis.
      </rell-typography>
      <rell-typography variant="body" color="secondary">
        You can add any content here. Modals are typically used for important actions
        that require user attention.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="primary">Confirm</rell-button>
      </div>
    `;
    return modal;
  },
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Small</rell-typography>
        <rell-modal open size="sm" closable close-on-backdrop>
          <span slot="title">Small Modal</span>
          <rell-typography variant="body">Small modal content</rell-typography>
        </rell-modal>
      </div>
      <div>
        <rell-typography variant="h4">Medium</rell-typography>
        <rell-modal open size="md" closable close-on-backdrop>
          <span slot="title">Medium Modal</span>
          <rell-typography variant="body">Medium modal content</rell-typography>
        </rell-modal>
      </div>
      <div>
        <rell-typography variant="h4">Large</rell-typography>
        <rell-modal open size="lg" closable close-on-backdrop>
          <span slot="title">Large Modal</span>
          <rell-typography variant="body">Large modal content</rell-typography>
        </rell-modal>
      </div>
    </rell-stack>
  `,
};

export const WithContent: Story = {
  render: () => {
    const modal = document.createElement('rell-modal');
    modal.setAttribute('open', '');
    modal.setAttribute('closable', '');
    modal.setAttribute('close-on-backdrop', '');
    modal.innerHTML = `
      <span slot="title">Delete Item</span>
      <rell-stack gap="1rem">
        <rell-typography variant="body">
          Are you sure you want to delete this item? This action cannot be undone.
        </rell-typography>
        <rell-alert type="warning" variant="outlined">
          This will permanently delete the item and all associated data.
        </rell-alert>
      </rell-stack>
      <div slot="footer">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="error">Delete</rell-button>
      </div>
    `;
    return modal;
  },
};

export const WithoutBackdropClose: Story = {
  render: () => {
    const modal = document.createElement('rell-modal');
    modal.setAttribute('open', '');
    modal.setAttribute('closable', '');
    modal.innerHTML = `
      <span slot="title">Important Action</span>
      <rell-typography variant="body">
        This modal cannot be closed by clicking the backdrop. You must use the close button
        or action buttons.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="primary">Continue</rell-button>
      </div>
    `;
    return modal;
  },
};

export const FullScreen: Story = {
  render: () => {
    const modal = document.createElement('rell-modal');
    modal.setAttribute('open', '');
    modal.setAttribute('closable', '');
    modal.setAttribute('size', 'full');
    modal.innerHTML = `
      <span slot="title">Full Screen Modal</span>
      <rell-typography variant="body">
        This is a full-screen modal that takes up the entire viewport.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="primary">Close</rell-button>
      </div>
    `;
    return modal;
  },
};

