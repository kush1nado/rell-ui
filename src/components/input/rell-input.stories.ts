import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Input',
  component: 'rell-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input placeholder="Enter text..."></rell-input>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input value="Cyberpunk 2077" placeholder="Enter text..."></rell-input>
    </div>
  `,
};

export const Types: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input type="text" placeholder="Text input"></rell-input>
      <rell-input type="email" placeholder="Email input"></rell-input>
      <rell-input type="password" placeholder="Password input"></rell-input>
      <rell-input type="number" placeholder="Number input"></rell-input>
      <rell-input type="search" placeholder="Search input"></rell-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input size="sm" placeholder="Small input"></rell-input>
      <rell-input size="md" placeholder="Medium input"></rell-input>
      <rell-input size="lg" placeholder="Large input"></rell-input>
    </div>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input placeholder="Normal state"></rell-input>
      <rell-input placeholder="Disabled state" disabled></rell-input>
      <rell-input placeholder="Error state" error></rell-input>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 300px;">
      <rell-typography variant="caption" color="secondary">Username</rell-typography>
      <rell-input placeholder="Enter username"></rell-input>
    </div>
  `,
};

export const Required: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        placeholder="Required field" 
        required
        validate-on="blur"
      ></rell-input>
    </div>
  `,
};

export const MinMaxLength: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        placeholder="Min 3, max 10 characters" 
        minlength="3"
        maxlength="10"
        validate-on="blur"
      ></rell-input>
    </div>
  `,
};

export const EmailValidation: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        type="email"
        placeholder="Enter email" 
        required
        validate-on="blur"
      ></rell-input>
    </div>
  `,
};

export const PatternValidation: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        placeholder="Enter phone (XXX-XXX-XXXX)" 
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        error-message="Please enter a valid phone number (XXX-XXX-XXXX)"
        validate-on="blur"
      ></rell-input>
    </div>
  `,
};

export const NumberRange: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        type="number"
        placeholder="Enter number (1-100)" 
        min="1"
        max="100"
        validate-on="blur"
      ></rell-input>
    </div>
  `,
};

export const CustomErrorMessage: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        placeholder="Enter value" 
        error
        error-message="This is a custom error message"
      ></rell-input>
    </div>
  `,
};

export const ErrorStates: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <rell-input 
        placeholder="Email address" 
        type="email"
        error
        error-message="Please enter a valid email address"
      ></rell-input>
      <rell-input 
        placeholder="Password" 
        type="password"
        error
        error-message="Password must be at least 8 characters"
      ></rell-input>
      <rell-input 
        placeholder="Username" 
        error
        error-message="Username is already taken"
      ></rell-input>
    </div>
  `,
};

export const ValidateOnInput: Story = {
  render: () => `
    <div style="width: 300px;">
      <rell-input 
        placeholder="Validates on every input" 
        minlength="5"
        validate-on="input"
      ></rell-input>
    </div>
  `,
};

export const CustomValidation: Story = {
  render: () => {
    return `
      <div style="width: 300px;">
        <rell-input 
          id="custom-validation-input"
          placeholder="Must be 5+ chars and contain @" 
          validate-on="blur"
        ></rell-input>
        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--rell-text-secondary);">
          Try entering a value and blur the field. Custom validator checks for length and @ symbol.
        </p>
      </div>
      <script>
        (function() {
          setTimeout(() => {
            const input = document.querySelector('#custom-validation-input');
            if (input && typeof input.setCustomValidator === 'function') {
              input.setCustomValidator((value) => {
                if (value.length < 5) {
                  return 'Value must be at least 5 characters';
                }
                if (!value.includes('@')) {
                  return 'Value must contain @ symbol';
                }
                return null;
              });
            }
          }, 100);
        })();
      </script>
    `;
  },
};
