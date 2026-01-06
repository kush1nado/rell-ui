import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ItemList',
  component: 'rell-item-list',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'List orientation',
    },
    gap: {
      control: 'text',
      description: 'Gap between items',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'List variant',
    },
    dividers: {
      control: 'boolean',
      description: 'Show dividers between items',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => `
    <rell-item-list>
      <rell-item>
        <span slot="title">First Item</span>
      </rell-item>
      <rell-item>
        <span slot="title">Second Item</span>
      </rell-item>
      <rell-item>
        <span slot="title">Third Item</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const WithDescriptions: Story = {
  render: () => `
    <rell-item-list>
      <rell-item clickable>
        <span slot="title">Dashboard</span>
        <span slot="description">View your dashboard</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Settings</span>
        <span slot="description">Manage your settings</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Profile</span>
        <span slot="description">Edit your profile</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <rell-item-list>
      <rell-item clickable>
        <rell-svg name="home" size="20" slot="icon"></rell-svg>
        <span slot="title">Home</span>
      </rell-item>
      <rell-item clickable>
        <rell-svg name="user" size="20" slot="icon"></rell-svg>
        <span slot="title">Profile</span>
      </rell-item>
      <rell-item clickable>
        <rell-svg name="settings" size="20" slot="icon"></rell-svg>
        <span slot="title">Settings</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const WithDividers: Story = {
  render: () => `
    <rell-item-list dividers>
      <rell-item clickable>
        <span slot="title">First Item</span>
        <span slot="description">Description for first item</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Second Item</span>
        <span slot="description">Description for second item</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Third Item</span>
        <span slot="description">Description for third item</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const Variants: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <div>
        <rell-typography variant="h4">Default</rell-typography>
        <rell-item-list variant="default">
          <rell-item clickable>
            <span slot="title">Item 1</span>
          </rell-item>
          <rell-item clickable>
            <span slot="title">Item 2</span>
          </rell-item>
        </rell-item-list>
      </div>
      <div>
        <rell-typography variant="h4">Outlined</rell-typography>
        <rell-item-list variant="outlined">
          <rell-item clickable>
            <span slot="title">Item 1</span>
          </rell-item>
          <rell-item clickable>
            <span slot="title">Item 2</span>
          </rell-item>
        </rell-item-list>
      </div>
      <div>
        <rell-typography variant="h4">Filled</rell-typography>
        <rell-item-list variant="filled">
          <rell-item clickable>
            <span slot="title">Item 1</span>
          </rell-item>
          <rell-item clickable>
            <span slot="title">Item 2</span>
          </rell-item>
        </rell-item-list>
      </div>
    </rell-stack>
  `,
};

export const Horizontal: Story = {
  render: () => `
    <rell-item-list orientation="horizontal">
      <rell-item clickable>
        <span slot="title">Home</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">About</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Contact</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const WithSelected: Story = {
  render: () => `
    <rell-item-list>
      <rell-item selected clickable>
        <span slot="title">Selected Item</span>
        <span slot="description">This item is selected</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Normal Item</span>
        <span slot="description">This is a normal item</span>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Another Item</span>
        <span slot="description">Another normal item</span>
      </rell-item>
    </rell-item-list>
  `,
};

export const WithActions: Story = {
  render: () => `
    <rell-item-list>
      <rell-item clickable>
        <span slot="title">Item with Action</span>
        <span slot="description">This item has an action button</span>
        <rell-button variant="ghost" size="sm" slot="action">Edit</rell-button>
      </rell-item>
      <rell-item clickable>
        <span slot="title">Another Item</span>
        <span slot="description">With another action</span>
        <rell-button variant="ghost" size="sm" slot="action">Delete</rell-button>
      </rell-item>
    </rell-item-list>
  `,
};

export const Complex: Story = {
  render: () => `
    <rell-item-list variant="outlined" dividers>
      <rell-item clickable>
        <rell-svg name="home" size="20" slot="icon"></rell-svg>
        <span slot="title">Dashboard</span>
        <span slot="description">View your dashboard and analytics</span>
        <rell-badge variant="primary" slot="action">New</rell-badge>
      </rell-item>
      <rell-item selected clickable>
        <rell-svg name="user" size="20" slot="icon"></rell-svg>
        <span slot="title">Profile</span>
        <span slot="description">Manage your profile settings</span>
      </rell-item>
      <rell-item clickable>
        <rell-svg name="settings" size="20" slot="icon"></rell-svg>
        <span slot="title">Settings</span>
        <span slot="description">Configure application settings</span>
        <rell-button variant="ghost" size="sm" slot="action">Configure</rell-button>
      </rell-item>
    </rell-item-list>
  `,
};

export const Draggable: Story = {
  render: () => {
    const list = document.createElement('rell-item-list');
    list.setAttribute('draggable', '');
    list.setAttribute('variant', 'outlined');
    
    const items = [
      { id: '1', title: 'First Item', description: 'Drag me to reorder' },
      { id: '2', title: 'Second Item', description: 'Drag me to reorder' },
      { id: '3', title: 'Third Item', description: 'Drag me to reorder' },
      { id: '4', title: 'Fourth Item', description: 'Drag me to reorder' },
    ];

    items.forEach(item => {
      const itemEl = document.createElement('rell-item');
      itemEl.setAttribute('data-id', item.id);
      itemEl.setAttribute('clickable', '');
      
      const title = document.createElement('span');
      title.setAttribute('slot', 'title');
      title.textContent = item.title;
      
      const desc = document.createElement('span');
      desc.setAttribute('slot', 'description');
      desc.textContent = item.description;
      
      itemEl.appendChild(title);
      itemEl.appendChild(desc);
      list.appendChild(itemEl);
    });

    list.addEventListener('order-changed', ((e: CustomEvent) => {
      console.log('New order:', e.detail.order);
      const orderData = (list as any).getOrderAsData();
      console.log('Order data:', orderData);
    }) as EventListener);

    return list;
  },
};

export const DraggableWithIcons: Story = {
  render: () => {
    const list = document.createElement('rell-item-list');
    list.setAttribute('draggable', '');
    list.setAttribute('variant', 'filled');
    list.setAttribute('dividers', '');
    
    const items = [
      { id: '1', icon: 'home', title: 'Home', description: 'Go to home page' },
      { id: '2', icon: 'user', title: 'Profile', description: 'View your profile' },
      { id: '3', icon: 'settings', title: 'Settings', description: 'Configure settings' },
    ];

    items.forEach(item => {
      const itemEl = document.createElement('rell-item');
      itemEl.setAttribute('data-id', item.id);
      itemEl.setAttribute('clickable', '');
      
      const icon = document.createElement('rell-svg');
      icon.setAttribute('slot', 'icon');
      icon.setAttribute('name', item.icon);
      icon.setAttribute('size', '20');
      
      const title = document.createElement('span');
      title.setAttribute('slot', 'title');
      title.textContent = item.title;
      
      const desc = document.createElement('span');
      desc.setAttribute('slot', 'description');
      desc.textContent = item.description;
      
      itemEl.appendChild(icon);
      itemEl.appendChild(title);
      itemEl.appendChild(desc);
      list.appendChild(itemEl);
    });

    return list;
  },
};

