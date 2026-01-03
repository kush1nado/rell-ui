import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Typography',
  component: 'rell-typography',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'small'],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'disabled', 'accent', 'success', 'warning', 'error', 'info'],
      description: 'Text color',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    'font-family': {
      control: 'select',
      options: ['sans', 'mono'],
      description: 'Font family',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Heading1: Story = {
  render: () => {
    const el = document.createElement('rell-typography');
    el.setAttribute('variant', 'h1');
    el.textContent = 'Heading 1 - Cyberpunk Future';
    return el;
  },
};

export const Heading2: Story = {
  render: () => {
    const el = document.createElement('rell-typography');
    el.setAttribute('variant', 'h2');
    el.textContent = 'Heading 2 - Neon Dreams';
    return el;
  },
};

export const Heading3: Story = {
  render: () => {
    const el = document.createElement('rell-typography');
    el.setAttribute('variant', 'h3');
    el.textContent = 'Heading 3 - Digital Reality';
    return el;
  },
};

export const Body: Story = {
  render: () => {
    const el = document.createElement('rell-typography');
    el.setAttribute('variant', 'body');
    el.textContent = 'Body text - This is the default body text style. Use it for paragraphs and general content.';
    return el;
  },
};

export const Colors: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '1rem';
    
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'];
    const labels = ['Primary Text', 'Secondary Text', 'Accent Text (Cyan)', 'Success Text', 'Warning Text', 'Error Text'];
    
    colors.forEach((color, i) => {
      const el = document.createElement('rell-typography');
      el.setAttribute('variant', 'h4');
      el.setAttribute('color', color);
      el.textContent = labels[i];
      wrapper.appendChild(el);
    });
    
    return wrapper;
  },
};

export const FontWeights: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '1rem';
    
    const weights = ['light', 'normal', 'medium', 'semibold', 'bold'];
    const labels = ['Light Weight', 'Normal Weight', 'Medium Weight', 'Semibold Weight', 'Bold Weight'];
    
    weights.forEach((weight, i) => {
      const el = document.createElement('rell-typography');
      el.setAttribute('variant', 'body');
      el.setAttribute('weight', weight);
      el.textContent = labels[i];
      wrapper.appendChild(el);
    });
    
    return wrapper;
  },
};

export const FontFamilies: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '1rem';
    
    const sans = document.createElement('rell-typography');
    sans.setAttribute('variant', 'body');
    sans.setAttribute('font-family', 'sans');
    sans.textContent = 'Sans-serif font family - Perfect for UI text';
    
    const mono = document.createElement('rell-typography');
    mono.setAttribute('variant', 'body');
    mono.setAttribute('font-family', 'mono');
    mono.textContent = 'Monospace font family - Great for code and technical content';
    
    wrapper.appendChild(sans);
    wrapper.appendChild(mono);
    
    return wrapper;
  },
};

export const AllVariants: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '1.5rem';
    
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'small'];
    const labels = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Body text', 'Caption text', 'Small text'];
    
    variants.forEach((variant, i) => {
      const el = document.createElement('rell-typography');
      el.setAttribute('variant', variant);
      el.textContent = labels[i];
      wrapper.appendChild(el);
    });
    
    return wrapper;
  },
};

