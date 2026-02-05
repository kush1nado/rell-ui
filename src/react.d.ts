/**
 * React JSX type definitions for Rell UI Web Components
 * 
 * This file extends React's JSX.IntrinsicElements to include all Rell UI custom elements,
 * allowing TypeScript to recognize them as valid JSX elements in React applications.
 * 
 * To use these types in your React project, ensure @types/react is installed:
 * npm install --save-dev @types/react
 */

/// <reference types="react" />

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Layout Components
      'rell-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-row': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-col': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-center': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-background': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Layout Structure
      'rell-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-body': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Typography
      'rell-typography': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Buttons
      'rell-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-button-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-toggle-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-split-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Form Components
      'rell-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-checkbox-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-radio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-radio-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-switch-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-form': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-date-range-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-search': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-rating': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-calendar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Navigation
      'rell-breadcrumbs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-menu-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-segmented-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-segmented-control-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Data Display
      'rell-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-chip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-svg': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-table-row': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-table-cell': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-virtual-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-item-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tree': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tree-node': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-timeline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-timeline-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-empty-state': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-qrcode': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-watermark': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Feedback
      'rell-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-notification': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-backdrop': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Overlay
      'rell-dialog': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-dropdown': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-popconfirm': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-context-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Other
      'rell-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tab': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tab-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-stepper': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-step': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-link': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-accordion-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-toolbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-carousel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-carousel-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-color-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-split-pane': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-resizable': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

