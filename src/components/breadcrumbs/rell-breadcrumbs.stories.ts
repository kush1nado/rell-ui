import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Breadcrumbs',
  component: 'rell-breadcrumbs',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Separator between items',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-breadcrumbs>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <span>Current Page</span>
    </rell-breadcrumbs>
  `,
};

export const WithCustomSeparator: Story = {
  render: () => `
    <rell-breadcrumbs separator="›">
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <span>Current Page</span>
    </rell-breadcrumbs>
  `,
};

export const WithArrowSeparator: Story = {
  render: () => `
    <rell-breadcrumbs separator="→">
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#category">Category</a>
      <span>Current Page</span>
    </rell-breadcrumbs>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-breadcrumbs size="sm">
        <a href="#home">Home</a>
        <span>Page</span>
      </rell-breadcrumbs>
      <rell-breadcrumbs size="md">
        <a href="#home">Home</a>
        <span>Page</span>
      </rell-breadcrumbs>
      <rell-breadcrumbs size="lg">
        <a href="#home">Home</a>
        <span>Page</span>
      </rell-breadcrumbs>
    </div>
  `,
};

export const LongPath: Story = {
  render: () => `
    <rell-breadcrumbs>
      <a href="#home">Home</a>
      <a href="#section">Section</a>
      <a href="#subsection">Subsection</a>
      <a href="#category">Category</a>
      <a href="#subcategory">Subcategory</a>
      <span>Current Page</span>
    </rell-breadcrumbs>
  `,
};

export const SimplePath: Story = {
  render: () => `
    <rell-breadcrumbs>
      <a href="#home">Home</a>
      <span>Current Page</span>
    </rell-breadcrumbs>
  `,
};

export const WithTypography: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <rell-typography variant="h4">Page Title</rell-typography>
      <rell-breadcrumbs>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <span>Current Page</span>
      </rell-breadcrumbs>
    </div>
  `,
};

