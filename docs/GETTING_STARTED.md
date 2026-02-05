# Getting Started

## Installation

```bash
npm install rell-ui
```

## Quick Start

### 1. Import the Library

#### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/rell-ui/dist/tokens/theme.css">
  <script type="module" src="node_modules/rell-ui/dist/index.js"></script>
</head>
<body>
  <rell-button variant="primary">Click me</rell-button>
</body>
</html>
```

#### React

```jsx
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

function App() {
  return <rell-button variant="primary">Click me</rell-button>;
}
```

#### Vue

```vue
<template>
  <rell-button variant="primary">Click me</rell-button>
</template>

<script setup>
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';
</script>
```

#### Angular

```typescript
// main.ts
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

// component.ts
@Component({
  selector: 'app-root',
  template: '<rell-button variant="primary">Click me</rell-button>'
})
```

#### Svelte

```svelte
<script>
  import 'rell-ui/dist/index.js';
  import 'rell-ui/theme.css';
</script>

<rell-button variant="primary">Click me</rell-button>
```

## Basic Usage

### Working with Attributes

All components use HTML attributes for configuration:

```html
<rell-button 
  variant="primary" 
  size="lg" 
  disabled>
  Button Text
</rell-button>
```

### Working with Events

Components dispatch standard DOM events:

```javascript
const button = document.querySelector('rell-button');
button.addEventListener('click', (e) => {
  console.log('Button clicked!');
});

const input = document.querySelector('rell-input');
input.addEventListener('input', (e) => {
  console.log('Value:', e.detail.value);
});
```

### Working with Methods

Many components expose methods for programmatic control:

```javascript
const dialog = document.querySelector('rell-dialog');
dialog.open();  // Open dialog
dialog.close(); // Close dialog

const form = document.querySelector('rell-form');
const data = form.getFormDataAsObject(); // Get form data
form.validate(); // Validate form
form.reset();    // Reset form
```

### Working with Slots

Some components use slots for content:

```html
<rell-card>
  <div slot="header">Card Header</div>
  <div>Card Body</div>
  <div slot="footer">Card Footer</div>
</rell-card>
```

## Next Steps

- Read [Framework Integration Guide](./FRAMEWORK_INTEGRATION.md)
- Explore [Component Examples](./COMPONENT_EXAMPLES.md)
- Learn about [Styling & Theming](./STYLING.md)
- Check [Best Practices](./BEST_PRACTICES.md)



