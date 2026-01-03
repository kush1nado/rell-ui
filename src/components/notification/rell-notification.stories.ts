import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Notification',
  component: 'rell-notification',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Notification type',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'],
      description: 'Notification position',
    },
    duration: {
      control: 'number',
      description: 'Auto-close duration in milliseconds',
    },
    'auto-close': {
      control: 'boolean',
      description: 'Auto-close notification',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'success');
    notification.setAttribute('position', 'top-right');
    notification.innerHTML = `
      <div class="notification-title">Success!</div>
      <div class="notification-message">Operation completed successfully.</div>
    `;
    return notification;
  },
};

export const Warning: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'warning');
    notification.setAttribute('position', 'top-right');
    notification.innerHTML = `
      <div class="notification-title">Warning</div>
      <div class="notification-message">Please check your input.</div>
    `;
    return notification;
  },
};

export const Error: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'error');
    notification.setAttribute('position', 'top-right');
    notification.innerHTML = `
      <div class="notification-title">Error</div>
      <div class="notification-message">An error occurred. Please try again.</div>
    `;
    return notification;
  },
};

export const Info: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'info');
    notification.setAttribute('position', 'top-right');
    notification.innerHTML = `
      <div class="notification-title">Information</div>
      <div class="notification-message">Here is some useful information.</div>
    `;
    return notification;
  },
};

export const Positions: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '400px';
    container.style.border = '1px dashed var(--rell-border-default)';
    
    const positions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];
    
    positions.forEach((pos, index) => {
      const notification = document.createElement('rell-notification');
      notification.setAttribute('type', 'info');
      notification.setAttribute('position', pos);
      notification.setAttribute('auto-close', 'false');
      notification.innerHTML = `<div class="notification-message">${pos}</div>`;
      container.appendChild(notification);
    });
    
    return container;
  },
};

export const AutoClose: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'success');
    notification.setAttribute('position', 'top-right');
    notification.setAttribute('duration', '3000');
    notification.innerHTML = `
      <div class="notification-message">This notification will auto-close in 3 seconds</div>
    `;
    return notification;
  },
};

export const ManualClose: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'info');
    notification.setAttribute('position', 'top-right');
    notification.setAttribute('auto-close', 'false');
    notification.innerHTML = `
      <div class="notification-title">Manual Close</div>
      <div class="notification-message">Click × to close this notification.</div>
    `;
    return notification;
  },
};

export const Simple: Story = {
  render: () => {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('type', 'success');
    notification.setAttribute('position', 'top-right');
    notification.innerHTML = `
      <div class="notification-message">Simple notification message</div>
    `;
    return notification;
  },
};

