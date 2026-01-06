import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'rell-tabs',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Active tab value',
    },
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
      description: 'Tabs variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tabs size',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-tabs>
      <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
      <rell-tab slot="tabs" value="tab2">Tab 2</rell-tab>
      <rell-tab slot="tabs" value="tab3">Tab 3</rell-tab>
      
      <rell-tab-panel slot="panels" value="tab1">
        <rell-typography variant="h4">Content for Tab 1</rell-typography>
        <rell-typography variant="body" color="secondary">
          This is the content of the first tab. You can add any content here.
        </rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab2">
        <rell-typography variant="h4">Content for Tab 2</rell-typography>
        <rell-typography variant="body" color="secondary">
          This is the content of the second tab.
        </rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab3">
        <rell-typography variant="h4">Content for Tab 3</rell-typography>
        <rell-typography variant="body" color="secondary">
          This is the content of the third tab.
        </rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  `,
};

export const WithInitialValue: Story = {
  render: () => `
    <rell-tabs value="tab2">
      <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
      <rell-tab slot="tabs" value="tab2">Tab 2</rell-tab>
      <rell-tab slot="tabs" value="tab3">Tab 3</rell-tab>
      
      <rell-tab-panel slot="panels" value="tab1">
        <rell-typography variant="body">Tab 1 content</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab2">
        <rell-typography variant="body">Tab 2 content (initially active)</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab3">
        <rell-typography variant="body">Tab 3 content</rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <rell-tabs>
      <rell-tab slot="tabs" value="home">
        <span>Home</span>
      </rell-tab>
      <rell-tab slot="tabs" value="settings">
        <span>Settings</span>
      </rell-tab>
      <rell-tab slot="tabs" value="profile">
        <span>Profile</span>
      </rell-tab>
      
      <rell-tab-panel slot="panels" value="home">
        <rell-typography variant="h4">Home</rell-typography>
        <rell-typography variant="body" color="secondary">Welcome home!</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="settings">
        <rell-typography variant="h4">Settings</rell-typography>
        <rell-typography variant="body" color="secondary">Configure your settings here.</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="profile">
        <rell-typography variant="h4">Profile</rell-typography>
        <rell-typography variant="body" color="secondary">View and edit your profile.</rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  `,
};

export const WithBadges: Story = {
  render: () => `
    <rell-tabs>
      <rell-tab slot="tabs" value="inbox">
        Inbox
        <rell-badge variant="error" size="sm">5</rell-badge>
      </rell-tab>
      <rell-tab slot="tabs" value="sent">
        Sent
      </rell-tab>
      <rell-tab slot="tabs" value="drafts">
        Drafts
        <rell-badge variant="warning" size="sm">2</rell-badge>
      </rell-tab>
      
      <rell-tab-panel slot="panels" value="inbox">
        <rell-typography variant="h4">Inbox</rell-typography>
        <rell-typography variant="body" color="secondary">You have 5 new messages.</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="sent">
        <rell-typography variant="h4">Sent</rell-typography>
        <rell-typography variant="body" color="secondary">Your sent messages.</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="drafts">
        <rell-typography variant="h4">Drafts</rell-typography>
        <rell-typography variant="body" color="secondary">You have 2 draft messages.</rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  `,
};

export const DisabledTab: Story = {
  render: () => `
    <rell-tabs>
      <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
      <rell-tab slot="tabs" value="tab2" disabled>Tab 2 (Disabled)</rell-tab>
      <rell-tab slot="tabs" value="tab3">Tab 3</rell-tab>
      
      <rell-tab-panel slot="panels" value="tab1">
        <rell-typography variant="body">Tab 1 content</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab2">
        <rell-typography variant="body">Tab 2 content (disabled)</rell-typography>
      </rell-tab-panel>
      
      <rell-tab-panel slot="panels" value="tab3">
        <rell-typography variant="body">Tab 3 content</rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <rell-typography variant="caption" color="secondary">Small</rell-typography>
        <rell-tabs size="sm">
          <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
          <rell-tab slot="tabs" value="tab2">Tab 2</rell-tab>
          <rell-tab-panel slot="panels" value="tab1"><rell-typography variant="body">Content 1</rell-typography></rell-tab-panel>
          <rell-tab-panel slot="panels" value="tab2"><rell-typography variant="body">Content 2</rell-typography></rell-tab-panel>
        </rell-tabs>
      </div>
      
      <div>
        <rell-typography variant="caption" color="secondary">Medium</rell-typography>
        <rell-tabs size="md">
          <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
          <rell-tab slot="tabs" value="tab2">Tab 2</rell-tab>
          <rell-tab-panel slot="panels" value="tab1"><rell-typography variant="body">Content 1</rell-typography></rell-tab-panel>
          <rell-tab-panel slot="panels" value="tab2"><rell-typography variant="body">Content 2</rell-typography></rell-tab-panel>
        </rell-tabs>
      </div>
      
      <div>
        <rell-typography variant="caption" color="secondary">Large</rell-typography>
        <rell-tabs size="lg">
          <rell-tab slot="tabs" value="tab1">Tab 1</rell-tab>
          <rell-tab slot="tabs" value="tab2">Tab 2</rell-tab>
          <rell-tab-panel slot="panels" value="tab1"><rell-typography variant="body">Content 1</rell-typography></rell-tab-panel>
          <rell-tab-panel slot="panels" value="tab2"><rell-typography variant="body">Content 2</rell-typography></rell-tab-panel>
        </rell-tabs>
      </div>
    </div>
  `,
};

export const WithCard: Story = {
  render: () => `
    <rell-card>
      <rell-tabs>
        <rell-tab slot="tabs" value="overview">Overview</rell-tab>
        <rell-tab slot="tabs" value="details">Details</rell-tab>
        <rell-tab slot="tabs" value="settings">Settings</rell-tab>
        
        <rell-tab-panel slot="panels" value="overview">
          <rell-typography variant="h4">Overview</rell-typography>
          <rell-typography variant="body" color="secondary">
            General information and statistics.
          </rell-typography>
        </rell-tab-panel>
        
        <rell-tab-panel slot="panels" value="details">
          <rell-typography variant="h4">Details</rell-typography>
          <rell-typography variant="body" color="secondary">
            Detailed information and data.
          </rell-typography>
        </rell-tab-panel>
        
        <rell-tab-panel slot="panels" value="settings">
          <rell-typography variant="h4">Settings</rell-typography>
          <rell-typography variant="body" color="secondary">
            Configuration options.
          </rell-typography>
        </rell-tab-panel>
      </rell-tabs>
    </rell-card>
  `,
};

