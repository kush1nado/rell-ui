import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Calendar',
  component: 'rell-calendar',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected date(s)',
    },
    'min-date': {
      control: 'text',
      description: 'Minimum selectable date',
    },
    'max-date': {
      control: 'text',
      description: 'Maximum selectable date',
    },
    'disabled-dates': {
      control: 'text',
      description: 'Comma-separated list of disabled dates',
    },
    'first-day-of-week': {
      control: 'select',
      options: ['0', '1'],
      description: 'First day of week (0 = Sunday, 1 = Monday)',
    },
    'show-today': {
      control: 'boolean',
      description: 'Show today indicator',
    },
    'show-other-months': {
      control: 'boolean',
      description: 'Show days from other months',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple date selection',
    },
    range: {
      control: 'boolean',
      description: 'Allow date range selection',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-calendar></rell-calendar>
    <script>
      (function() {
        setTimeout(() => {
          const calendar = document.querySelector('rell-calendar');
          if (calendar) {
            calendar.addEventListener('change', (e) => {
              console.log('Date changed:', e.detail);
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const WithValue: Story = {
  render: () => `
    <rell-calendar value="2024-01-15"></rell-calendar>
  `,
};

export const Multiple: Story = {
  render: () => `
    <rell-calendar multiple></rell-calendar>
  `,
};

export const Range: Story = {
  render: () => `
    <rell-calendar range></rell-calendar>
    <script>
      (function() {
        setTimeout(() => {
          const calendar = document.querySelector('rell-calendar');
          if (calendar) {
            calendar.addEventListener('change', (e) => {
              console.log('Range changed:', e.detail);
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const WithMinMax: Story = {
  render: () => `
    <rell-calendar 
      min-date="2024-01-01" 
      max-date="2024-12-31">
    </rell-calendar>
  `,
};

export const WithDisabledDates: Story = {
  render: () => `
    <rell-calendar 
      disabled-dates="2024-01-15,2024-01-20,2024-01-25">
    </rell-calendar>
  `,
};

export const MondayFirst: Story = {
  render: () => `
    <rell-calendar first-day-of-week="1"></rell-calendar>
  `,
};

export const HideOtherMonths: Story = {
  render: () => `
    <rell-calendar show-other-months="false"></rell-calendar>
  `,
};

export const HideToday: Story = {
  render: () => `
    <rell-calendar show-today="false"></rell-calendar>
  `,
};

export const Complex: Story = {
  render: () => `
    <rell-calendar 
      range
      min-date="2024-01-01"
      max-date="2024-12-31"
      first-day-of-week="1"
      disabled-dates="2024-01-15,2024-01-20">
    </rell-calendar>
  `,
};

