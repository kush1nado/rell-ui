import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Table',
  component: 'rell-table',
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Striped rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Bordered table',
    },
    hover: {
      control: 'boolean',
      description: 'Hover effect on rows',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-table>
      <rell-table-row slot="header">
        <rell-table-cell header>Name</rell-table-cell>
        <rell-table-cell header>Email</rell-table-cell>
        <rell-table-cell header>Role</rell-table-cell>
        <rell-table-cell header align="right">Actions</rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>John Doe</rell-table-cell>
        <rell-table-cell>john@example.com</rell-table-cell>
        <rell-table-cell>Admin</rell-table-cell>
        <rell-table-cell align="right">
          <rell-button variant="ghost" size="sm">Edit</rell-button>
        </rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>Jane Smith</rell-table-cell>
        <rell-table-cell>jane@example.com</rell-table-cell>
        <rell-table-cell>User</rell-table-cell>
        <rell-table-cell align="right">
          <rell-button variant="ghost" size="sm">Edit</rell-button>
        </rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>Bob Johnson</rell-table-cell>
        <rell-table-cell>bob@example.com</rell-table-cell>
        <rell-table-cell>User</rell-table-cell>
        <rell-table-cell align="right">
          <rell-button variant="ghost" size="sm">Edit</rell-button>
        </rell-table-cell>
      </rell-table-row>
    </rell-table>
  `,
};

export const Striped: Story = {
  render: () => `
    <rell-table striped>
      <rell-table-row slot="header">
        <rell-table-cell header>Product</rell-table-cell>
        <rell-table-cell header align="right">Price</rell-table-cell>
        <rell-table-cell header align="right">Stock</rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>Product A</rell-table-cell>
        <rell-table-cell align="right">$99.99</rell-table-cell>
        <rell-table-cell align="right">50</rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>Product B</rell-table-cell>
        <rell-table-cell align="right">$149.99</rell-table-cell>
        <rell-table-cell align="right">30</rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>Product C</rell-table-cell>
        <rell-table-cell align="right">$79.99</rell-table-cell>
        <rell-table-cell align="right">100</rell-table-cell>
      </rell-table-row>
    </rell-table>
  `,
};

export const Bordered: Story = {
  render: () => `
    <rell-table bordered>
      <rell-table-row slot="header">
        <rell-table-cell header>ID</rell-table-cell>
        <rell-table-cell header>Name</rell-table-cell>
        <rell-table-cell header>Status</rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>1</rell-table-cell>
        <rell-table-cell>Item 1</rell-table-cell>
        <rell-table-cell><rell-badge variant="success">Active</rell-badge></rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>2</rell-table-cell>
        <rell-table-cell>Item 2</rell-table-cell>
        <rell-table-cell><rell-badge variant="warning">Pending</rell-badge></rell-table-cell>
      </rell-table-row>
      <rell-table-row>
        <rell-table-cell>3</rell-table-cell>
        <rell-table-cell>Item 3</rell-table-cell>
        <rell-table-cell><rell-badge variant="error">Inactive</rell-badge></rell-table-cell>
      </rell-table-row>
    </rell-table>
  `,
};

export const Hover: Story = {
  render: () => `
    <rell-table hover>
      <rell-table-row slot="header">
        <rell-table-cell header>Name</rell-table-cell>
        <rell-table-cell header>Email</rell-table-cell>
        <rell-table-cell header>Status</rell-table-cell>
      </rell-table-row>
      <rell-table-row clickable>
        <rell-table-cell>John Doe</rell-table-cell>
        <rell-table-cell>john@example.com</rell-table-cell>
        <rell-table-cell>Active</rell-table-cell>
      </rell-table-row>
      <rell-table-row clickable>
        <rell-table-cell>Jane Smith</rell-table-cell>
        <rell-table-cell>jane@example.com</rell-table-cell>
        <rell-table-cell>Active</rell-table-cell>
      </rell-table-row>
      <rell-table-row clickable>
        <rell-table-cell>Bob Johnson</rell-table-cell>
        <rell-table-cell>bob@example.com</rell-table-cell>
        <rell-table-cell>Inactive</rell-table-cell>
      </rell-table-row>
    </rell-table>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Small</h3>
        <rell-table size="sm" bordered>
          <rell-table-row slot="header">
            <rell-table-cell header>Name</rell-table-cell>
            <rell-table-cell header>Value</rell-table-cell>
          </rell-table-row>
          <rell-table-row>
            <rell-table-cell>Item 1</rell-table-cell>
            <rell-table-cell>100</rell-table-cell>
          </rell-table-row>
        </rell-table>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Medium</h3>
        <rell-table size="md" bordered>
          <rell-table-row slot="header">
            <rell-table-cell header>Name</rell-table-cell>
            <rell-table-cell header>Value</rell-table-cell>
          </rell-table-row>
          <rell-table-row>
            <rell-table-cell>Item 1</rell-table-cell>
            <rell-table-cell>100</rell-table-cell>
          </rell-table-row>
        </rell-table>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Large</h3>
        <rell-table size="lg" bordered>
          <rell-table-row slot="header">
            <rell-table-cell header>Name</rell-table-cell>
            <rell-table-cell header>Value</rell-table-cell>
          </rell-table-row>
          <rell-table-row>
            <rell-table-cell>Item 1</rell-table-cell>
            <rell-table-cell>100</rell-table-cell>
          </rell-table-row>
        </rell-table>
      </div>
    </div>
  `,
};

export const ManyColumns: Story = {
  render: () => {
    const columns = Array.from({ length: 50 }, (_, i) => i + 1);
    const headerCells = columns.map(col => `<rell-table-cell header>Col ${col}</rell-table-cell>`).join('');
    const dataCells = columns.map(col => `<rell-table-cell>Data ${col}</rell-table-cell>`).join('');
    
    return `
      <div style="padding: 2rem;">
        <p style="margin-bottom: 1rem; color: var(--rell-text-secondary);">
          Таблица с 50 колонками для проверки горизонтальной прокрутки
        </p>
        <rell-table bordered hover>
          <rell-table-row slot="header">
            ${headerCells}
          </rell-table-row>
          <rell-table-row>
            ${dataCells}
          </rell-table-row>
          <rell-table-row>
            ${dataCells}
          </rell-table-row>
          <rell-table-row>
            ${dataCells}
          </rell-table-row>
        </rell-table>
      </div>
    `;
  },
};

