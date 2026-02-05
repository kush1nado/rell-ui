# Component Examples

Comprehensive examples for common use cases with Rell UI components.

## Forms

### Complete Form Example

```html
<rell-form>
  <rell-container style="max-width: 500px; margin: 0 auto;">
    <rell-typography variant="h2" style="margin-bottom: 2rem;">
      Registration Form
    </rell-typography>

    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <rell-typography variant="caption" color="secondary">
          Full Name
        </rell-typography>
        <rell-input 
          name="fullName"
          placeholder="Enter your full name"
          required
          validate-on="blur">
        </rell-input>
      </div>

      <div>
        <rell-typography variant="caption" color="secondary">
          Email
        </rell-typography>
        <rell-input 
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          validate-on="blur">
        </rell-input>
      </div>

      <div>
        <rell-typography variant="caption" color="secondary">
          Country
        </rell-typography>
        <rell-select name="country" required>
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </rell-select>
      </div>

      <div>
        <rell-checkbox name="terms" required>
          I accept the terms and conditions
        </rell-checkbox>
      </div>

      <div style="display: flex; gap: 1rem;">
        <rell-button type="submit" variant="primary" full-width>
          Register
        </rell-button>
        <rell-button type="reset" variant="ghost" full-width>
          Reset
        </rell-button>
      </div>
    </div>
  </rell-container>
</rell-form>

<script>
  const form = document.querySelector('rell-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = form.getFormDataAsObject();
    console.log('Form data:', data);
    alert('Registration successful!');
  });
</script>
```

## Data Display

### Table with Actions

```html
<rell-container>
  <rell-table>
    <rell-table-row slot="header">
      <rell-table-cell>Name</rell-table-cell>
      <rell-table-cell>Email</rell-table-cell>
      <rell-table-cell>Status</rell-table-cell>
      <rell-table-cell>Actions</rell-table-cell>
    </rell-table-row>
    
    <rell-table-row>
      <rell-table-cell>John Doe</rell-table-cell>
      <rell-table-cell>john@example.com</rell-table-cell>
      <rell-table-cell>
        <rell-badge variant="success">Active</rell-badge>
      </rell-table-cell>
      <rell-table-cell>
        <rell-button size="sm" variant="ghost">Edit</rell-button>
        <rell-button size="sm" variant="danger">Delete</rell-button>
      </rell-table-cell>
    </rell-table-row>
  </rell-table>
</rell-container>
```

### Card Layout

```html
<rell-row gap="1rem">
  <rell-col span="4">
    <rell-card>
      <div slot="header">
        <rell-typography variant="h3">Card Title</rell-typography>
      </div>
      <div>
        <rell-typography>Card content goes here</rell-typography>
      </div>
      <div slot="footer">
        <rell-button variant="primary">Action</rell-button>
      </div>
    </rell-card>
  </rell-col>
</rell-row>
```

## Navigation

### Navigation Menu

```html
<rell-navbar>
  <rell-menu orientation="horizontal">
    <rell-menu-item active>Home</rell-menu-item>
    <rell-menu-item>About</rell-menu-item>
    <rell-menu-item>Services</rell-menu-item>
    <rell-menu-item>Contact</rell-menu-item>
  </rell-menu>
</rell-navbar>
```

### Breadcrumbs

```html
<rell-breadcrumbs>
  <a href="#home">Home</a>
  <a href="#products">Products</a>
  <a href="#electronics">Electronics</a>
  <span>Laptops</span>
</rell-breadcrumbs>
```

## Modals and Dialogs

### Confirmation Dialog

```html
<rell-dialog id="confirm-dialog">
  <div slot="header">
    <rell-typography variant="h3">Confirm Action</rell-typography>
  </div>
  <div>
    <rell-typography>Are you sure you want to delete this item?</rell-typography>
  </div>
  <div slot="footer">
    <rell-button variant="ghost" onclick="closeDialog()">Cancel</rell-button>
    <rell-button variant="danger" onclick="confirmDelete()">Delete</rell-button>
  </div>
</rell-dialog>

<rell-button onclick="openDialog()">Delete Item</rell-button>

<script>
  function openDialog() {
    document.getElementById('confirm-dialog').setAttribute('open', '');
  }

  function closeDialog() {
    document.getElementById('confirm-dialog').removeAttribute('open');
  }

  function confirmDelete() {
    // Delete logic here
    console.log('Item deleted');
    closeDialog();
  }
</script>
```

