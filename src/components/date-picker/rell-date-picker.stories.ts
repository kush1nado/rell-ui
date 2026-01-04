import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/DatePicker',
  component: 'rell-date-picker',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected date value',
    },
    format: {
      control: 'select',
      options: ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY'],
      description: 'Date format',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    'error-message': {
      control: 'text',
      description: 'Error message',
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
      description: 'Comma-separated disabled dates',
    },
    'first-day-of-week': {
      control: 'select',
      options: ['0', '1'],
      description: 'First day of week (0=Sunday, 1=Monday)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker></rell-date-picker>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker value="2024-12-25"></rell-date-picker>
    </div>
  `,
};

export const Formats: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <div>
        <rell-typography variant="caption" color="secondary">YYYY-MM-DD</rell-typography>
        <rell-date-picker format="YYYY-MM-DD"></rell-date-picker>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">DD/MM/YYYY</rell-typography>
        <rell-date-picker format="DD/MM/YYYY"></rell-date-picker>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">MM/DD/YYYY</rell-typography>
        <rell-date-picker format="MM/DD/YYYY"></rell-date-picker>
      </div>
    </div>
  `,
};

export const WithMinMax: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker 
        min-date="2024-01-01"
        max-date="2024-12-31"
        placeholder="Select date in 2024"
      ></rell-date-picker>
    </div>
  `,
};

export const WithDisabledDates: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker 
        disabled-dates="2024-12-25,2024-01-01,2024-07-04"
        placeholder="Holidays are disabled"
      ></rell-date-picker>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--rell-text-secondary);">
        Christmas, New Year, and July 4th are disabled
      </p>
    </div>
  `,
};

export const WithError: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker 
        error
        error-message="Please select a valid date"
      ></rell-date-picker>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker disabled value="2024-12-25"></rell-date-picker>
    </div>
  `,
};

export const FirstDayMonday: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-date-picker first-day-of-week="1"></rell-date-picker>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--rell-text-secondary);">
        Week starts on Monday
      </p>
    </div>
  `,
};

export const InForm: Story = {
  render: () => `
    <rell-form>
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
        <div>
          <rell-typography variant="caption" color="secondary">Birth Date</rell-typography>
          <rell-date-picker 
            name="birthdate"
            format="DD/MM/YYYY"
            max-date="2024-12-31"
            placeholder="Select your birth date"
          ></rell-date-picker>
        </div>
        <div>
          <rell-typography variant="caption" color="secondary">Appointment Date</rell-typography>
          <rell-date-picker 
            name="appointment"
            format="YYYY-MM-DD"
            min-date="2024-01-01"
            placeholder="Select appointment date"
          ></rell-date-picker>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 300px;">
      <rell-typography variant="caption" color="secondary">Select Date</rell-typography>
      <rell-date-picker placeholder="Choose a date"></rell-date-picker>
    </div>
  `,
};

