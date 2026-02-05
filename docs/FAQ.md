# Frequently Asked Questions

## General

### What is Rell UI?

Rell UI is a universal UI framework built with Web Components. It's framework-agnostic, meaning it works with React, Vue, Angular, Svelte, or vanilla JavaScript without any framework-specific code.

### Why Web Components?

Web Components are a web standard, providing:
- **Framework Independence**: Works with any framework or no framework
- **Native Browser Support**: No framework dependencies
- **Encapsulation**: Shadow DOM provides style isolation
- **Reusability**: Write once, use anywhere
- **Future-Proof**: Based on web standards

### Is Rell UI production-ready?

Yes! Rell UI is actively maintained and used in production. All components are fully functional and tested in Storybook.

### What browsers are supported?

Rell UI supports all modern browsers that support Web Components:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

For older browsers, you may need polyfills.

## Installation & Setup

### How do I install Rell UI?

```bash
npm install rell-ui
```

### Do I need to import CSS?

Yes! Always import the CSS file:

```javascript
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css'; // Required!
```

### Can I use it without a build tool?

Yes! You can use it directly in HTML:

```html
<link rel="stylesheet" href="node_modules/rell-ui/dist/tokens/theme.css">
<script type="module" src="node_modules/rell-ui/dist/index.js"></script>
```

## Usage

### How do I change component styles?

Use CSS custom properties (design tokens):

```css
:root {
  --rell-interactive-primary: #0066ff;
  --rell-bg-primary: #ffffff;
}
```

### Can I style Shadow DOM directly?

No, Shadow DOM provides style isolation. Use CSS variables or component attributes instead.

### How do I handle events?

Components dispatch standard DOM events:

```javascript
const button = document.querySelector('rell-button');
button.addEventListener('click', (e) => {
  console.log('Clicked!');
});
```

### How do I access component methods?

Many components expose methods:

```javascript
const dialog = document.querySelector('rell-dialog');
dialog.open();  // Method call
dialog.close(); // Method call
```

## Framework Integration

### Does it work with React?

Yes! See [Framework Integration Guide](./FRAMEWORK_INTEGRATION.md#react) for details.

### Does it work with Vue?

Yes! See [Framework Integration Guide](./FRAMEWORK_INTEGRATION.md#vue-3) for details.

### How do I use it with TypeScript?

All components have full TypeScript support. Import types:

```typescript
import type { RellButton } from 'rell-ui';

const button = document.querySelector('rell-button') as RellButton;
```

## Styling

### Can I customize the theme?

Yes! Override CSS custom properties:

```css
:root {
  --rell-bg-primary: #ffffff;
  --rell-text-primary: #000000;
  --rell-interactive-primary: #0066ff;
}
```

### Can I create a light theme?

Yes! Override the design tokens to create a light theme. See [Styling Guide](./STYLING.md) for details.

### How do I style slotted content?

Slotted content is not in Shadow DOM, so you can style it normally:

```html
<rell-card>
  <div class="custom-content">Content</div>
</rell-card>
```

```css
.custom-content {
  /* Styles apply normally */
}
```

## Components

### Why doesn't my CSS selector work?

Components use Shadow DOM, which isolates styles. Use CSS variables or component attributes instead.

### How do I know which events a component dispatches?

Check the component's Storybook documentation or source code. Most components dispatch standard events like `click`, `change`, `input`.

### Can I use components programmatically?

Yes! Create components dynamically:

```javascript
const button = document.createElement('rell-button');
button.setAttribute('variant', 'primary');
button.textContent = 'Click me';
document.body.appendChild(button);
```

## Performance

### Is Rell UI performant?

Yes! Rell UI uses native Web Components with minimal overhead. For large datasets, use `VirtualTable` component.

### How do I reduce bundle size?

Rell UI supports tree-shaking. Import only what you need:

```javascript
// Import specific components (if supported)
import 'rell-ui/dist/components/button.js';
import 'rell-ui/dist/components/input.js';
```

### Should I lazy load components?

For better performance, consider lazy loading components that aren't immediately visible:

```javascript
async function loadModal() {
  await import('rell-ui/dist/index.js');
  const modal = document.createElement('rell-modal');
  // Use modal
}
```

## Troubleshooting

### Components aren't rendering

1. Make sure you imported the CSS: `import 'rell-ui/theme.css'`
2. Check browser console for errors
3. Verify components are registered: `customElements.get('rell-button')`

### Styles aren't applying

1. Ensure CSS is imported
2. Check if you're trying to style Shadow DOM directly (won't work)
3. Use CSS variables for customization

### Events aren't firing

1. Check event names (case-sensitive)
2. Ensure event listeners are attached after component is in DOM
3. Check if events are composed (they should be by default)

### TypeScript errors

1. Make sure types are imported: `import type { RellButton } from 'rell-ui'`
2. Use type assertions: `as RellButton`
3. Check component method signatures

## Contributing

### Can I contribute?

Yes! Contributions are welcome. Please check the repository for contribution guidelines.

### How do I report a bug?

Open an issue on GitHub with:
- Component name
- Steps to reproduce
- Expected vs actual behavior
- Browser and version

### How do I request a feature?

Open an issue with:
- Feature description
- Use case
- Proposed API (if applicable)

## License

Rell UI is licensed under MIT License. See LICENSE file for details.


