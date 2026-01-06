import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Svg',
  component: 'rell-svg',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['search', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-left', 'arrow-right', 'check', 'plus', 'minus', 'star', 'heart', 'calendar', 'clock', 'user', 'settings', 'menu', 'bell', 'info', 'alert', 'success'],
      description: 'Icon name',
    },
    size: {
      control: 'text',
      description: 'Icon size',
    },
    color: {
      control: 'text',
      description: 'Icon color',
    },
    viewBox: {
      control: 'text',
      description: 'SVG viewBox',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `<rell-svg name="search"></rell-svg>`,
};

export const BuiltInIcons: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="2rem" wrap>
      <rell-center inline>
        <rell-svg name="search" size="32px"></rell-svg>
        <rell-typography variant="caption">search</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="close" size="32px"></rell-svg>
        <rell-typography variant="caption">close</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="check" size="32px"></rell-svg>
        <rell-typography variant="caption">check</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="plus" size="32px"></rell-svg>
        <rell-typography variant="caption">plus</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="star" size="32px"></rell-svg>
        <rell-typography variant="caption">star</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="heart" size="32px"></rell-svg>
        <rell-typography variant="caption">heart</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="user" size="32px"></rell-svg>
        <rell-typography variant="caption">user</rell-typography>
      </rell-center>
      <rell-center inline>
        <rell-svg name="settings" size="32px"></rell-svg>
        <rell-typography variant="caption">settings</rell-typography>
      </rell-center>
    </rell-stack>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="2rem" align="center">
      <rell-svg name="star" size="16px"></rell-svg>
      <rell-svg name="star" size="24px"></rell-svg>
      <rell-svg name="star" size="32px"></rell-svg>
      <rell-svg name="star" size="48px"></rell-svg>
    </rell-stack>
  `,
};

export const Colors: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="2rem" align="center">
      <rell-svg name="heart" color="var(--rell-interactive-primary)"></rell-svg>
      <rell-svg name="heart" color="var(--rell-status-success)"></rell-svg>
      <rell-svg name="heart" color="var(--rell-status-error)"></rell-svg>
      <rell-svg name="heart" color="var(--rell-status-warning)"></rell-svg>
    </rell-stack>
  `,
};

export const CustomContent: Story = {
  render: () => `
    <rell-svg size="48px" viewBox="0 0 100 100">
      <circle slot="content" cx="50" cy="50" r="40" fill="var(--rell-interactive-primary)"/>
      <text slot="content" x="50" y="60" text-anchor="middle" fill="var(--rell-text-inverse)" font-size="30">R</text>
    </rell-svg>
  `,
};

export const WithButtons: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="1rem">
      <rell-button>
        <rell-svg name="plus" size="16px" slot="icon"></rell-svg>
        Add
      </rell-button>
      <rell-button>
        <rell-svg name="check" size="16px" slot="icon"></rell-svg>
        Save
      </rell-button>
      <rell-button variant="ghost">
        <rell-svg name="settings" size="16px"></rell-svg>
      </rell-button>
    </rell-stack>
  `,
};

export const Navigation: Story = {
  render: () => `
    <rell-stack direction="horizontal" gap="1rem" align="center">
      <rell-svg name="chevron-left" size="24px"></rell-svg>
      <rell-typography variant="body">Page 1 of 10</rell-typography>
      <rell-svg name="chevron-right" size="24px"></rell-svg>
    </rell-stack>
  `,
};

