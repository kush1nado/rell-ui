import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Layout/Col',
  component: 'rell-col',
  tags: ['autodocs'],
  argTypes: {
    span: {
      control: 'text',
      description: 'Column span (1-12)',
    },
    offset: {
      control: 'text',
      description: 'Column offset (0-11)',
    },
    grow: {
      control: 'text',
      description: 'Flex grow',
    },
    shrink: {
      control: 'text',
      description: 'Flex shrink',
    },
    basis: {
      control: 'text',
      description: 'Flex basis',
    },
    'align-self': {
      control: 'select',
      options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Self alignment',
    },
  },
};

export default meta;
type Story = StoryObj;

export const EqualColumns: Story = {
  render: () => `
    <rell-row>
      <rell-col span="4">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Column 1</rell-typography>
        </div>
      </rell-col>
      <rell-col span="4">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Column 2</rell-typography>
        </div>
      </rell-col>
      <rell-col span="4">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Column 3</rell-typography>
        </div>
      </rell-col>
    </rell-row>
  `,
};

export const DifferentSpans: Story = {
  render: () => `
    <rell-row>
      <rell-col span="6">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Half width (6/12)</rell-typography>
        </div>
      </rell-col>
      <rell-col span="3">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Quarter (3/12)</rell-typography>
        </div>
      </rell-col>
      <rell-col span="3">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Quarter (3/12)</rell-typography>
        </div>
      </rell-col>
    </rell-row>
  `,
};

export const WithOffset: Story = {
  render: () => `
    <rell-row>
      <rell-col span="4" offset="2">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Offset by 2 columns</rell-typography>
        </div>
      </rell-col>
      <rell-col span="4">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Normal column</rell-typography>
        </div>
      </rell-col>
    </rell-row>
  `,
};

export const AutoWidth: Story = {
  render: () => `
    <rell-row>
      <rell-col>
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Auto width</rell-typography>
        </div>
      </rell-col>
      <rell-col>
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Auto width</rell-typography>
        </div>
      </rell-col>
      <rell-col span="4">
        <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
          <rell-typography variant="body">Fixed 4 columns</rell-typography>
        </div>
      </rell-col>
    </rell-row>
  `,
};

export const FullLayout: Story = {
  render: () => `
    <rell-container>
      <rell-row gap="1.5rem">
        <rell-col span="12">
          <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
            <rell-typography variant="h3">Full Width Header</rell-typography>
          </div>
        </rell-col>
        <rell-col span="8">
          <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
            <rell-typography variant="h4">Main Content</rell-typography>
            <rell-typography variant="body">8 columns wide</rell-typography>
          </div>
        </rell-col>
        <rell-col span="4">
          <div style="background: var(--rell-surface-base); padding: 1rem; border-radius: 0.5rem;">
            <rell-typography variant="h4">Sidebar</rell-typography>
            <rell-typography variant="body">4 columns wide</rell-typography>
          </div>
        </rell-col>
      </rell-row>
    </rell-container>
  `,
};

