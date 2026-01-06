import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Progress',
  component: 'rell-progress',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'glitch', 'cyberpunk', 'jagged', 'scanline', 'pulse'],
      description: 'Progress variant',
    },
    'show-label': {
      control: 'boolean',
      description: 'Show label and percentage',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate progress',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => `<rell-progress value="50"></rell-progress>`,
};

export const WithLabel: Story = {
  render: () => `
    <rell-progress value="75" show-label>
      <span slot="label">Upload Progress</span>
    </rell-progress>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-progress value="30" variant="primary" show-label>
        <span slot="label">Primary</span>
      </rell-progress>
      <rell-progress value="50" variant="success" show-label>
        <span slot="label">Success</span>
      </rell-progress>
      <rell-progress value="70" variant="warning" show-label>
        <span slot="label">Warning</span>
      </rell-progress>
      <rell-progress value="90" variant="error" show-label>
        <span slot="label">Error</span>
      </rell-progress>
    </rell-stack>
  `,
};

export const Sizes: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-progress value="50" size="sm" show-label>
        <span slot="label">Small</span>
      </rell-progress>
      <rell-progress value="50" size="md" show-label>
        <span slot="label">Medium</span>
      </rell-progress>
      <rell-progress value="50" size="lg" show-label>
        <span slot="label">Large</span>
      </rell-progress>
    </rell-stack>
  `,
};

export const Indeterminate: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <rell-progress indeterminate show-label>
        <span slot="label">Loading...</span>
      </rell-progress>
      <rell-progress indeterminate variant="success"></rell-progress>
      <rell-progress indeterminate variant="warning"></rell-progress>
    </rell-stack>
  `,
};

export const Multiple: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">File Upload</rell-typography>
        <rell-progress value="65" show-label>
          <span slot="label">document.pdf</span>
        </rell-progress>
      </div>
      <div>
        <rell-typography variant="h4">Processing</rell-typography>
        <rell-progress value="30" variant="success" show-label>
          <span slot="label">image.jpg</span>
        </rell-progress>
      </div>
      <div>
        <rell-typography variant="h4">Waiting</rell-typography>
        <rell-progress indeterminate>
          <span slot="label">Preparing...</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const Glitch: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Glitch Progress</rell-typography>
        <rell-progress value="50" variant="glitch" show-label>
          <span slot="label">Loading...</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="75" variant="glitch" show-label>
          <span slot="label">Processing</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="25" variant="glitch" show-label>
          <span slot="label">Initializing</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const Cyberpunk: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Cyberpunk Progress</rell-typography>
        <rell-progress value="60" variant="cyberpunk" show-label>
          <span slot="label">System Status</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="85" variant="cyberpunk" show-label>
          <span slot="label">Data Transfer</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="40" variant="cyberpunk" show-label>
          <span slot="label">Neural Link</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const Jagged: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Jagged Progress</rell-typography>
        <rell-progress value="55" variant="jagged" show-label>
          <span slot="label">Rough Progress</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="80" variant="jagged" show-label>
          <span slot="label">Torn Edge</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="30" variant="jagged" show-label>
          <span slot="label">Fragmented</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const Scanline: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Scanline Progress</rell-typography>
        <rell-progress value="70" variant="scanline" show-label>
          <span slot="label">Scanning...</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="45" variant="scanline" show-label>
          <span slot="label">Analyzing</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="90" variant="scanline" show-label>
          <span slot="label">Complete</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const Pulse: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Pulse Progress</rell-typography>
        <rell-progress value="65" variant="pulse" show-label>
          <span slot="label">Pulsing</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="35" variant="pulse" show-label>
          <span slot="label">Heartbeat</span>
        </rell-progress>
      </div>
      <div>
        <rell-progress value="95" variant="pulse" show-label>
          <span slot="label">Almost Done</span>
        </rell-progress>
      </div>
    </rell-stack>
  `,
};

export const AllVariants: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">All Progress Variants</rell-typography>
        <rell-stack gap="1.5rem">
          <rell-progress value="50" variant="primary" show-label>
            <span slot="label">Primary</span>
          </rell-progress>
          <rell-progress value="50" variant="glitch" show-label>
            <span slot="label">Glitch</span>
          </rell-progress>
          <rell-progress value="50" variant="cyberpunk" show-label>
            <span slot="label">Cyberpunk</span>
          </rell-progress>
          <rell-progress value="50" variant="jagged" show-label>
            <span slot="label">Jagged</span>
          </rell-progress>
          <rell-progress value="50" variant="scanline" show-label>
            <span slot="label">Scanline</span>
          </rell-progress>
          <rell-progress value="50" variant="pulse" show-label>
            <span slot="label">Pulse</span>
          </rell-progress>
        </rell-stack>
      </div>
    </rell-stack>
  `,
};

