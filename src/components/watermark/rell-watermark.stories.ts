import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Watermark',
  component: 'rell-watermark',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Watermark text',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity of the watermark',
    },
    'font-size': {
      control: 'text',
      description: 'Font size of the watermark text',
    },
    color: {
      control: 'color',
      description: 'Color of the watermark',
    },
    rotate: {
      control: { type: 'range', min: -180, max: 180, step: 5 },
      description: 'Rotation angle in degrees',
    },
    gap: {
      control: 'text',
      description: 'Gap between watermark repetitions',
    },
    'z-index': {
      control: 'text',
      description: 'Z-index of the watermark',
    },
    mode: {
      control: 'select',
      options: ['text', 'pattern', 'grid'],
      description: 'Watermark mode',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <rell-watermark text="CONFIDENTIAL" style="width: 500px; height: 300px; border: 1px solid var(--rell-border-default); padding: 2rem;">
      <div style="padding: 2rem;">
        <h3>Документ с водяным знаком</h3>
        <p>Этот контент защищен водяным знаком.</p>
      </div>
    </rell-watermark>
  `,
};

export const CustomText: Story = {
  render: () => `
    <rell-watermark 
      text="DRAFT" 
      opacity="0.2" 
      font-size="24px"
      rotate="-30"
      style="width: 500px; height: 300px; border: 1px solid var(--rell-border-default); padding: 2rem;">
      <div style="padding: 2rem;">
        <h3>Черновик документа</h3>
        <p>Этот документ находится в стадии разработки.</p>
      </div>
    </rell-watermark>
  `,
};

export const Pattern: Story = {
  render: () => `
    <rell-watermark 
      mode="pattern"
      opacity="0.1"
      rotate="-45"
      gap="100px"
      style="width: 500px; height: 300px; border: 1px solid var(--rell-border-default); padding: 2rem;">
      <div style="padding: 2rem;">
        <h3>Документ с паттерном</h3>
        <p>Водяной знак в виде паттерна.</p>
      </div>
    </rell-watermark>
  `,
};

export const Grid: Story = {
  render: () => `
    <rell-watermark 
      mode="grid"
      opacity="0.15"
      gap="50px"
      style="width: 500px; height: 300px; border: 1px solid var(--rell-border-default); padding: 2rem;">
      <div style="padding: 2rem;">
        <h3>Документ с сеткой</h3>
        <p>Водяной знак в виде сетки.</p>
      </div>
    </rell-watermark>
  `,
};

export const CustomColor: Story = {
  render: () => `
    <rell-watermark 
      text="SECRET"
      color="#ff00ff"
      opacity="0.2"
      font-size="32px"
      rotate="-45"
      style="width: 500px; height: 300px; border: 1px solid var(--rell-border-default); padding: 2rem;">
      <div style="padding: 2rem;">
        <h3>Документ с цветным водяным знаком</h3>
        <p>Водяной знак с кастомным цветом.</p>
      </div>
    </rell-watermark>
  `,
};

export const OnImage: Story = {
  render: () => `
    <rell-watermark 
      text="COPYRIGHT 2024"
      opacity="0.3"
      font-size="20px"
      rotate="-45"
      gap="300px"
      style="width: 600px; height: 400px; position: relative;">
      <img src="https://via.placeholder.com/600x400/1a1a24/ffffff?text=Image" 
           style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" 
           alt="Image with watermark" />
    </rell-watermark>
  `,
};

