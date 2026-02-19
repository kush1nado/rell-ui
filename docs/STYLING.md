# Styling & Theming

Rell UI uses a comprehensive design token system based on CSS custom properties, making it easy to customize and theme.

## Design Tokens

All design tokens are available as CSS custom properties and can be overridden.

### Colors

```css
/* Background colors */
--rell-bg-primary: #0a0a0f;
--rell-bg-secondary: #12121a;
--rell-bg-tertiary: #1a1a24;

/* Text colors */
--rell-text-primary: #e0e0e8;
--rell-text-secondary: #a0a0b0;
--rell-text-tertiary: #707080;
--rell-text-inverse: #ffffff;

/* Accent colors */
--rell-accent-cyan: #00ffff;
--rell-accent-magenta: #ff00ff;
--rell-accent-yellow: #ffff00;

/* Interactive colors */
--rell-interactive-primary: #00ffff;
--rell-interactive-primary-hover: #00cccc;
--rell-interactive-primary-active: #009999;

/* Status colors */
--rell-success: #00ff88;
--rell-warning: #ffaa00;
--rell-error: #ff4444;
--rell-info: #00aaff;
```

### Typography

```css
/* Font families */
--rell-font-sans: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--rell-font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;

/* Font sizes */
--rell-font-size-xs: 0.75rem;
--rell-font-size-sm: 0.875rem;
--rell-font-size-base: 1rem;
--rell-font-size-lg: 1.125rem;
--rell-font-size-xl: 1.25rem;
--rell-font-size-2xl: 1.5rem;
--rell-font-size-3xl: 1.875rem;
--rell-font-size-4xl: 2.25rem;
```

### Spacing

```css
--rell-spacing-0: 0;
--rell-spacing-1: 0.25rem;
--rell-spacing-2: 0.5rem;
--rell-spacing-3: 0.75rem;
--rell-spacing-4: 1rem;
--rell-spacing-5: 1.25rem;
--rell-spacing-6: 1.5rem;
--rell-spacing-8: 2rem;
--rell-spacing-10: 2.5rem;
--rell-spacing-12: 3rem;
--rell-spacing-16: 4rem;
--rell-spacing-20: 5rem;
--rell-spacing-24: 6rem;
```

### Border Radius

```css
--rell-radius-none: 0;
--rell-radius-sm: 0.25rem;
--rell-radius-md: 0.5rem;
--rell-radius-lg: 0.75rem;
--rell-radius-xl: 1rem;
--rell-radius-full: 9999px;
```

### Shadows

```css
--rell-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--rell-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--rell-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--rell-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
--rell-shadow-cyan: 0 0 20px rgba(0, 255, 255, 0.3);
--rell-shadow-magenta: 0 0 20px rgba(255, 0, 255, 0.3);
```

## Customizing Theme

### TypeScript: design tokens type

For typed overrides of design tokens (e.g. in React `style` prop or when setting CSS variables in JS), use the exported `RellDesignTokens` type:

```ts
import type { RellDesignTokens } from 'rell-ui';

const themeOverrides: RellDesignTokens = {
  '--rell-bg-primary': '#ffffff',
  '--rell-accent-cyan': '#00ffff',
};
// Use with element.style or React style={{ ...themeOverrides }}
```

### Override CSS Variables

```css
/* Custom theme */
:root {
  --rell-bg-primary: #ffffff;
  --rell-text-primary: #000000;
  --rell-interactive-primary: #0066ff;
}
```

### Scoped Theming

```css
/* Theme specific container */
.light-theme {
  --rell-bg-primary: #ffffff;
  --rell-text-primary: #000000;
}

.dark-theme {
  --rell-bg-primary: #0a0a0f;
  --rell-text-primary: #e0e0e8;
}
```

```html
<div class="light-theme">
  <rell-button variant="primary">Light Theme Button</rell-button>
</div>

<div class="dark-theme">
  <rell-button variant="primary">Dark Theme Button</rell-button>
</div>
```

## Custom Styling

### Using CSS Classes

You can style components using CSS classes:

```css
/* Style all buttons */
rell-button {
  border-radius: 8px;
}

/* Style specific variant */
rell-button[variant="primary"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Style with custom class */
.my-custom-button {
  --rell-interactive-primary: #ff6b6b;
}
```

```html
<rell-button class="my-custom-button" variant="primary">
  Custom Button
</rell-button>
```

### Using Slots for Custom Content

Many components support slots for custom styling:

```html
<rell-card>
  <div slot="header" class="custom-header">
    Custom Header Styling
  </div>
  <div class="custom-body">
    Custom Body Content
  </div>
</rell-card>
```

```css
.custom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}

.custom-body {
  padding: 1.5rem;
  background: var(--rell-bg-secondary);
}
```

## Component-Specific Styling

### Shadow DOM Styling

Components use Shadow DOM, so direct CSS selectors won't work. Use CSS variables or component attributes:

```css
/* Won't work - Shadow DOM isolation */
rell-button button {
  color: red;
}

/* Works - CSS variables */
rell-button {
  --rell-interactive-primary: red;
}

/* Works - Component attributes */
rell-button[variant="primary"] {
  /* Component handles styling internally */
}
```

### Global Styles

For global overrides, use CSS custom properties at the document level:

```css
/* Global theme override */
html {
  --rell-bg-primary: #ffffff;
  --rell-text-primary: #000000;
  --rell-interactive-primary: #0066ff;
}
```

## Responsive Design

Components work with standard CSS media queries:

```css
/* Responsive button sizing */
@media (max-width: 768px) {
  rell-button {
    width: 100%;
  }
}
```

## Best Practices

1. **Use CSS Variables**: Override design tokens rather than trying to style Shadow DOM directly
2. **Theme Scoping**: Use CSS classes or data attributes for theme scoping
3. **Consistent Spacing**: Use design token spacing values for consistency
4. **Color Accessibility**: Ensure sufficient contrast when overriding colors
5. **Component Variants**: Use built-in variants before creating custom styles

