import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/VirtualTable',
  component: 'rell-virtual-table',
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
      description: 'Table height',
    },
    'row-height': {
      control: 'number',
      description: 'Row height in pixels',
    },
    buffer: {
      control: 'number',
      description: 'Buffer rows outside viewport',
    },
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
      description: 'Hover effect',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const table = document.createElement('rell-virtual-table') as any;
    table.setAttribute('height', '400px');
    table.setAttribute('row-height', '48');
    
    const columns = [
      { key: 'id', label: 'ID', width: '80px', align: 'right' as const },
      { key: 'name', label: 'Name', width: '200px' },
      { key: 'email', label: 'Email', width: '250px' },
      { key: 'role', label: 'Role', width: '150px' },
      { key: 'status', label: 'Status', width: '120px' },
    ];
    
    const data = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'User' : 'Guest',
      status: i % 2 === 0 ? 'Active' : 'Inactive',
    }));
    
    // Set columns first, then data
    table.setColumns(columns);
    setTimeout(() => {
      table.setData(data);
    }, 0);
    
    return table;
  },
};

export const WithCustomRender: Story = {
  render: () => {
    const table = document.createElement('rell-virtual-table') as any;
    table.setAttribute('height', '500px');
    table.setAttribute('row-height', '56');
    table.setAttribute('striped', '');
    table.setAttribute('hover', '');
    
    const columns = [
      { key: 'id', label: 'ID', width: '80px', align: 'right' as const },
      { key: 'name', label: 'Product', width: '200px' },
      { key: 'price', label: 'Price', width: '120px', align: 'right' as const, 
        render: (value: number) => `$${value.toFixed(2)}` },
      { key: 'stock', label: 'Stock', width: '100px', align: 'right' as const },
      { key: 'status', label: 'Status', width: '150px',
        render: (value: string) => {
          const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'error';
          return `<rell-badge variant="${variant}">${value}</rell-badge>`;
        } },
    ];
    
    const data = Array.from({ length: 50000 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.random() * 1000,
      stock: Math.floor(Math.random() * 100),
      status: ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)],
    }));
    
    table.setColumns(columns);
    setTimeout(() => {
      table.setData(data);
    }, 0);
    
    return table;
  },
};

export const ManyColumns: Story = {
  render: () => {
    const table = document.createElement('rell-virtual-table') as any;
    table.setAttribute('height', '400px');
    table.setAttribute('row-height', '40');
    table.setAttribute('bordered', '');
    
    const columns = Array.from({ length: 50 }, (_, i) => ({
      key: `col${i + 1}`,
      label: `Column ${i + 1}`,
      width: '150px',
    }));
    
    const data = Array.from({ length: 1000 }, (_, i) => {
      const row: any = { id: i + 1 };
      columns.forEach((col, idx) => {
        row[col.key] = `Data ${i + 1}-${idx + 1}`;
      });
      return row;
    });
    
    table.setColumns(columns);
    setTimeout(() => {
      table.setData(data);
    }, 0);
    
    return table;
  },
};

export const LargeDataset: Story = {
  render: () => {
    const table = document.createElement('rell-virtual-table') as any;
    table.setAttribute('height', '600px');
    table.setAttribute('row-height', '44');
    table.setAttribute('striped', '');
    table.setAttribute('hover', '');
    table.setAttribute('buffer', '10');
    
    const columns = [
      { key: 'id', label: 'ID', width: '100px', align: 'right' as const },
      { key: 'timestamp', label: 'Timestamp', width: '200px' },
      { key: 'event', label: 'Event', width: '300px' },
      { key: 'user', label: 'User', width: '200px' },
      { key: 'value', label: 'Value', width: '150px', align: 'right' as const,
        render: (value: number) => value.toLocaleString() },
    ];
    
    const data = Array.from({ length: 100000 }, (_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      event: ['Login', 'Logout', 'Purchase', 'View', 'Click'][Math.floor(Math.random() * 5)],
      user: `user${Math.floor(Math.random() * 1000)}`,
      value: Math.floor(Math.random() * 1000000),
    }));
    
    table.setColumns(columns);
    setTimeout(() => {
      table.setData(data);
    }, 0);
    
    return table;
  },
};

