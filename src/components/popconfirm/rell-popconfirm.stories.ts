import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Popconfirm',
  component: 'rell-popconfirm',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the popconfirm',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    'confirm-text': {
      control: 'text',
      description: 'Confirm button text',
    },
    'cancel-text': {
      control: 'text',
      description: 'Cancel button text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'danger'],
      description: 'Variant of the confirm button',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-popconfirm title="Удалить элемент?" description="Это действие нельзя отменить.">
      <rell-button slot="trigger" variant="danger">Удалить</rell-button>
    </rell-popconfirm>
    <script>
      (function() {
        setTimeout(() => {
          const popconfirm = document.querySelector('rell-popconfirm');
          if (popconfirm) {
            popconfirm.addEventListener('confirm', () => {
              console.log('Confirmed!');
              alert('Подтверждено!');
            });
            popconfirm.addEventListener('cancel', () => {
              console.log('Cancelled!');
            });
          }
        }, 100);
      })();
    </script>
  `,
};

export const WithDescription: Story = {
  render: () => `
    <rell-popconfirm 
      title="Сохранить изменения?" 
      description="Все несохраненные изменения будут потеряны."
      confirm-text="Сохранить"
      cancel-text="Отмена">
      <rell-button slot="trigger" variant="primary">Сохранить</rell-button>
    </rell-popconfirm>
  `,
};

export const Danger: Story = {
  render: () => `
    <rell-popconfirm 
      title="Удалить навсегда?" 
      description="Это действие нельзя отменить. Все данные будут удалены."
      variant="danger"
      confirm-text="Удалить"
      cancel-text="Отмена">
      <rell-button slot="trigger" variant="danger">Удалить</rell-button>
    </rell-popconfirm>
  `,
};

export const Positions: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center; padding: 4rem;">
      <rell-popconfirm position="bottom" title="Снизу">
        <rell-button slot="trigger" variant="primary">Bottom</rell-button>
      </rell-popconfirm>
      
      <div style="display: flex; gap: 2rem;">
        <rell-popconfirm position="right" title="Справа">
          <rell-button slot="trigger" variant="primary">Right</rell-button>
        </rell-popconfirm>
        
        <rell-popconfirm position="left" title="Слева">
          <rell-button slot="trigger" variant="primary">Left</rell-button>
        </rell-popconfirm>
      </div>
      
      <rell-popconfirm position="top" title="Сверху">
        <rell-button slot="trigger" variant="primary">Top</rell-button>
      </rell-popconfirm>
    </div>
  `,
};

export const WithMethods: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rell-popconfirm id="popconfirm-demo" title="Подтвердите действие">
        <rell-button slot="trigger" variant="primary">Открыть Popconfirm</rell-button>
      </rell-popconfirm>
      <div style="display: flex; gap: 1rem;">
        <rell-button onclick="openPopconfirm()" variant="secondary">Открыть</rell-button>
        <rell-button onclick="closePopconfirm()" variant="secondary">Закрыть</rell-button>
        <rell-button onclick="togglePopconfirm()" variant="secondary">Переключить</rell-button>
      </div>
    </div>
    <script>
      function openPopconfirm() {
        const popconfirm = document.querySelector('#popconfirm-demo');
        if (popconfirm) {
          popconfirm.open();
        }
      }
      
      function closePopconfirm() {
        const popconfirm = document.querySelector('#popconfirm-demo');
        if (popconfirm) {
          popconfirm.close();
        }
      }
      
      function togglePopconfirm() {
        const popconfirm = document.querySelector('#popconfirm-demo');
        if (popconfirm) {
          popconfirm.toggle();
        }
      }
    </script>
  `,
};

