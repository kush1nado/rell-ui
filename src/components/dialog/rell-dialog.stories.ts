import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'rell-dialog',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Open dialog',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Dialog size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const dialog = document.createElement('rell-dialog');
    dialog.setAttribute('open', '');
    dialog.setAttribute('closable', '');
    dialog.innerHTML = `
      <span slot="title">Dialog Title</span>
      <rell-typography variant="body">
        This is a basic dialog component. You can add any content here.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="primary">Confirm</rell-button>
      </div>
    `;
    return dialog;
  },
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Small</rell-typography>
        <rell-dialog open size="sm" closable>
          <span slot="title">Small Dialog</span>
          <rell-typography variant="body">Small dialog content</rell-typography>
        </rell-dialog>
      </div>
      <div>
        <rell-typography variant="h4">Medium</rell-typography>
        <rell-dialog open size="md" closable>
          <span slot="title">Medium Dialog</span>
          <rell-typography variant="body">Medium dialog content</rell-typography>
        </rell-dialog>
      </div>
      <div>
        <rell-typography variant="h4">Large</rell-typography>
        <rell-dialog open size="lg" closable>
          <span slot="title">Large Dialog</span>
          <rell-typography variant="body">Large dialog content</rell-typography>
        </rell-dialog>
      </div>
    </rell-stack>
  `,
};

export const WithForm: Story = {
  render: () => {
    const dialog = document.createElement('rell-dialog');
    dialog.setAttribute('open', '');
    dialog.setAttribute('closable', '');
    dialog.innerHTML = `
      <span slot="title">Create Account</span>
      <rell-form>
        <rell-stack gap="1rem">
          <rell-input name="name" placeholder="Name" required></rell-input>
          <rell-input name="email" type="email" placeholder="Email" required></rell-input>
          <rell-input name="password" type="password" placeholder="Password" required></rell-input>
        </rell-stack>
      </rell-form>
      <div slot="footer">
        <rell-button variant="ghost">Cancel</rell-button>
        <rell-button variant="primary">Create</rell-button>
      </div>
    `;
    return dialog;
  },
};

export const WithoutClose: Story = {
  render: () => {
    const dialog = document.createElement('rell-dialog');
    dialog.setAttribute('open', '');
    dialog.innerHTML = `
      <span slot="title">Important Notice</span>
      <rell-typography variant="body">
        This dialog cannot be closed by clicking the backdrop or close button.
        You must use the action buttons.
      </rell-typography>
      <div slot="footer">
        <rell-button variant="primary">I Understand</rell-button>
      </div>
    `;
    return dialog;
  },
};

