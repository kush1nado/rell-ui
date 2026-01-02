# Rell UI

Universal UI framework built with Web Components. Framework-agnostic and dependency-free.

## Features

- 🧩 **Web Components** - Works with any framework or vanilla JavaScript
- 🎯 **Design Tokens** - Centralized design system with CSS custom properties
- 📚 **Storybook** - Interactive component documentation
- 🚀 **Zero Dependencies** - Pure native Web Components
- 🎨 **Dark Theme** - Modern dark theme with vibrant accents

## Installation

```bash
npm install
```

## Development

```bash
# Start Storybook
npm run storybook

# Build library
npm run build
```

## Components

- **Typography** - Typography system with multiple variants
- **Button** - Button component with multiple variants and sizes
- **Input** - Text input fields with validation states
- **Select** - Dropdown select component

## Usage

### Basic HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./src/tokens/theme.css">
  <script type="module" src="./src/components/index.js"></script>
</head>
<body>
  <rell-typography variant="h1">Hello World</rell-typography>
  <rell-button variant="primary">Click me</rell-button>
  <rell-input placeholder="Enter text..."></rell-input>
</body>
</html>
```

### React

```jsx
import 'rell-ui/dist/index.js';

function App() {
  return (
    <>
      <rell-typography variant="h1">Hello React</rell-typography>
      <rell-button variant="primary">Click me</rell-button>
    </>
  );
}
```

### Vue

```vue
<template>
  <rell-typography variant="h1">Hello Vue</rell-typography>
  <rell-button variant="primary">Click me</rell-button>
</template>

<script setup>
import 'rell-ui/dist/index.js';
</script>
```

## Design Tokens

The library uses a comprehensive design token system for colors, typography, spacing, shadows, and border radius. All tokens are available as CSS custom properties.

### Colors

```css
--rell-bg-primary: #0a0a0f;
--rell-text-primary: #e0e0e8;
--rell-accent-cyan: #00ffff;
```

### Typography

```css
--rell-font-sans: "Inter", "SF Pro Display", ...;
--rell-font-mono: "JetBrains Mono", "Fira Code", ...;
```

### Spacing

```css
--rell-spacing-1: 0.25rem;
--rell-spacing-2: 0.5rem;
--rell-spacing-4: 1rem;
```

## Component API

### Typography

```html
<rell-typography 
  variant="h1|h2|h3|h4|h5|h6|body|caption|small"
  color="primary|secondary|tertiary|accent|success|warning|error|info"
  weight="light|normal|medium|semibold|bold|extrabold"
  align="left|center|right|justify"
  font-family="sans|mono">
  Text content
</rell-typography>
```

### Button

```html
<rell-button 
  variant="primary|secondary|outline|ghost"
  size="sm|md|lg"
  disabled
  full-width>
  Button text
</rell-button>
```

### Input

```html
<rell-input 
  type="text|email|password|number|tel|url|search"
  placeholder="Placeholder text"
  value="Initial value"
  size="sm|md|lg"
  disabled
  error>
</rell-input>
```

### Select

```html
<rell-select 
  value="selected-value"
  size="sm|md|lg"
  disabled
  error>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</rell-select>
```

## Events

All components dispatch standard DOM events:

```javascript
const button = document.querySelector('rell-button');
button.addEventListener('click', (e) => {
  console.log('Button clicked');
});

const input = document.querySelector('rell-input');
input.addEventListener('input', (e) => {
  console.log('Input value:', e.detail.value);
});

const select = document.querySelector('rell-select');
select.addEventListener('change', (e) => {
  console.log('Selected value:', e.detail.value);
});
```

## License

MIT
