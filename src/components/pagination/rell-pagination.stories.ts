import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'rell-pagination',
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'number',
      description: 'Current page',
    },
    total: {
      control: 'number',
      description: 'Total number of items',
    },
    'page-size': {
      control: 'number',
      description: 'Items per page',
    },
    'show-size-changer': {
      control: 'boolean',
      description: 'Show page size changer',
    },
    'show-total': {
      control: 'boolean',
      description: 'Show total info',
    },
    mode: {
      control: 'select',
      options: ['client', 'server'],
      description: 'Pagination mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-pagination current="1" total="100" page-size="10"></rell-pagination>
  `,
};

export const WithTotal: Story = {
  render: () => `
    <rell-pagination current="3" total="150" page-size="10" show-total></rell-pagination>
  `,
};

export const WithSizeChanger: Story = {
  render: () => `
    <rell-pagination current="1" total="200" page-size="20" show-size-changer></rell-pagination>
  `,
};

export const Full: Story = {
  render: () => `
    <rell-pagination 
      current="5" 
      total="500" 
      page-size="20" 
      show-total 
      show-size-changer
    ></rell-pagination>
  `,
};

export const ManyPages: Story = {
  render: () => `
    <rell-pagination current="50" total="1000" page-size="10" show-total></rell-pagination>
  `,
};

export const FewPages: Story = {
  render: () => `
    <rell-pagination current="2" total="15" page-size="5" show-total></rell-pagination>
  `,
};

export const ServerMode: Story = {
  render: () => `
    <rell-pagination 
      current="1" 
      total="1000" 
      page-size="20" 
      mode="server"
      show-total
      show-size-changer
    ></rell-pagination>
    <script>
      setTimeout(() => {
        const pagination = document.querySelector('rell-pagination');
        if (pagination) {
          pagination.addEventListener('change', (e) => {
            console.log('Page changed:', e.detail);
          });
          pagination.addEventListener('page-size-change', (e) => {
            console.log('Page size changed:', e.detail);
          });
        }
      }, 100);
    </script>
  `,
};

export const Disabled: Story = {
  render: () => `
    <rell-pagination current="3" total="100" page-size="10" disabled></rell-pagination>
  `,
};

