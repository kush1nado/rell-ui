/**
 * React JSX type definitions for Rell UI Web Components
 * 
 * This file is AUTO-GENERATED. Do not edit manually.
 * Run: npm run generate:react-types
 * 
 * This file extends React's JSX.IntrinsicElements to include all Rell UI custom elements
 * with their complete attribute definitions, allowing TypeScript to recognize them as
 * valid JSX elements in React applications with full autocomplete support.
 * 
 * To use these types in your React project, ensure @types/react is installed:
 * npm install --save-dev @types/react
 */

/// <reference types="react" />

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Layout
      'rell-background': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'pattern'?: string;
          'gradient'?: string;
          'blur'?: string;
          'opacity'?: string | number;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-body': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'padding'?: string | number;
          'max-width'?: string | number;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-box': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'padding'?: string | number;
          'margin'?: string | number;
          'variant'?: string;
          'border-radius'?: string;
          'shadow'?: string;
        },
        HTMLElement
      >;
      'rell-checkbox': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'checked'?: boolean;
          'disabled'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'indeterminate'?: boolean;
          'value'?: string | number;
          'error'?: string;
          'error-message'?: string;
        },
        HTMLElement
      >;
      'rell-checkbox-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'orientation'?: 'horizontal' | 'vertical';
          'gap'?: string | number;
        },
        HTMLElement
      >;
      'rell-col': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'span'?: string;
          'offset'?: string;
          'grow'?: string;
          'shrink'?: string;
          'basis'?: string;
          'align-self'?: string;
        },
        HTMLElement
      >;
      'rell-color-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'format'?: string;
          'show-alpha'?: boolean;
          'presets'?: string;
        },
        HTMLElement
      >;
      'rell-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'max-width'?: string | number;
          'padding'?: string | number;
          'fluid'?: boolean;
          'centered'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      'rell-footer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'height'?: string | number;
          'sticky'?: boolean;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-grid': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'columns'?: string;
          'rows'?: string;
          'gap'?: string | number;
          'column-gap'?: string;
          'row-gap'?: string;
          'align-items'?: string;
          'justify-items'?: string;
        },
        HTMLElement
      >;
      'rell-header': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'height'?: string | number;
          'sticky'?: boolean;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-row': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'gap'?: string | number;
          'align'?: string;
          'justify'?: string;
          'wrap'?: string;
          'direction'?: string;
        },
        HTMLElement
      >;
      'rell-section': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'padding'?: string | number;
          'background'?: string;
          'overflow'?: string;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'variant'?: string;
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      'rell-stack': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'direction'?: string;
          'gap'?: string | number;
          'align'?: string;
          'justify'?: string;
          'wrap'?: string;
        },
        HTMLElement
      >;
      'rell-table-row': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'clickable'?: boolean;
          'selected'?: boolean;
        },
        HTMLElement
      >;

      // Typography
      'rell-typography': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'color'?: string;
          'weight'?: string;
          'align'?: string;
          'font-family'?: string;
          'gradient'?: string;
          'font-size'?: string | number;
          'accent-color'?: string;
          'letter-spacing'?: string | number;
          'transform'?: string;
        },
        HTMLElement
      >;

      // Buttons
      'rell-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'disabled'?: boolean;
          'full-width'?: boolean;
        },
        HTMLElement
      >;
      'rell-button-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'gap'?: string | number;
        },
        HTMLElement
      >;
      'rell-split-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'disabled'?: boolean;
          'open'?: boolean;
        },
        HTMLElement
      >;
      'rell-toggle-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'checked'?: boolean;
          'disabled'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
          'value'?: string | number;
        },
        HTMLElement
      >;

      // Form
      'rell-autocomplete': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'placeholder'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'disabled'?: boolean;
          'loading'?: boolean;
          'min-length'?: string | number;
        },
        HTMLElement
      >;
      'rell-calendar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'min-date'?: string | number;
          'max-date'?: string | number;
          'disabled-dates'?: string;
          'first-day-of-week'?: string | number;
          'show-today'?: boolean;
          'show-other-months'?: boolean;
          'multiple'?: boolean;
          'range'?: string;
        },
        HTMLElement
      >;
      'rell-date-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'format'?: string;
          'placeholder'?: string;
          'disabled'?: boolean;
          'error'?: string;
          'error-message'?: string;
          'min-date'?: string | number;
          'max-date'?: string | number;
          'disabled-dates'?: string;
          'first-day-of-week'?: string | number;
          'name'?: string;
        },
        HTMLElement
      >;
      'rell-date-range-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'format'?: string;
          'placeholder'?: string;
          'disabled'?: boolean;
          'error'?: string;
          'error-message'?: string;
          'min-date'?: string | number;
          'max-date'?: string | number;
          'disabled-dates'?: string;
          'first-day-of-week'?: string | number;
          'name'?: string;
          'separator'?: string;
        },
        HTMLElement
      >;
      'rell-file-upload': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'accept'?: string;
          'multiple'?: boolean;
          'disabled'?: boolean;
          'max-size'?: string | number;
          'variant'?: string;
          'drag-over'?: string;
        },
        HTMLElement
      >;
      'rell-form': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'method'?: string;
          'action'?: string;
          'novalidate'?: string;
        },
        HTMLElement
      >;
      'rell-input': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'type'?: string;
          'placeholder'?: string;
          'value'?: string | number;
          'disabled'?: boolean;
          'error'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'required'?: boolean;
          'min'?: string | number;
          'max'?: string | number;
          'minlength'?: string;
          'maxlength'?: string;
          'pattern'?: string;
          'error-message'?: string;
          'validate-on'?: string;
        },
        HTMLElement
      >;
      'rell-radio': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'name'?: string;
          'value'?: string | number;
          'checked'?: boolean;
          'disabled'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'error'?: string;
          'error-message'?: string;
        },
        HTMLElement
      >;
      'rell-radio-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'name'?: string;
          'orientation'?: 'horizontal' | 'vertical';
          'gap'?: string | number;
        },
        HTMLElement
      >;
      'rell-rating': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'max'?: string | number;
          'size'?: 'sm' | 'md' | 'lg';
          'readonly'?: boolean;
          'allow-half'?: boolean;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-search': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'placeholder'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'disabled'?: boolean;
          'clearable'?: boolean;
          'loading'?: boolean;
        },
        HTMLElement
      >;
      'rell-select': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'multiple'?: boolean;
          'disabled'?: boolean;
          'error'?: string;
          'error-message'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'placeholder'?: string;
        },
        HTMLElement
      >;
      'rell-slider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'min'?: string | number;
          'max'?: string | number;
          'step'?: string | number;
          'disabled'?: boolean;
          'show-value'?: boolean;
          'marks'?: string;
        },
        HTMLElement
      >;
      'rell-switch': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'checked'?: boolean;
          'disabled'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'label'?: string;
          'error'?: string;
          'error-message'?: string;
        },
        HTMLElement
      >;
      'rell-switch-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'gap'?: string | number;
        },
        HTMLElement
      >;

      // Navigation
      'rell-breadcrumbs': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'separator'?: string;
          'size'?: 'sm' | 'md' | 'lg';
        },
        HTMLElement
      >;
      'rell-context-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
        },
        HTMLElement
      >;
      'rell-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'orientation'?: 'horizontal' | 'vertical';
        },
        HTMLElement
      >;
      'rell-menu-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-menu-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'active'?: boolean;
          'disabled'?: boolean;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-navbar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'sticky'?: boolean;
          'height'?: string | number;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'transparent'?: boolean;
          'backdrop-blur'?: boolean;
        },
        HTMLElement
      >;
      'rell-pagination': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'current'?: string | number;
          'total'?: string | number;
          'page-size'?: string | number;
          'show-size-changer'?: boolean;
          'show-total'?: boolean;
          'mode'?: string;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-segmented-control': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-segmented-control-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'active'?: boolean;
          'value'?: string | number;
          'disabled'?: boolean;
        },
        HTMLElement
      >;

      // Data Display
      'rell-accordion-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'value'?: string | number;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-avatar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'src'?: string;
          'alt'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
          'fallback'?: string;
          'gradient'?: string;
        },
        HTMLElement
      >;
      'rell-badge': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'dot'?: boolean;
          'color'?: string;
          'outlined'?: boolean;
        },
        HTMLElement
      >;
      'rell-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'hover'?: boolean;
          'padding'?: string | number;
          'border-color'?: string;
          'border-width'?: string | number;
          'align'?: string;
        },
        HTMLElement
      >;
      'rell-carousel-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'closable'?: boolean;
          'clickable'?: boolean;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-empty-state': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
        },
        HTMLElement
      >;
      'rell-image': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'src'?: string;
          'alt'?: string;
          'width'?: string | number;
          'height'?: string | number;
          'fit'?: string;
          'lazy'?: boolean;
          'fallback'?: string;
          'placeholder'?: string;
          'radius'?: string;
        },
        HTMLElement
      >;
      'rell-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'selected'?: boolean;
          'disabled'?: boolean;
          'clickable'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
          'draggable'?: boolean;
        },
        HTMLElement
      >;
      'rell-item-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'gap'?: string | number;
          'variant'?: string;
          'dividers'?: boolean;
          'draggable'?: boolean;
        },
        HTMLElement
      >;
      'rell-qrcode': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'size'?: 'sm' | 'md' | 'lg';
          'color'?: string;
          'background'?: string;
          'error-correction'?: string | number;
          'margin'?: string | number;
        },
        HTMLElement
      >;
      'rell-svg': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'name'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'color'?: string;
          'viewBox'?: string;
          'width'?: string | number;
          'height'?: string | number;
        },
        HTMLElement
      >;
      'rell-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'striped'?: boolean;
          'bordered'?: boolean;
          'hover'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-table-cell': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'header'?: string;
          'align'?: string;
          'colspan'?: string;
          'rowspan'?: string;
        },
        HTMLElement
      >;
      'rell-timeline': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'variant'?: string;
          'alternate'?: boolean;
        },
        HTMLElement
      >;
      'rell-timeline-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'color'?: string;
          'size'?: 'sm' | 'md' | 'lg';
        },
        HTMLElement
      >;
      'rell-tree': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'expanded'?: string;
          'default-expand-all'?: string;
        },
        HTMLElement
      >;
      'rell-tree-node': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'expanded'?: string;
          'label'?: string;
          'icon'?: string;
          'selectable'?: string;
          'selected'?: boolean;
        },
        HTMLElement
      >;
      'rell-virtual-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'height'?: string | number;
          'row-height'?: string | number;
          'buffer'?: string | number;
          'striped'?: boolean;
          'bordered'?: boolean;
          'hover'?: boolean;
        },
        HTMLElement
      >;
      'rell-watermark': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'text'?: string;
          'opacity'?: string | number;
          'font-size'?: string | number;
          'color'?: string;
          'rotate'?: string | number;
          'gap'?: string | number;
          'z-index'?: string | number;
          'mode'?: string;
        },
        HTMLElement
      >;

      // Feedback
      'rell-alert': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'type'?: string;
          'variant'?: string;
          'dismissible'?: string;
          'icon'?: string;
        },
        HTMLElement
      >;
      'rell-backdrop': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'blur'?: string;
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      'rell-notification': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'type'?: string;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'duration'?: string;
          'auto-close'?: string;
        },
        HTMLElement
      >;
      'rell-progress': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'max'?: string | number;
          'size'?: 'sm' | 'md' | 'lg';
          'variant'?: string;
          'show-label'?: boolean;
          'indeterminate'?: boolean;
        },
        HTMLElement
      >;
      'rell-skeleton': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'width'?: string | number;
          'height'?: string | number;
          'variant'?: string;
          'animated'?: boolean;
        },
        HTMLElement
      >;

      // Overlay
      'rell-dialog': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'closable'?: boolean;
        },
        HTMLElement
      >;
      'rell-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'trigger'?: string;
          'closable'?: boolean;
        },
        HTMLElement
      >;
      'rell-modal': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'size'?: 'sm' | 'md' | 'lg';
          'closable'?: boolean;
          'close-on-backdrop'?: boolean;
        },
        HTMLElement
      >;
      'rell-popconfirm': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'title'?: string;
          'description'?: string;
          'confirm-text'?: string;
          'cancel-text'?: string;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-popover': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'trigger'?: string;
          'closable'?: boolean;
          'arrow'?: boolean;
        },
        HTMLElement
      >;
      'rell-tooltip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'variant'?: string;
          'delay'?: string;
          'disabled'?: boolean;
        },
        HTMLElement
      >;

      // Other
      'rell-accordion': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'multiple'?: boolean;
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-carousel': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'autoplay'?: boolean;
          'interval'?: string | number;
          'loop'?: boolean;
          'show-dots'?: boolean;
          'show-arrows'?: boolean;
          'transition'?: string;
        },
        HTMLElement
      >;
      'rell-center': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'axis'?: string;
          'inline'?: string;
        },
        HTMLElement
      >;
      'rell-divider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'spacing'?: string | number;
          'label'?: string;
          'variant'?: string;
          'gradient'?: string;
          'thickness'?: string | number;
        },
        HTMLElement
      >;
      'rell-drawer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'open'?: boolean;
          'position'?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'width'?: string | number;
          'overlay'?: string;
        },
        HTMLElement
      >;
      'rell-link': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'href'?: string;
          'target'?: string;
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'disabled'?: boolean;
          'underline'?: boolean;
        },
        HTMLElement
      >;
      'rell-resizable': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'direction'?: string;
          'min-width'?: string | number;
          'min-height'?: string | number;
          'max-width'?: string | number;
          'max-height'?: string | number;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-split-pane': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'orientation'?: 'horizontal' | 'vertical';
          'split'?: string | number;
          'min'?: string | number;
          'max'?: string | number;
          'default-size'?: string | number;
        },
        HTMLElement
      >;
      'rell-step': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'status'?: string;
          'title'?: string;
          'description'?: string;
          'number'?: string;
        },
        HTMLElement
      >;
      'rell-stepper': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'current'?: string | number;
          'orientation'?: 'horizontal' | 'vertical';
          'variant'?: string;
        },
        HTMLElement
      >;
      'rell-tab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'active'?: boolean;
          'disabled'?: boolean;
        },
        HTMLElement
      >;
      'rell-tab-panel': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'active'?: boolean;
        },
        HTMLElement
      >;
      'rell-tabs': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'value'?: string | number;
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
        },
        HTMLElement
      >;
      'rell-toolbar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'variant'?: string;
          'size'?: 'sm' | 'md' | 'lg';
          'dense'?: string;
        },
        HTMLElement
      >;

    }
  }
}
