import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Backdrop',
  component: 'rell-backdrop',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Show backdrop',
    },
    blur: {
      control: 'text',
      description: 'Blur amount',
    },
    'z-index': {
      control: 'text',
      description: 'Z-index value',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const backdrop = document.createElement('rell-backdrop');
    backdrop.setAttribute('open', '');
    backdrop.innerHTML = `
      <rell-card style="max-width: 400px;">
        <rell-typography variant="h3">Backdrop Content</rell-typography>
        <rell-typography variant="body" color="secondary">
          This content is displayed on top of the backdrop.
        </rell-typography>
      </rell-card>
    `;
    return backdrop;
  },
};

export const WithBlur: Story = {
  render: () => {
    const backdrop = document.createElement('rell-backdrop');
    backdrop.setAttribute('open', '');
    backdrop.setAttribute('blur', '8px');
    backdrop.innerHTML = `
      <rell-card style="max-width: 400px;">
        <rell-typography variant="h3">Blurred Backdrop</rell-typography>
        <rell-typography variant="body" color="secondary">
          This backdrop has a blur effect applied.
        </rell-typography>
      </rell-card>
    `;
    return backdrop;
  },
};

export const Interactive: Story = {
  render: () => {
    const backdrop = document.createElement('rell-backdrop');
    backdrop.setAttribute('open', '');
    backdrop.innerHTML = `
      <rell-card style="max-width: 400px;">
        <rell-typography variant="h3">Clickable Backdrop</rell-typography>
        <rell-typography variant="body" color="secondary">
          Click outside to close (check console).
        </rell-typography>
      </rell-card>
    `;
    backdrop.addEventListener('backdrop-click', () => {
      console.log('Backdrop clicked');
    });
    return backdrop;
  },
};

