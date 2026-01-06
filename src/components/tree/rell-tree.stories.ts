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
      <rell-tree-node label="Documents" icon="folder">
        <rell-tree-node label="Work" icon="file"></rell-tree-node>
        <rell-tree-node label="Personal" icon="file"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="image">
        <rell-tree-node label="Vacation" icon="camera"></rell-tree-node>
        <rell-tree-node label="Family" icon="camera"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="music"></rell-tree-node>
    </rell-tree>
  `,
};

export const Expanded: Story = {
  render: () => `
    <rell-tree default-expand-all>
      <rell-tree-node label="Documents" icon="folder" expanded>
        <rell-tree-node label="Work" icon="file"></rell-tree-node>
        <rell-tree-node label="Personal" icon="file"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="image" expanded>
        <rell-tree-node label="Vacation" icon="camera"></rell-tree-node>
        <rell-tree-node label="Family" icon="camera"></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="music"></rell-tree-node>
    </rell-tree>
  `,
};

export const Selectable: Story = {
  render: () => `
    <rell-tree>
      <rell-tree-node label="Documents" icon="folder" selectable>
        <rell-tree-node label="Work" icon="file" selectable></rell-tree-node>
        <rell-tree-node label="Personal" icon="file" selectable></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Pictures" icon="image" selectable>
        <rell-tree-node label="Vacation" icon="camera" selectable></rell-tree-node>
        <rell-tree-node label="Family" icon="camera" selectable selected></rell-tree-node>
      </rell-tree-node>
      <rell-tree-node label="Music" icon="music" selectable></rell-tree-node>
    </rell-tree>
  `,
};

export const Nested: Story = {
  render: () => `
    <rell-tree default-expand-all>
      <rell-tree-node label="Root" icon="folder">
        <rell-tree-node label="Level 1" icon="folder">
          <rell-tree-node label="Level 2" icon="folder">
            <rell-tree-node label="Level 3" icon="file"></rell-tree-node>
            <rell-tree-node label="Level 3" icon="file"></rell-tree-node>
          </rell-tree-node>
          <rell-tree-node label="Level 2" icon="file"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="Level 1" icon="file"></rell-tree-node>
      </rell-tree-node>
    </rell-tree>
  `,
};

export const FileSystem: Story = {
  render: () => `
    <rell-tree>
      <rell-tree-node label="src" icon="folder">
        <rell-tree-node label="components" icon="folder">
          <rell-tree-node label="button.ts" icon="file"></rell-tree-node>
          <rell-tree-node label="input.ts" icon="file"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="utils" icon="folder">
          <rell-tree-node label="base-component.ts" icon="file"></rell-tree-node>
        </rell-tree-node>
        <rell-tree-node label="index.ts" icon="file"></rell-tree-node>
      </rell-tree-node>
    </rell-tree>
  `,
};

