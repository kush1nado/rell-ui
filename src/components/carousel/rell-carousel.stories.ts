import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Carousel',
  component: 'rell-carousel',
  tags: ['autodocs'],
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    interval: {
      control: 'number',
      description: 'Autoplay interval in milliseconds',
    },
    loop: {
      control: 'boolean',
      description: 'Enable loop',
    },
    'show-dots': {
      control: 'boolean',
      description: 'Show navigation dots',
    },
    'show-arrows': {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-carousel show-dots show-arrows>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/00ffff/000000?text=Slide+1" alt="Slide 1" />
      </rell-carousel-item>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/ff00ff/000000?text=Slide+2" alt="Slide 2" />
      </rell-carousel-item>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/ffff00/000000?text=Slide+3" alt="Slide 3" />
      </rell-carousel-item>
    </rell-carousel>
  `,
};

export const WithContent: Story = {
  render: () => `
    <rell-carousel show-dots show-arrows>
      <rell-carousel-item>
        <div style="padding: 4rem; background: var(--rell-surface-elevated); text-align: center;">
          <h2>First Slide</h2>
          <p>This is the first slide content</p>
        </div>
      </rell-carousel-item>
      <rell-carousel-item>
        <div style="padding: 4rem; background: var(--rell-surface-elevated); text-align: center;">
          <h2>Second Slide</h2>
          <p>This is the second slide content</p>
        </div>
      </rell-carousel-item>
      <rell-carousel-item>
        <div style="padding: 4rem; background: var(--rell-surface-elevated); text-align: center;">
          <h2>Third Slide</h2>
          <p>This is the third slide content</p>
        </div>
      </rell-carousel-item>
    </rell-carousel>
  `,
};

export const Autoplay: Story = {
  render: () => `
    <rell-carousel autoplay interval="2000" loop show-dots>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/00ffff/000000?text=Auto+1" alt="Slide 1" />
      </rell-carousel-item>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/ff00ff/000000?text=Auto+2" alt="Slide 2" />
      </rell-carousel-item>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/ffff00/000000?text=Auto+3" alt="Slide 3" />
      </rell-carousel-item>
    </rell-carousel>
  `,
};

export const NoControls: Story = {
  render: () => `
    <rell-carousel show-arrows="false" show-dots="false">
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/00ffff/000000?text=Slide+1" alt="Slide 1" />
      </rell-carousel-item>
      <rell-carousel-item>
        <img src="https://via.placeholder.com/800x400/ff00ff/000000?text=Slide+2" alt="Slide 2" />
      </rell-carousel-item>
    </rell-carousel>
  `,
};

