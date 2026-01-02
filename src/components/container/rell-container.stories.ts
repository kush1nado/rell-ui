import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Layout/Container',
  component: 'rell-container',
  tags: ['autodocs'],
  argTypes: {
    'max-width': {
      control: 'text',
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'text',
      description: 'Horizontal padding',
    },
    fluid: {
      control: 'boolean',
      description: 'Full width container',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-container>
      <rell-typography variant="body">
        Default container with max-width 1200px and padding
      </rell-typography>
    </rell-container>
  `,
};

export const Fluid: Story = {
  render: () => `
    <rell-container fluid>
      <rell-typography variant="body">
        Fluid container takes full width
      </rell-typography>
    </rell-container>
  `,
};

export const CustomMaxWidth: Story = {
  render: () => `
    <rell-container max-width="800px">
      <rell-typography variant="body">
        Container with custom max-width of 800px
      </rell-typography>
    </rell-container>
  `,
};

export const CustomPadding: Story = {
  render: () => `
    <rell-container padding="2rem">
      <rell-typography variant="body">
        Container with custom padding of 2rem
      </rell-typography>
    </rell-container>
  `,
};

export const WithContent: Story = {
  render: () => `
    <rell-container>
      <rell-typography variant="h2">Container Example</rell-typography>
      <rell-typography variant="body">
        This is a container that centers content and limits its width.
        It's perfect for main content areas.
      </rell-typography>
      <rell-button variant="primary">Action Button</rell-button>
    </rell-container>
  `,
};

