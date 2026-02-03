import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'rell-accordion',
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items open',
    },
    variant: {
      control: 'select',
      options: ['default', 'separated'],
      description: 'Accordion variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-accordion>
      <rell-accordion-item value="1" open>
        <span slot="title">First Item</span>
        <p>This is the content of the first accordion item. It can contain any HTML content.</p>
      </rell-accordion-item>
      <rell-accordion-item value="2">
        <span slot="title">Second Item</span>
        <p>This is the content of the second accordion item.</p>
      </rell-accordion-item>
      <rell-accordion-item value="3">
        <span slot="title">Third Item</span>
        <p>This is the content of the third accordion item.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

export const Multiple: Story = {
  render: () => `
    <rell-accordion multiple>
      <rell-accordion-item value="1" open>
        <span slot="title">First Item</span>
        <p>This is the content of the first accordion item.</p>
      </rell-accordion-item>
      <rell-accordion-item value="2" open>
        <span slot="title">Second Item</span>
        <p>This is the content of the second accordion item.</p>
      </rell-accordion-item>
      <rell-accordion-item value="3">
        <span slot="title">Third Item</span>
        <p>This is the content of the third accordion item.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

export const Separated: Story = {
  render: () => `
    <rell-accordion variant="separated">
      <rell-accordion-item value="1">
        <span slot="title">First Item</span>
        <p>This is the content of the first accordion item.</p>
      </rell-accordion-item>
      <rell-accordion-item value="2">
        <span slot="title">Second Item</span>
        <p>This is the content of the second accordion item.</p>
      </rell-accordion-item>
      <rell-accordion-item value="3">
        <span slot="title">Third Item</span>
        <p>This is the content of the third accordion item.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <rell-accordion>
      <rell-accordion-item value="1">
        <rell-svg name="info" slot="icon" size="20"></rell-svg>
        <span slot="title">Information</span>
        <p>This accordion item has an icon.</p>
      </rell-accordion-item>
      <rell-accordion-item value="2">
        <rell-svg name="settings" slot="icon" size="20"></rell-svg>
        <span slot="title">Settings</span>
        <p>This accordion item also has an icon.</p>
      </rell-accordion-item>
      <rell-accordion-item value="3">
        <rell-svg name="help" slot="icon" size="20"></rell-svg>
        <span slot="title">Help</span>
        <p>This accordion item has a help icon.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

export const RichContent: Story = {
  render: () => `
    <rell-accordion>
      <rell-accordion-item value="1" open>
        <span slot="title">Rich Content</span>
        <div>
          <p>This accordion item contains rich content:</p>
          <rell-divider></rell-divider>
          <rell-item clickable>
            <span slot="title">Item 1</span>
            <span slot="description">Description for item 1</span>
          </rell-item>
          <rell-item clickable>
            <span slot="title">Item 2</span>
            <span slot="description">Description for item 2</span>
          </rell-item>
        </div>
      </rell-accordion-item>
      <rell-accordion-item value="2">
        <span slot="title">Another Item</span>
        <p>Regular content here.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

export const Disabled: Story = {
  render: () => `
    <rell-accordion>
      <rell-accordion-item value="1" open>
        <span slot="title">Enabled Item</span>
        <p>This item is enabled and can be toggled.</p>
      </rell-accordion-item>
      <rell-accordion-item value="2" disabled>
        <span slot="title">Disabled Item</span>
        <p>This item is disabled and cannot be toggled.</p>
      </rell-accordion-item>
      <rell-accordion-item value="3">
        <span slot="title">Another Enabled Item</span>
        <p>This item is also enabled.</p>
      </rell-accordion-item>
    </rell-accordion>
  `,
};

