# Rell UI

Universal UI framework built with Web Components. Framework-agnostic and dependency-free.

## Features

- **Web Components** - Works with any framework or vanilla JavaScript
- **Design Tokens** - Centralized design system with CSS custom properties
- **Storybook** - Interactive component documentation
- **Zero Dependencies** - Pure native Web Components
- **Dark Theme** - Modern dark theme with vibrant accents

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

### Form Components
- **Typography** - Typography system with multiple variants
- **Button** - Button component with multiple variants and sizes
- **Input** - Text input fields with validation states
- **Select** - Dropdown select component with single and multiple selection modes
- **Checkbox** - Checkbox component with group support
- **Radio** - Radio button component with group support
- **Switch** - Toggle switch component with group support
- **Form** - Form wrapper with validation and data collection
- **DatePicker** - Date picker with calendar interface
- **DateRangePicker** - Date range picker with two-step selection
- **Search** - Search input with clearable and loading states
- **Autocomplete** - Autocomplete input with suggestions
- **Slider** - Range slider with marks and value display
- **Rating** - Star rating component with half-star support
- **FileUpload** - File upload component with drag & drop support
- **Calendar** - Calendar component with date selection, range, and multiple selection modes

### Layout Components
- **Container** - Container component with max-width and padding
- **Row** - Flex row container for layout
- **Col** - Column component with grid system (1-12 columns)
- **Grid** - CSS Grid layout component
- **Stack** - Flexible stack layout component
- **Center** - Centering component for content
- **Box** - Generic container with styling options
- **Spacer** - Flexible spacing component
- **Header** - Page header component
- **Body** - Page body component
- **Footer** - Page footer component
- **Navbar** - Navigation bar component
- **Drawer** - Side drawer component
- **SplitPane** - Split pane component for resizable layouts
- **Resizable** - Resizable container component

### Data Display Components
- **Card** - Card component with header and footer slots
- **Badge** - Badge component with variants and sizes
- **Avatar** - Avatar component with fallback support
- **Image** - Image component with lazy loading and fallback
- **Svg** - SVG icon component with built-in icons
- **Alert** - Alert component for static messages
- **Notification** - Toast notification component
- **Breadcrumbs** - Breadcrumb navigation component
- **Tabs** - Tab navigation component
- **Stepper** - Step-by-step progress component
- **Divider** - Divider component with orientation and label
- **Tree** - Tree view component with expandable nodes
- **Item** - List item component with slots for icon, title, description, and action
- **ItemList** - List container with drag and drop support
- **Progress** - Progress bar component with multiple variants
- **Skeleton** - Skeleton loading component
- **Chip** - Chip component for tags and labels
- **Link** - Link component with variants
- **Accordion** - Accordion component with collapsible sections
- **Table** - Table component with rows and cells
- **VirtualTable** - Virtualized table component for large datasets
- **Toolbar** - Toolbar component for actions
- **Timeline** - Timeline component with vertical and horizontal layouts
- **Carousel** - Carousel component with slides
- **ColorPicker** - Color picker component
- **EmptyState** - Empty state component for empty data
- **Watermark** - Watermark component with text, pattern, and grid modes
- **QRCode** - QR code generator component
- **Popconfirm** - Confirmation popup component

### Navigation Components
- **Pagination** - Pagination component for server-side and client-side pagination
- **ButtonGroup** - Button group component
- **ToggleButton** - Toggle button component
- **Menu** - Menu component with items and dividers
- **SegmentedControl** - Segmented control component
- **SplitButton** - Split button component with dropdown

### Overlay Components
- **Backdrop** - Backdrop component for overlays
- **Dialog** - Dialog component for modal dialogs
- **Modal** - Modal component for full-screen overlays
- **Tooltip** - Tooltip component for hints
- **Popover** - Popover component for contextual information
- **Dropdown** - Dropdown component for selectable options
- **ContextMenu** - Context menu component for right-click menus

## Usage

### Basic HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/rell-ui/dist/tokens/theme.css">
  <script type="module" src="node_modules/rell-ui/dist/index.js"></script>
</head>
<body>
  <rell-container>
    <rell-breadcrumbs>
      <a href="#home">Home</a>
      <span>Page</span>
    </rell-breadcrumbs>
    
    <rell-typography variant="h1">Hello World</rell-typography>
    
    <rell-row gap="1rem">
      <rell-col span="8">
        <rell-input placeholder="Enter text..."></rell-input>
      </rell-col>
      <rell-col span="4">
        <rell-button variant="primary">Click me</rell-button>
      </rell-col>
    </rell-row>
  </rell-container>
