import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/QRCode',
  component: 'rell-qrcode',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Value to encode in QR code',
    },
    size: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
      description: 'Size of the QR code in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the QR code',
    },
    background: {
      control: 'color',
      description: 'Background color',
    },
    'error-correction': {
      control: 'select',
      options: ['L', 'M', 'Q', 'H'],
      description: 'Error correction level',
    },
    margin: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Margin in modules',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-qrcode value="https://example.com"></rell-qrcode>
  `,
};

export const CustomSize: Story = {
  render: () => `
    <rell-qrcode value="https://example.com" size="300"></rell-qrcode>
  `,
};

export const CustomColors: Story = {
  render: () => `
    <rell-qrcode 
      value="https://example.com" 
      color="#00ffff" 
      background="#0a0a0f">
    </rell-qrcode>
  `,
};

export const Text: Story = {
  render: () => `
    <rell-qrcode value="Hello, World!"></rell-qrcode>
  `,
};

export const URL: Story = {
  render: () => `
    <rell-qrcode value="https://github.com"></rell-qrcode>
  `,
};

export const Email: Story = {
  render: () => `
    <rell-qrcode value="mailto:example@example.com"></rell-qrcode>
  `,
};

export const Phone: Story = {
  render: () => `
    <rell-qrcode value="tel:+1234567890"></rell-qrcode>
  `,
};

export const WithMethods: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <rell-qrcode id="qrcode-demo" value="https://example.com"></rell-qrcode>
      <div style="display: flex; gap: 1rem;">
        <rell-button onclick="getDataURL()" variant="secondary">Получить Data URL</rell-button>
        <rell-button onclick="downloadQR()" variant="primary">Скачать</rell-button>
      </div>
    </div>
    <script>
      function getDataURL() {
        const qrcode = document.querySelector('#qrcode-demo');
        if (qrcode) {
          const dataURL = qrcode.getDataURL();
          console.log('Data URL:', dataURL);
          alert('Data URL скопирован в консоль');
        }
      }
      
      function downloadQR() {
        const qrcode = document.querySelector('#qrcode-demo');
        if (qrcode) {
          qrcode.download('qrcode.png');
        }
      }
    </script>
  `,
};

export const DifferentSizes: Story = {
  render: () => `
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <rell-qrcode value="Small" size="100"></rell-qrcode>
        <span style="font-size: 0.875rem; color: var(--rell-text-secondary);">100px</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <rell-qrcode value="Medium" size="200"></rell-qrcode>
        <span style="font-size: 0.875rem; color: var(--rell-text-secondary);">200px</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <rell-qrcode value="Large" size="300"></rell-qrcode>
        <span style="font-size: 0.875rem; color: var(--rell-text-secondary);">300px</span>
      </div>
    </div>
  `,
};

