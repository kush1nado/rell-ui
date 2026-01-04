import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/DateRangePicker',
  component: 'rell-date-range-picker',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected date range value',
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
    separator: {
      control: 'text',
      description: 'Separator between dates',
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
    <div style="width: 400px;">
      <rell-date-range-picker></rell-date-range-picker>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker value="2024-01-15 - 2024-01-20"></rell-date-range-picker>
    </div>
  `,
};

export const Formats: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
      <div>
        <rell-typography variant="caption" color="secondary">YYYY-MM-DD</rell-typography>
        <rell-date-range-picker format="YYYY-MM-DD"></rell-date-range-picker>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">DD/MM/YYYY</rell-typography>
        <rell-date-range-picker format="DD/MM/YYYY" separator=" to "></rell-date-range-picker>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">MM/DD/YYYY</rell-typography>
        <rell-date-range-picker format="MM/DD/YYYY" separator=" → "></rell-date-range-picker>
      </div>
    </div>
  `,
};

export const WithMinMax: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker 
        min-date="2024-01-01"
        max-date="2024-12-31"
        placeholder="Select date range in 2024"
      ></rell-date-range-picker>
    </div>
  `,
};

export const WithDisabledDates: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker 
        disabled-dates="2024-12-25,2024-01-01,2024-07-04"
        placeholder="Holidays are disabled"
      ></rell-date-range-picker>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--rell-text-secondary);">
        Christmas, New Year, and July 4th are disabled
      </p>
    </div>
  `,
};

export const WithError: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker 
        error
        error-message="Please select a valid date range"
      ></rell-date-range-picker>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker disabled value="2024-01-15 - 2024-01-20"></rell-date-range-picker>
    </div>
  `,
};

export const CustomSeparator: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-date-range-picker 
        separator=" to "
        placeholder="Select date range"
      ></rell-date-range-picker>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--rell-text-secondary);">
        Custom separator: "to"
      </p>
    </div>
  `,
};

export const InForm: Story = {
  render: () => `
    <rell-form>
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 500px;">
        <div>
          <rell-typography variant="caption" color="secondary">Vacation Period</rell-typography>
          <rell-date-range-picker 
            name="vacation"
            format="DD/MM/YYYY"
            separator=" to "
            min-date="2024-01-01"
            placeholder="Select vacation dates"
          ></rell-date-range-picker>
        </div>
        <div>
          <rell-typography variant="caption" color="secondary">Project Timeline</rell-typography>
          <rell-date-range-picker 
            name="project"
            format="YYYY-MM-DD"
            placeholder="Select project dates"
          ></rell-date-range-picker>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
  `,
};

export const BookingExample: Story = {
  render: () => `
    <div style="width: 400px;">
      <rell-card>
        <div slot="header-title">
          <rell-typography variant="h3">Book Your Stay</rell-typography>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <rell-typography variant="caption" color="secondary">Check-in / Check-out</rell-typography>
            <rell-date-range-picker 
              name="booking"
              format="DD/MM/YYYY"
              separator=" - "
              min-date="2024-01-01"
              placeholder="Select dates"
            ></rell-date-range-picker>
          </div>
          <rell-button variant="primary" full-width>Search Availability</rell-button>
        </div>
      </rell-card>
    </div>
  `,
};

