import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/FileUpload',
  component: 'rell-file-upload',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file upload',
    },
    'max-size': {
      control: 'text',
      description: 'Maximum file size in bytes',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: 'Visual variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-file-upload></rell-file-upload>
    <script>
      (function() {
        setTimeout(() => {
          const upload = document.querySelector('rell-file-upload');
          if (upload) {
            upload.addEventListener('files-changed', (e) => {
              console.log('Files changed:', e.detail.files);
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const Multiple: Story = {
  render: () => `
    <rell-file-upload multiple></rell-file-upload>
  `,
};

export const WithAccept: Story = {
  render: () => `
    <rell-file-upload accept="image/*"></rell-file-upload>
  `,
};

export const WithMaxSize: Story = {
  render: () => `
    <rell-file-upload max-size="1048576"></rell-file-upload>
    <p style="margin-top: 1rem; color: var(--rell-text-secondary); font-size: 0.875rem;">
      Максимальный размер файла: 1 MB
    </p>
  `,
};

export const Outlined: Story = {
  render: () => `
    <rell-file-upload variant="outlined"></rell-file-upload>
  `,
};

export const Disabled: Story = {
  render: () => `
    <rell-file-upload disabled></rell-file-upload>
  `,
};

export const WithMethods: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-file-upload id="upload-demo"></rell-file-upload>
      <div style="display: flex; gap: 1rem;">
        <rell-button onclick="clearFiles()">Очистить</rell-button>
        <rell-button onclick="getFiles()" variant="secondary">Получить файлы</rell-button>
      </div>
    </div>
    <script>
      function clearFiles() {
        const upload = document.querySelector('#upload-demo');
        if (upload) {
          upload.clearFiles();
        }
      }
      
      function getFiles() {
        const upload = document.querySelector('#upload-demo');
        if (upload) {
          const files = upload.getFiles();
          console.log('Files:', files);
          alert('Файлов выбрано: ' + files.length);
        }
      }
    </script>
  `,
};

