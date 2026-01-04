import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Form',
  component: 'rell-form',
  tags: ['autodocs'],
  argTypes: {
    method: {
      control: 'select',
      options: ['get', 'post'],
      description: 'Form method',
    },
    action: {
      control: 'text',
      description: 'Form action URL',
    },
    novalidate: {
      control: 'boolean',
      description: 'Disable native validation',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-form>
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
        <div>
          <rell-typography variant="caption" color="secondary">Email</rell-typography>
          <rell-input 
            type="email" 
            name="email"
            placeholder="Enter your email"
            required
          ></rell-input>
        </div>
        <div>
          <rell-typography variant="caption" color="secondary">Password</rell-typography>
          <rell-input 
            type="password" 
            name="password"
            placeholder="Enter your password"
            required
            minlength="8"
          ></rell-input>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
  `,
};

export const WithValidation: Story = {
  render: () => `
    <rell-form id="validation-form">
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
        <div>
          <rell-typography variant="caption" color="secondary">Username</rell-typography>
          <rell-input 
            name="username"
            placeholder="Enter username"
            required
            minlength="3"
            validate-on="blur"
          ></rell-input>
        </div>
        <div>
          <rell-typography variant="caption" color="secondary">Email</rell-typography>
          <rell-input 
            type="email" 
            name="email"
            placeholder="Enter email"
            required
            validate-on="blur"
          ></rell-input>
        </div>
        <div>
          <rell-typography variant="caption" color="secondary">Country</rell-typography>
          <rell-select name="country" required>
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </rell-select>
        </div>
        <div>
          <rell-checkbox name="terms" required>
            I accept the terms and conditions
          </rell-checkbox>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
    <script>
      (function() {
        setTimeout(() => {
          const form = document.querySelector('#validation-form');
          if (form) {
            form.addEventListener('submit', (e) => {
              console.log('Form submitted:', e.detail);
              alert('Form data: ' + JSON.stringify(e.detail.formDataObject, null, 2));
            });
            form.addEventListener('invalid', () => {
              console.log('Form validation failed');
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const WithRadioGroup: Story = {
  render: () => `
    <rell-form>
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
        <div>
          <rell-typography variant="caption" color="secondary">Select plan</rell-typography>
          <rell-radio-group name="plan" value="basic">
            <rell-radio value="basic">Basic</rell-radio>
            <rell-radio value="pro">Pro</rell-radio>
            <rell-radio value="enterprise">Enterprise</rell-radio>
          </rell-radio-group>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
  `,
};

export const WithCheckboxGroup: Story = {
  render: () => `
    <rell-form>
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
        <div>
          <rell-typography variant="caption" color="secondary">Select features</rell-typography>
          <rell-checkbox-group name="features">
            <rell-checkbox value="feature1">Feature 1</rell-checkbox>
            <rell-checkbox value="feature2" checked>Feature 2</rell-checkbox>
            <rell-checkbox value="feature3">Feature 3</rell-checkbox>
          </rell-checkbox-group>
        </div>
        <rell-button type="submit" variant="primary">Submit</rell-button>
      </div>
    </rell-form>
  `,
};

export const ComplexForm: Story = {
  render: () => `
    <rell-form id="complex-form">
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 500px;">
        <rell-typography variant="h3">Registration Form</rell-typography>
        
        <div>
          <rell-typography variant="caption" color="secondary">Full Name</rell-typography>
          <rell-input 
            name="fullName"
            placeholder="Enter your full name"
            required
            minlength="2"
            validate-on="blur"
          ></rell-input>
        </div>

        <div>
          <rell-typography variant="caption" color="secondary">Email</rell-typography>
          <rell-input 
            type="email" 
            name="email"
            placeholder="Enter your email"
            required
            validate-on="blur"
          ></rell-input>
        </div>

        <div>
          <rell-typography variant="caption" color="secondary">Phone</rell-typography>
          <rell-input 
            type="tel" 
            name="phone"
            placeholder="XXX-XXX-XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            error-message="Please enter a valid phone number (XXX-XXX-XXXX)"
            validate-on="blur"
          ></rell-input>
        </div>

        <div>
          <rell-typography variant="caption" color="secondary">Country</rell-typography>
          <rell-select name="country" required>
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
          </rell-select>
        </div>

        <div>
          <rell-typography variant="caption" color="secondary">Newsletter</rell-typography>
          <rell-switch name="newsletter" label="Subscribe to newsletter"></rell-switch>
        </div>

        <div>
          <rell-checkbox name="terms" required>
            I accept the terms and conditions
          </rell-checkbox>
        </div>

        <div style="display: flex; gap: 1rem;">
          <rell-button type="submit" variant="primary">Register</rell-button>
          <rell-button type="reset" variant="ghost">Reset</rell-button>
        </div>
      </div>
    </rell-form>
    <script>
      (function() {
        setTimeout(() => {
          const form = document.querySelector('#complex-form');
          if (form) {
            form.addEventListener('submit', (e) => {
              console.log('Form data:', e.detail.formDataObject);
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const WithFormMethods: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <rell-typography variant="h4">Get Method</rell-typography>
        <rell-form method="get" action="/api/search">
          <div style="display: flex; gap: 1rem; width: 400px;">
            <rell-input name="query" placeholder="Search..." style="flex: 1;"></rell-input>
            <rell-button type="submit" variant="primary">Search</rell-button>
          </div>
        </rell-form>
      </div>

      <div>
        <rell-typography variant="h4">Post Method</rell-typography>
        <rell-form method="post" action="/api/submit">
          <div style="display: flex; flex-direction: column; gap: 1rem; width: 400px;">
            <rell-input name="message" placeholder="Enter message" required></rell-input>
            <rell-button type="submit" variant="primary">Submit</rell-button>
          </div>
        </rell-form>
      </div>
    </div>
  `,
};