## Data Entry

### File Upload with Preview

```html
<rell-file-upload 
  id="file-upload"
  accept="image/*"
  multiple>
</rell-file-upload>

<div id="preview-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;"></div>

<script>
  const upload = document.getElementById('file-upload');
  const preview = document.getElementById('preview-container');

  upload.addEventListener('files-changed', (e) => {
    preview.innerHTML = '';
    e.detail.files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.width = '100%';
          img.style.borderRadius = '8px';
          preview.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  });
</script>
```

### Date Range Picker

```html
<rell-date-range-picker 
  id="date-range"
  placeholder="Select date range">
</rell-date-range-picker>

<script>
  const picker = document.getElementById('date-range');
  picker.addEventListener('change', (e) => {
    console.log('Date range:', e.detail);
    console.log('Start:', e.detail.start);
    console.log('End:', e.detail.end);
  });
</script>
```

## Feedback

### Toast Notifications

```html
<rell-button onclick="showNotification()">Show Notification</rell-button>

<script>
  function showNotification() {
    const notification = document.createElement('rell-notification');
    notification.setAttribute('variant', 'success');
    notification.setAttribute('message', 'Operation completed successfully!');
    notification.setAttribute('duration', '3000');
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
</script>
```

### Progress Indicator

```html
<rell-progress 
  id="progress"
  value="0"
  variant="primary">
</rell-progress>

<rell-button onclick="startProgress()">Start Progress</rell-button>

<script>
  function startProgress() {
    const progress = document.getElementById('progress');
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      progress.setAttribute('value', value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }
</script>
```

## Layout

### Responsive Grid

```html
<rell-container>
  <rell-row gap="1rem">
    <rell-col span="12" span-md="6" span-lg="4">
      <rell-card>Column 1</rell-card>
    </rell-col>
    <rell-col span="12" span-md="6" span-lg="4">
      <rell-card>Column 2</rell-card>
    </rell-col>
    <rell-col span="12" span-md="6" span-lg="4">
      <rell-card>Column 3</rell-card>
    </rell-col>
  </rell-row>
</rell-container>
```

### Split Pane Layout

```html
<rell-split-pane 
  orientation="horizontal"
  split="50%">
  <div slot="primary">
    <rell-typography variant="h3">Left Panel</rell-typography>
    <rell-typography>Primary content area</rell-typography>
  </div>
  <div slot="secondary">
    <rell-typography variant="h3">Right Panel</rell-typography>
    <rell-typography>Secondary content area</rell-typography>
  </div>
</rell-split-pane>
```

## Advanced Patterns

### Component Composition

```html
<rell-card>
  <div slot="header">
    <rell-row gap="1rem" style="align-items: center;">
      <rell-col style="flex: 1;">
        <rell-typography variant="h3">Dashboard</rell-typography>
      </rell-col>
      <rell-col>
        <rell-button-group>
          <rell-button size="sm" variant="outline">Export</rell-button>
          <rell-button size="sm" variant="primary">New Item</rell-button>
        </rell-button-group>
      </rell-col>
    </rell-row>
  </div>
  
  <div>
    <rell-tabs>
      <rell-tab active>Overview</rell-tab>
      <rell-tab>Analytics</rell-tab>
      <rell-tab>Settings</rell-tab>
      
      <rell-tab-panel>
        <rell-typography>Overview content</rell-typography>
      </rell-tab-panel>
      <rell-tab-panel>
        <rell-typography>Analytics content</rell-typography>
      </rell-tab-panel>
      <rell-tab-panel>
        <rell-typography>Settings content</rell-typography>
      </rell-tab-panel>
    </rell-tabs>
  </div>
</rell-card>
```

