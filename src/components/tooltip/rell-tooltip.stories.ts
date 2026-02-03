import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'rell-tooltip',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Tooltip variant',
    },
    delay: {
      control: 'number',
      description: 'Show delay in milliseconds',
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
    <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
      <rell-tooltip>
        <rell-button variant="primary">Hover me</rell-button>
        <span slot="content">This is a tooltip</span>
      </rell-tooltip>
    </div>
  `,
};

export const Positions: Story = {
  render: () => `
    <div style="padding: 6rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <rell-tooltip position="top">
        <rell-button variant="primary">Top</rell-button>
        <span slot="content">Tooltip on top</span>
      </rell-tooltip>
      
      <div style="display: flex; gap: 2rem;">
        <rell-tooltip position="left">
          <rell-button variant="primary">Left</rell-button>
          <span slot="content">Tooltip on left</span>
        </rell-tooltip>
        
        <rell-tooltip position="right">
          <rell-button variant="primary">Right</rell-button>
          <span slot="content">Tooltip on right</span>
        </rell-tooltip>
      </div>
      
      <rell-tooltip position="bottom">
        <rell-button variant="primary">Bottom</rell-button>
        <span slot="content">Tooltip on bottom</span>
      </rell-tooltip>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
      <rell-tooltip variant="default">
        <rell-button>Default</rell-button>
        <span slot="content">Default tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="primary">
        <rell-button variant="primary">Primary</rell-button>
        <span slot="content">Primary tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="success">
        <rell-button variant="primary">Success</rell-button>
        <span slot="content">Success tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="warning">
        <rell-button variant="primary">Warning</rell-button>
        <span slot="content">Warning tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="error">
        <rell-button variant="primary">Error</rell-button>
        <span slot="content">Error tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="info">
        <rell-button variant="primary">Info</rell-button>
        <span slot="content">Info tooltip</span>
      </rell-tooltip>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
      <rell-tooltip>
        <rell-button variant="primary">Hover for long content</rell-button>
        <span slot="content">This is a longer tooltip that contains more text and will wrap to multiple lines if needed</span>
      </rell-tooltip>
    </div>
  `,
};

export const WithDelay: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; gap: 1rem; justify-content: center;">
      <rell-tooltip delay="0">
        <rell-button variant="primary">No delay</rell-button>
        <span slot="content">Shows immediately</span>
      </rell-tooltip>
      
      <rell-tooltip delay="500">
        <rell-button variant="primary">500ms delay</rell-button>
        <span slot="content">Shows after 500ms</span>
      </rell-tooltip>
      
      <rell-tooltip delay="1000">
        <rell-button variant="primary">1000ms delay</rell-button>
        <span slot="content">Shows after 1 second</span>
      </rell-tooltip>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <div style="padding: 4rem; display: flex; gap: 1rem; justify-content: center;">
      <rell-tooltip>
        <rell-button variant="ghost">
          <rell-svg name="info" size="20"></rell-svg>
        </rell-button>
        <span slot="content">Information tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="success">
        <rell-button variant="ghost">
          <rell-svg name="check" size="20"></rell-svg>
        </rell-button>
        <span slot="content">Success tooltip</span>
      </rell-tooltip>
      
      <rell-tooltip variant="error">
        <rell-button variant="ghost">
          <rell-svg name="close" size="20"></rell-svg>
        </rell-button>
        <span slot="content">Error tooltip</span>
      </rell-tooltip>
    </div>
  `,
};

