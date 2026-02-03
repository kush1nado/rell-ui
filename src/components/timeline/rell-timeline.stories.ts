import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Timeline',
  component: 'rell-timeline',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Timeline orientation',
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Timeline variant',
    },
    alternate: {
      control: 'boolean',
      description: 'Alternate item positions',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-timeline>
      <rell-timeline-item>
        <span slot="title">Project Started</span>
        <span slot="description">Initial planning and setup phase completed successfully.</span>
        <span slot="time">2024-01-15</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Design Phase</span>
        <span slot="description">UI/UX designs finalized and approved by stakeholders.</span>
        <span slot="time">2024-02-01</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Development Started</span>
        <span slot="description">Core features implementation in progress.</span>
        <span slot="time">2024-02-15</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Testing Phase</span>
        <span slot="description">Quality assurance and bug fixing ongoing.</span>
        <span slot="time">2024-03-01</span>
      </rell-timeline-item>
    </rell-timeline>
  `,
};

export const Alternate: Story = {
  render: () => `
    <rell-timeline alternate>
      <rell-timeline-item position="left">
        <span slot="title">Project Started</span>
        <span slot="description">Initial planning and setup phase completed successfully.</span>
        <span slot="time">2024-01-15</span>
      </rell-timeline-item>
      <rell-timeline-item position="right">
        <span slot="title">Design Phase</span>
        <span slot="description">UI/UX designs finalized and approved by stakeholders.</span>
        <span slot="time">2024-02-01</span>
      </rell-timeline-item>
      <rell-timeline-item position="left">
        <span slot="title">Development Started</span>
        <span slot="description">Core features implementation in progress.</span>
        <span slot="time">2024-02-15</span>
      </rell-timeline-item>
      <rell-timeline-item position="right">
        <span slot="title">Testing Phase</span>
        <span slot="description">Quality assurance and bug fixing ongoing.</span>
        <span slot="time">2024-03-01</span>
      </rell-timeline-item>
    </rell-timeline>
  `,
};

export const WithColors: Story = {
  render: () => `
    <rell-timeline>
      <rell-timeline-item color="var(--rell-status-success)">
        <span slot="title">Completed</span>
        <span slot="description">Task completed successfully.</span>
        <span slot="time">2024-01-15</span>
      </rell-timeline-item>
      <rell-timeline-item color="var(--rell-status-warning)">
        <span slot="title">In Progress</span>
        <span slot="description">Task is currently being worked on.</span>
        <span slot="time">2024-02-01</span>
      </rell-timeline-item>
      <rell-timeline-item color="var(--rell-status-error)">
        <span slot="title">Blocked</span>
        <span slot="description">Task is blocked and waiting for dependencies.</span>
        <span slot="time">2024-02-15</span>
      </rell-timeline-item>
    </rell-timeline>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-timeline orientation="horizontal">
      <rell-timeline-item>
        <span slot="title">Q1</span>
        <span slot="description">First quarter results</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Q2</span>
        <span slot="description">Second quarter results</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Q3</span>
        <span slot="description">Third quarter results</span>
      </rell-timeline-item>
      <rell-timeline-item>
        <span slot="title">Q4</span>
        <span slot="description">Fourth quarter results</span>
      </rell-timeline-item>
    </rell-timeline>
  `,
};

