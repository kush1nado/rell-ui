# Best Practices

Guidelines and recommendations for using Rell UI effectively.

## Component Usage

### 1. Always Import CSS

```javascript
// Correct
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

// Incorrect - components won't be styled
import 'rell-ui/dist/index.js';
```

### 2. Use Semantic HTML

```html
<!-- Correct - semantic structure -->
<rell-form>
  <rell-input name="email" type="email" required></rell-input>
  <rell-button type="submit">Submit</rell-button>
</rell-form>

<!-- Incorrect - missing form wrapper -->
<rell-input name="email"></rell-input>
<rell-button>Submit</rell-button>
```

### 3. Handle Events Properly

```javascript
// Correct - remove listeners on cleanup
const button = document.querySelector('rell-button');
const handler = (e) => console.log('clicked');
button.addEventListener('click', handler);

// Later, when component is removed
button.removeEventListener('click', handler);

// Incorrect - memory leak
button.addEventListener('click', () => console.log('clicked'));
```

### 4. Use Attributes for Configuration

```html
<!-- Correct - use attributes -->
<rell-button variant="primary" size="lg" disabled>
  Button
</rell-button>

<!-- Incorrect - don't set properties directly in HTML -->
<rell-button>
  <script>
    this.variant = 'primary'; // Won't work
  </script>
</rell-button>
```

## Performance

### 1. Lazy Load Components

```javascript
// Correct - load components when needed
async function loadComponent() {
  await import('rell-ui/dist/index.js');
  const dialog = document.createElement('rell-dialog');
  document.body.appendChild(dialog);
}

// Incorrect - loading everything upfront
import 'rell-ui/dist/index.js'; // Loads all components
```

### 2. Use Virtual Table for Large Datasets

```html
<!-- Correct - for large datasets -->
<rell-virtual-table id="large-table"></rell-virtual-table>

<script>
  const table = document.getElementById('large-table');
  table.setColumns(['name', 'email', 'status']);
  table.setData(largeDataset); // 10,000+ rows
</script>

<!-- Incorrect - regular table for large data -->
<rell-table>
  <!-- 10,000 rows - will be slow -->
</rell-table>
```

### 3. Debounce Input Events

```javascript
// Correct - debounce expensive operations
let timeout;
const input = document.querySelector('rell-input');
input.addEventListener('input', (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    // Expensive operation
    performSearch(e.detail.value);
  }, 300);
});
```

## Accessibility

### 1. Use Proper Labels

```html
<!-- Correct - accessible form -->
<label for="email-input">Email Address</label>
<rell-input id="email-input" name="email" type="email"></rell-input>

<!-- Or use aria-label -->
<rell-input 
  aria-label="Email Address"
  name="email" 
  type="email">
</rell-input>
```

### 2. Keyboard Navigation

```html
<!-- Correct - components support keyboard navigation -->
<rell-button tabindex="0">Click me</rell-button>

<!-- Ensure focusable elements are accessible -->
<rell-menu>
  <rell-menu-item tabindex="0">Item 1</rell-menu-item>
  <rell-menu-item tabindex="0">Item 2</rell-menu-item>
</rell-menu>
```

### 3. ARIA Attributes

```html
<!-- Correct - provide ARIA when needed -->
<rell-dialog 
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description">
  <div slot="header" id="dialog-title">Dialog Title</div>
  <div id="dialog-description">Dialog description</div>
</rell-dialog>
```

## Form Handling

### 1. Validate on Appropriate Events

```html
<!-- Correct - validate on blur for better UX -->
<rell-input 
  name="email"
  type="email"
  required
  validate-on="blur">
</rell-input>

<!-- Incorrect - validating on every keystroke -->
<rell-input 
  name="email"
  validate-on="input"> <!-- Too aggressive -->
</rell-input>
```

### 2. Use Form Component

```html
<!-- Correct - use form component for validation -->
<rell-form>
  <rell-input name="email" required></rell-input>
  <rell-button type="submit">Submit</rell-button>
</rell-form>

<script>
  const form = document.querySelector('rell-form');
  form.addEventListener('submit', (e) => {
    if (form.validate()) {
      const data = form.getFormDataAsObject();
      // Submit data
    }
  });
</script>
```

## State Management

### 1. Use Component Attributes for State

```javascript
// Correct - use attributes
const dialog = document.querySelector('rell-dialog');
dialog.setAttribute('open', ''); // Open
dialog.removeAttribute('open'); // Close

// Incorrect - don't rely on internal properties
dialog.open = true; // May not trigger updates
```

### 2. Listen to Component Events

```javascript
// Correct - listen to component events
const calendar = document.querySelector('rell-calendar');
calendar.addEventListener('change', (e) => {
  console.log('Date changed:', e.detail);
});

// Incorrect - polling for changes
setInterval(() => {
  const value = calendar.getAttribute('value');
  // Check for changes
}, 100);
```

## Styling

### 1. Override CSS Variables

```css
/* Correct - override design tokens */
.my-theme {
  --rell-interactive-primary: #0066ff;
  --rell-bg-primary: #ffffff;
}

/* Incorrect - trying to style Shadow DOM directly */
.my-theme rell-button button {
  background: red; /* Won't work */
}
```

### 2. Use Component Variants

```html
<!-- Correct - use built-in variants -->
<rell-button variant="primary">Primary</rell-button>
<rell-button variant="secondary">Secondary</rell-button>

<!-- Incorrect - creating custom variants when built-in exists -->
<rell-button class="custom-primary">Primary</rell-button>
```

## Error Handling

### 1. Check Component Existence

```javascript
// Correct - check if component exists
const dialog = document.querySelector('rell-dialog');
if (dialog) {
  dialog.open();
}

// Incorrect - assuming component exists
document.querySelector('rell-dialog').open(); // May throw error
```

### 2. Handle Component Errors

```javascript
// Correct - handle errors gracefully
try {
  const form = document.querySelector('rell-form');
  const data = form.getFormDataAsObject();
} catch (error) {
  console.error('Form error:', error);
  // Show user-friendly error message
}
```

## Common Pitfalls

### 1. Shadow DOM Isolation

```css
/* Won't work - Shadow DOM prevents direct styling */
rell-button button {
  color: red;
}

/* Works - use CSS variables */
rell-button {
  --rell-interactive-primary: red;
}
```

### 2. Event Bubbling

```javascript
// Correct - events bubble and compose
document.addEventListener('click', (e) => {
  if (e.target.closest('rell-button')) {
    console.log('Button clicked');
  }
});

// Events from Shadow DOM are composed by default
```

### 3. Dynamic Content

```javascript
// Correct - wait for component to be ready
const button = document.createElement('rell-button');
document.body.appendChild(button);
// Component is ready after appendChild

// Incorrect - accessing before ready
const button = document.createElement('rell-button');
button.setAttribute('variant', 'primary'); // May not work
document.body.appendChild(button);
```

## Testing

### 1. Test Component Behavior

```javascript
// Correct - test component behavior
const button = document.querySelector('rell-button');
button.click();
expect(button.hasAttribute('disabled')).toBe(false);

// Test events
button.addEventListener('click', (e) => {
  expect(e.type).toBe('click');
});
```

### 2. Test Accessibility

```javascript
// Correct - test accessibility
const input = document.querySelector('rell-input');
expect(input.getAttribute('aria-label')).toBeTruthy();
expect(input.hasAttribute('required')).toBe(true);
```

