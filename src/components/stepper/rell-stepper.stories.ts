import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Stepper',
  component: 'rell-stepper',
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'number',
      description: 'Current step index',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Stepper variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-stepper current="1">
      <rell-step title="Step 1" description="First step description"></rell-step>
      <rell-step title="Step 2" description="Second step description"></rell-step>
      <rell-step title="Step 3" description="Third step description"></rell-step>
      <rell-step title="Step 4" description="Final step description"></rell-step>
    </rell-stepper>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-stepper current="2" orientation="horizontal">
      <rell-step title="Account" description="Create account"></rell-step>
      <rell-step title="Profile" description="Fill profile"></rell-step>
      <rell-step title="Payment" description="Payment info"></rell-step>
      <rell-step title="Review" description="Review and confirm"></rell-step>
    </rell-stepper>
  `,
};

export const Vertical: Story = {
  render: () => `
    <rell-stepper current="1" orientation="vertical">
      <rell-step title="Step 1" description="First step description"></rell-step>
      <rell-step title="Step 2" description="Second step description"></rell-step>
      <rell-step title="Step 3" description="Third step description"></rell-step>
      <rell-step title="Step 4" description="Final step description"></rell-step>
    </rell-stepper>
  `,
};

export const WithCustomContent: Story = {
  render: () => `
    <rell-stepper current="0">
      <rell-step>
        <div slot="title">Custom Step 1</div>
        <div slot="description">With custom content</div>
      </rell-step>
      <rell-step title="Step 2" description="Standard step"></rell-step>
      <rell-step title="Step 3" description="Another step"></rell-step>
    </rell-stepper>
  `,
};

export const AllCompleted: Story = {
  render: () => `
    <rell-stepper current="3">
      <rell-step title="Step 1" description="Completed"></rell-step>
      <rell-step title="Step 2" description="Completed"></rell-step>
      <rell-step title="Step 3" description="Completed"></rell-step>
      <rell-step title="Step 4" description="Completed"></rell-step>
    </rell-stepper>
  `,
};

