# Framework Integration

Rell UI works seamlessly with any framework or vanilla JavaScript. This guide covers integration patterns for popular frameworks.

## React

### Basic Setup

```jsx
// App.jsx or main.jsx
import 'rell-ui';
import 'rell-ui/theme.css';

function App() {
  return (
    <rell-container>
      <rell-button variant="primary">Click me</rell-button>
    </rell-container>
  );
}
```

### TypeScript: refs and events

Import component classes for typed refs and event detail types from `rell-ui`:

```tsx
import type { RellDialog, RellInputChangeEventDetail } from 'rell-ui';
import { useRef, useEffect } from 'react';

function MyForm() {
  const dialogRef = useRef<RellDialog | null>(null);

  useEffect(() => {
    const input = document.querySelector('rell-input');
    if (!input) return;
    const handler = (e: CustomEvent<RellInputChangeEventDetail>) => {
      console.log(e.detail.value);
    };
    input.addEventListener('input', handler as EventListener);
    return () => input.removeEventListener('input', handler as EventListener);
  }, []);

  const openDialog = () => dialogRef.current?.open();

  return (
    <>
      <rell-input placeholder="Type here" />
      <rell-dialog ref={dialogRef}>...</rell-dialog>
      <rell-button onClick={openDialog}>Open</rell-button>
    </>
  );
}
```

The package augments React JSX so `rell-*` tags and their props are typed; refs use the corresponding class (e.g. `useRef<RellDialog>`). Event detail types (`RellInputChangeEventDetail`, `RellCalendarChangeEventDetail`, etc.) are exported for use with `CustomEvent<T>`.

### Handling Events

```jsx
import { useRef, useEffect } from 'react';

function MyComponent() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleClick);
      return () => button.removeEventListener('click', handleClick);
    }
  }, []);

  const handleClick = (e) => {
    console.log('Button clicked!');
  };

  return <rell-button ref={buttonRef}>Click me</rell-button>;
}
```

### Using with React State

```jsx
import { useState, useRef, useEffect } from 'react';

function FormComponent() {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.addEventListener('input', (e) => {
        setValue(e.detail.value);
      });
    }
  }, []);

  return (
    <rell-input 
      ref={inputRef}
      value={value}
      placeholder="Enter text..."
    />
  );
}
```

### Wrapper Components (Optional)

You can create React wrapper components for better TypeScript support:

```tsx
// components/RellButton.tsx
import React, { useRef, useEffect } from 'react';

interface RellButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: Event) => void;
  children: React.ReactNode;
}

export const RellButton: React.FC<RellButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button && onClick) {
      button.addEventListener('click', onClick);
      return () => button.removeEventListener('click', onClick);
    }
  }, [onClick]);

  return (
    <rell-button
      ref={buttonRef}
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </rell-button>
  );
};
```

## Vue 3

### Basic Setup

```vue
<template>
  <rell-container>
    <rell-button variant="primary" @click="handleClick">
      Click me
    </rell-button>
  </rell-container>
</template>

<script setup>
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

const handleClick = (e) => {
  console.log('Button clicked!');
};
</script>
```

### Using with Vue Reactive State

```vue
<template>
  <rell-input 
    :value="inputValue"
    @input="handleInput"
    placeholder="Enter text..."
  />
  <p>Value: {{ inputValue }}</p>
</template>

<script setup>
import { ref } from 'vue';
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

const inputValue = ref('');

const handleInput = (e) => {
  inputValue.value = e.detail.value;
};
</script>
```

### Using Component Methods

```vue
<template>
  <rell-dialog ref="dialogRef">
    <div slot="header">Dialog Title</div>
    <div>Dialog Content</div>
  </rell-dialog>
  <rell-button @click="openDialog">Open Dialog</rell-button>
</template>

<script setup>
import { ref } from 'vue';
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

const dialogRef = ref(null);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.open();
  }
};
</script>
```

## Angular

### Basic Setup

```typescript
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

platformBrowserDynamic().bootstrapModule(AppModule);
```

### Component Usage

```typescript
// app.component.ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <rell-button 
      #buttonRef
      variant="primary"
      (click)="handleClick($event)">
      Click me
    </rell-button>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('buttonRef') buttonRef!: ElementRef;

  ngAfterViewInit() {
    const button = this.buttonRef.nativeElement;
    button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e: Event) {
    console.log('Button clicked!');
  }
}
```

## Svelte

### Basic Setup

```svelte
<!-- App.svelte -->
<script>
  import 'rell-ui/dist/index.js';
  import 'rell-ui/theme.css';

  let inputValue = '';

  function handleInput(e) {
    inputValue = e.detail.value;
  }
</script>

<rell-container>
  <rell-input 
    value={inputValue}
    on:input={handleInput}
    placeholder="Enter text..."
  />
  <p>Value: {inputValue}</p>
</rell-container>
```

### Using Component Methods

```svelte
<script>
  import { onMount } from 'svelte';
  import 'rell-ui/dist/index.js';
  import 'rell-ui/theme.css';

  let dialogElement;

  function openDialog() {
    if (dialogElement) {
      dialogElement.open();
    }
  }

  onMount(() => {
    // Component is mounted
  });
</script>

<rell-dialog bind:this={dialogElement}>
  <div slot="header">Dialog Title</div>
  <div>Dialog Content</div>
</rell-dialog>

<rell-button on:click={openDialog}>Open Dialog</rell-button>
```

## TypeScript Support

All components have full TypeScript support. Import types from `rell-ui`:

```typescript
import type { RellButton, RellInput, RellInputChangeEventDetail } from 'rell-ui';

// Type assertions for refs or querySelector
const button = document.querySelector('rell-button') as RellButton;
button.variant = 'primary';

// Typed custom event detail (e.g. in React addEventListener)
input.addEventListener('input', (e: CustomEvent<RellInputChangeEventDetail>) => {
  console.log(e.detail.value);
});
```

**Vue / Svelte:** For typed refs and events in Vue or Svelte, add a reference so the package types are loaded (e.g. in `env.d.ts` or a global `.d.ts`): `/// <reference types="rell-ui/vue" />` (Vue) or `/// <reference types="rell-ui/svelte" />` (Svelte). Then import component and event types from `rell-ui` as above.

## Common Patterns

### Form Handling

```javascript
// Get form data
const form = document.querySelector('rell-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = form.getFormDataAsObject();
  console.log('Form data:', data);
});
```

### Dynamic Component Creation

```javascript
// Create component programmatically
const button = document.createElement('rell-button');
button.setAttribute('variant', 'primary');
button.textContent = 'Dynamic Button';
document.body.appendChild(button);
```

### Conditional Rendering

```javascript
// Show/hide components
const dialog = document.querySelector('rell-dialog');
if (shouldShow) {
  dialog.setAttribute('open', '');
} else {
  dialog.removeAttribute('open');
}
```