</body>
</html>
```

### React

```jsx
import 'rell-ui/dist/index.js';
import 'rell-ui/theme.css';

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
import 'rell-ui/theme.css';
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
<!-- Single select -->
<rell-select 
  value="selected-value"
  size="sm|md|lg"
  disabled
  error>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</rell-select>

<!-- Multiple select -->
<rell-select 
  multiple
  value='["1","2"]'
  placeholder="Select options...">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</rell-select>
```

### Item and ItemList

```html
<!-- Draggable list -->
<rell-item-list draggable variant="outlined">
  <rell-item data-id="1" clickable>
    <span slot="title">First Item</span>
    <span slot="description">Description text</span>
  </rell-item>
  <rell-item data-id="2" clickable>
    <span slot="title">Second Item</span>
  </rell-item>
</rell-item-list>

<script>
  const list = document.querySelector('rell-item-list');
  
  // Get current order
  const order = list.getOrder(); // ['1', '2']
  
  // Set order programmatically
  list.setOrder(['2', '1']);
  
  // Listen for order changes
  list.addEventListener('order-changed', (e) => {
    console.log('New order:', e.detail.order);
  });
</script>
```

### Form

```html
<rell-form>
  <rell-input name="email" type="email" required></rell-input>
  <rell-input name="password" type="password" required></rell-input>
  <rell-button type="submit">Submit</rell-button>
</rell-form>

<script>
  const form = document.querySelector('rell-form');
  
  // Get form data
  const data = form.getFormDataAsObject();
  
  // Validate form
  const isValid = form.validate();
  
  // Reset form
  form.reset();
</script>
```

### DatePicker

```html
<rell-date-picker 
  value="2024-01-15"
  format="YYYY-MM-DD"
  placeholder="Select date"
  min-date="2024-01-01"
  max-date="2024-12-31">
</rell-date-picker>
```

### Pagination

```html
<!-- Client-side pagination -->
<rell-pagination 
  current="1"
  total="100"
  page-size="10"
  mode="client">
</rell-pagination>

<!-- Server-side pagination -->
<rell-pagination 
  current="1"
  total="1000"
  page-size="20"
  mode="server">
</rell-pagination>
```

### FileUpload

```html
<rell-file-upload 
  accept="image/*"
  multiple
  max-size="1048576">
</rell-file-upload>

<script>
  const upload = document.querySelector('rell-file-upload');
  upload.addEventListener('files-changed', (e) => {
    console.log('Files:', e.detail.files);
  });
  
  // Get files
  const files = upload.getFiles();
  
  // Clear files
  upload.clearFiles();
</script>
```

### Calendar

```html
<!-- Single date selection -->
<rell-calendar value="2024-01-15"></rell-calendar>

<!-- Multiple date selection -->
<rell-calendar multiple></rell-calendar>

<!-- Date range selection -->
<rell-calendar range></rell-calendar>

<script>
  const calendar = document.querySelector('rell-calendar');
  calendar.addEventListener('change', (e) => {
    console.log('Selected dates:', e.detail);
  });
</script>
```

### Popconfirm

```html
<rell-popconfirm 
  title="Удалить элемент?"
  description="Это действие нельзя отменить."
  confirm-text="Удалить"
  cancel-text="Отмена"
  variant="danger">
  <rell-button slot="trigger" variant="danger">Удалить</rell-button>
</rell-popconfirm>

<script>
  const popconfirm = document.querySelector('rell-popconfirm');
  popconfirm.addEventListener('confirm', () => {
    console.log('Confirmed!');
  });
  popconfirm.addEventListener('cancel', () => {
    console.log('Cancelled!');
  });
</script>
```

### Watermark

```html
<rell-watermark 
  text="CONFIDENTIAL"
  opacity="0.15"
  font-size="24px"
  rotate="-45">
  <div>Your content here</div>
</rell-watermark>
```

### QRCode

```html
<rell-qrcode 
  value="https://example.com"
  size="200"
  color="#000000"
  background="#ffffff">
</rell-qrcode>

<script>
  const qrcode = document.querySelector('rell-qrcode');
  
  // Get data URL
  const dataURL = qrcode.getDataURL();
  
  // Download QR code
  qrcode.download('qrcode.png');
</script>
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

const itemList = document.querySelector('rell-item-list');
itemList.addEventListener('order-changed', (e) => {
  console.log('Order changed:', e.detail.order);
});
```

## License

MIT
