import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Toolbar',
  component: 'rell-toolbar',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
      description: 'Toolbar variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toolbar size',
    },
    dense: {
      control: 'boolean',
      description: 'Dense padding',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-toolbar>
      <rell-button variant="primary" slot="start">New</rell-button>
      <rell-button variant="ghost" slot="start">Open</rell-button>
      <rell-button variant="ghost" slot="end">Save</rell-button>
      <rell-button variant="ghost" slot="end">Export</rell-button>
    </rell-toolbar>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <rell-toolbar>
      <rell-button variant="ghost" slot="start">
        <rell-svg name="menu" size="20"></rell-svg>
      </rell-button>
      <rell-button variant="primary" slot="start">
        <rell-svg name="add" size="20"></rell-svg>
        New
      </rell-button>
      <rell-button variant="ghost" slot="end">
        <rell-svg name="search" size="20"></rell-svg>
      </rell-button>
      <rell-button variant="ghost" slot="end">
        <rell-svg name="settings" size="20"></rell-svg>
      </rell-button>
    </rell-toolbar>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-toolbar variant="default">
        <rell-button variant="primary" slot="start">Default</rell-button>
        <rell-button variant="ghost" slot="end">Action</rell-button>
      </rell-toolbar>
      <rell-toolbar variant="elevated">
        <rell-button variant="primary" slot="start">Elevated</rell-button>
        <rell-button variant="ghost" slot="end">Action</rell-button>
      </rell-toolbar>
      <rell-toolbar variant="outlined">
        <rell-button variant="primary" slot="start">Outlined</rell-button>
        <rell-button variant="ghost" slot="end">Action</rell-button>
      </rell-toolbar>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-toolbar size="sm">
        <rell-button variant="primary" size="sm" slot="start">Small</rell-button>
        <rell-button variant="ghost" size="sm" slot="end">Action</rell-button>
      </rell-toolbar>
      <rell-toolbar size="md">
        <rell-button variant="primary" size="md" slot="start">Medium</rell-button>
        <rell-button variant="ghost" size="md" slot="end">Action</rell-button>
      </rell-toolbar>
      <rell-toolbar size="lg">
        <rell-button variant="primary" size="lg" slot="start">Large</rell-button>
        <rell-button variant="ghost" size="lg" slot="end">Action</rell-button>
      </rell-toolbar>
    </div>
  `,
};

export const Dense: Story = {
  render: () => `
    <rell-toolbar dense>
      <rell-button variant="primary" size="sm" slot="start">New</rell-button>
      <rell-button variant="ghost" size="sm" slot="start">Edit</rell-button>
      <rell-button variant="ghost" size="sm" slot="end">Delete</rell-button>
    </rell-toolbar>
  `,
};

export const WithButtonGroup: Story = {
  render: () => `
    <rell-toolbar>
      <rell-button-group slot="start">
        <rell-button variant="primary">Bold</rell-button>
        <rell-button variant="primary">Italic</rell-button>
        <rell-button variant="primary">Underline</rell-button>
      </rell-button-group>
      <rell-button-group slot="end">
        <rell-button variant="ghost">Left</rell-button>
        <rell-button variant="ghost">Center</rell-button>
        <rell-button variant="ghost">Right</rell-button>
      </rell-button-group>
    </rell-toolbar>
  `,
};

export const RichContent: Story = {
  render: () => `
    <rell-toolbar>
      <div slot="start" style="display: flex; align-items: center; gap: 1rem;">
        <rell-typography variant="h6" style="margin: 0;">Document Editor</rell-typography>
        <rell-divider vertical></rell-divider>
        <rell-button variant="ghost" size="sm">File</rell-button>
        <rell-button variant="ghost" size="sm">Edit</rell-button>
        <rell-button variant="ghost" size="sm">View</rell-button>
      </div>
      <div slot="end" style="display: flex; align-items: center; gap: 0.5rem;">
        <rell-button variant="ghost" size="sm">
          <rell-svg name="search" size="16"></rell-svg>
        </rell-button>
        <rell-button variant="ghost" size="sm">
          <rell-svg name="settings" size="16"></rell-svg>
        </rell-button>
        <rell-avatar size="sm">JD</rell-avatar>
      </div>
    </rell-toolbar>
  `,
};

