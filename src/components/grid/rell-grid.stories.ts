import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Grid',
  component: 'rell-grid',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'text',
      description: 'Grid columns template',
    },
    rows: {
      control: 'text',
      description: 'Grid rows template',
    },
    gap: {
      control: 'text',
      description: 'Grid gap',
    },
    'column-gap': {
      control: 'text',
      description: 'Column gap',
    },
    'row-gap': {
      control: 'text',
      description: 'Row gap',
    },
    'align-items': {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'baseline'],
      description: 'Align items',
    },
    'justify-items': {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center'],
      description: 'Justify items',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-grid columns="repeat(3, 1fr)" gap="1rem">
      <rell-card><rell-typography variant="body">Item 1</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 2</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 3</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 4</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 5</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 6</rell-typography></rell-card>
    </rell-grid>
  `,
};

export const Responsive: Story = {
  render: () => `
    <rell-grid columns="repeat(auto-fill, minmax(200px, 1fr))" gap="1rem">
      <rell-card><rell-typography variant="body">Item 1</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 2</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 3</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 4</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 5</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 6</rell-typography></rell-card>
    </rell-grid>
  `,
};

export const FixedColumns: Story = {
  render: () => `
    <rell-grid columns="200px 1fr 200px" gap="1rem">
      <rell-card><rell-typography variant="body">Sidebar</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Main Content</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Sidebar</rell-typography></rell-card>
    </rell-grid>
  `,
};

export const WithGap: Story = {
  render: () => `
    <rell-grid columns="repeat(3, 1fr)" gap="2rem">
      <rell-card><rell-typography variant="body">Item 1</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 2</rell-typography></rell-card>
      <rell-card><rell-typography variant="body">Item 3</rell-typography></rell-card>
    </rell-grid>
  `,
};

export const Centered: Story = {
  render: () => `
    <rell-grid columns="repeat(3, 1fr)" gap="1rem" align-items="center" justify-items="center">
      <rell-card style="width: 150px;"><rell-typography variant="body">Small</rell-typography></rell-card>
      <rell-card style="width: 200px;"><rell-typography variant="body">Medium</rell-typography></rell-card>
      <rell-card style="width: 150px;"><rell-typography variant="body">Small</rell-typography></rell-card>
    </rell-grid>
  `,
};
