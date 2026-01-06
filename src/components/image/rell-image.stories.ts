import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Image',
  component: 'rell-image',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
    },
    width: {
      control: 'text',
      description: 'Image width',
    },
    height: {
      control: 'text',
      description: 'Image height',
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Object fit',
    },
    lazy: {
      control: 'boolean',
      description: 'Lazy loading',
    },
    fallback: {
      control: 'text',
      description: 'Fallback image URL',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    radius: {
      control: 'text',
      description: 'Border radius',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-image 
      src="https://picsum.photos/400/300" 
      alt="Random image"
      width="400px"
      height="300px"
    ></rell-image>
  `,
};

export const WithRadius: Story = {
  render: () => `
    <rell-image 
      src="https://picsum.photos/400/300" 
      alt="Random image"
      width="400px"
      height="300px"
      radius="1rem"
    ></rell-image>
  `,
};

export const FitOptions: Story = {
  render: () => `
    <rell-stack gap="1rem">
      <div>
        <rell-typography variant="caption" color="secondary">Cover</rell-typography>
        <rell-image 
          src="https://picsum.photos/200/200" 
          width="200px"
          height="200px"
          fit="cover"
        ></rell-image>
      </div>
      <div>
        <rell-typography variant="caption" color="secondary">Contain</rell-typography>
        <rell-image 
          src="https://picsum.photos/200/200" 
          width="200px"
          height="200px"
          fit="contain"
        ></rell-image>
      </div>
    </rell-stack>
  `,
};

export const LazyLoading: Story = {
  render: () => `
    <rell-stack gap="2rem">
      <rell-image 
        src="https://picsum.photos/400/300" 
        width="400px"
        height="300px"
        lazy
      ></rell-image>
      <rell-image 
        src="https://picsum.photos/400/301" 
        width="400px"
        height="300px"
        lazy
      ></rell-image>
    </rell-stack>
  `,
};

export const WithFallback: Story = {
  render: () => `
    <rell-image 
      src="https://invalid-url.com/image.jpg" 
      fallback="https://picsum.photos/400/300"
      width="400px"
      height="300px"
      alt="Image with fallback"
    ></rell-image>
  `,
};

export const WithPlaceholder: Story = {
  render: () => `
    <rell-image 
      src="https://picsum.photos/400/300" 
      width="400px"
      height="300px"
      placeholder="Loading image..."
    ></rell-image>
  `,
};

export const Responsive: Story = {
  render: () => `
    <rell-image 
      src="https://picsum.photos/800/600" 
      width="100%"
      height="auto"
      radius="0.5rem"
    ></rell-image>
  `,
};

