import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Tree',
  component: 'rell-tree',
  tags: ['autodocs'],
  argTypes: {
    'default-expand-all': {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-tree>
      <rell-tree-node label="Documents" icon="📁">
        <rell-tree-node label="Work" icon="📄"></rell-tree-node>
        <rell-tree-node label="Personal" icon="📄"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="🖼️">
        <rell-tree-node label="Vacation" icon="📷"></rell-tree-node>
        <rell-tree-node label="Family" icon="📷"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="🎵"></rell-tree-node>
    </rell-tree>
  `,
};

export const Expanded: Story = {
  render: () => `
    <rell-tree default-expand-all>
      <rell-tree-node label="Documents" icon="📁" expanded>
        <rell-tree-node label="Work" icon="📄"></rell-tree-node>
        <rell-tree-node label="Personal" icon="📄"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="🖼️" expanded>
        <rell-tree-node label="Vacation" icon="📷"></rell-tree-node>
        <rell-tree-node label="Family" icon="📷"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="🎵"></rell-tree-node>
    </rell-tree>
  `,
};

export const Selectable: Story = {
  render: () => `
    <rell-tree>
      <rell-tree-node label="Documents" icon="📁" selectable>
        <rell-tree-node label="Work" icon="📄" selectable></rell-tree-node>
        <rell-tree-node label="Personal" icon="📄" selectable></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="🖼️" selectable>
        <rell-tree-node label="Vacation" icon="📷" selectable></rell-tree-node>
        <rell-tree-node label="Family" icon="📷" selectable selected></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="🎵" selectable></rell-tree-node>
    </rell-tree>
  `,
};

export const Nested: Story = {
  render: () => `
    <rell-tree default-expand-all>
      <rell-tree-node label="Root" icon="📁">
        <rell-tree-node label="Level 1" icon="📁">
          <rell-tree-node label="Level 2" icon="📁">
            <rell-tree-node label="Level 3" icon="📄"></rell-tree-node>
            <rell-tree-node label="Level 3" icon="📄"></rell-tree-node>
          </rell-tree-node>
          <rell-tree-node label="Level 2" icon="📄"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="Level 1" icon="📄"></rell-tree-node>
      </rell-tree-node>
    </rell-tree>
  `,
};

export const FileSystem: Story = {
  render: () => `
    <rell-tree>
      <rell-tree-node label="src" icon="📁">
        <rell-tree-node label="components" icon="📁">
          <rell-tree-node label="button.ts" icon="📄"></rell-tree-node>
          <rell-tree-node label="input.ts" icon="📄"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="utils" icon="📁">
          <rell-tree-node label="base-component.ts" icon="📄"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="index.ts" icon="📄"></rell-tree-node>
      </rell-tree-node>
    </rell-tree>
  `,
};

