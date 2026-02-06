/**
 * React JSX type definitions for Rell UI Web Components
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
      // Layout Components
      'rell-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'max-width'?: string;
          padding?: string;
          fluid?: boolean;
          centered?: boolean;
          position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      
      'rell-row': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-col': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-center': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-section': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          padding?: string;
          background?: string;
          overflow?: string;
          position?: string;
          variant?: 'primary' | 'secondary' | string;
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      
      'rell-background': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          pattern?: string;
          gradient?: string;
          blur?: string | number;
          opacity?: string | number;
          variant?: 'grid' | 'dots' | 'lines' | string;
        },
        HTMLElement
      >;
      
      // Layout Structure
      'rell-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-body': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Typography
      'rell-typography': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
          color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'disabled';
          weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
          align?: 'left' | 'center' | 'right' | 'justify';
          'font-family'?: 'sans' | 'mono';
          gradient?: 'cyan-magenta' | 'cyan-magenta-pink' | 'magenta-pink' | 'cyan-green' | 'pink-yellow' | string;
          'font-size'?: string;
          'accent-color'?: 'cyan' | 'magenta' | 'pink' | 'yellow' | 'green' | 'blue' | string;
          'letter-spacing'?: 'wide' | 'wider' | 'widest' | string;
          transform?: 'uppercase' | 'lowercase' | 'capitalize';
        },
        HTMLElement
      >;
      
      // Buttons
      'rell-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
          'full-width'?: boolean;
        },
        HTMLElement
      >;
      
      'rell-button-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
          size?: 'sm' | 'md' | 'lg';
          gap?: string | number;
        },
        HTMLElement
      >;
      
      'rell-toggle-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          size?: 'sm' | 'md' | 'lg';
          variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
          value?: string;
        },
        HTMLElement
      >;
      
      'rell-split-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
          open?: boolean;
        },
        HTMLElement
      >;
      
      // Form Components
      'rell-input': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
          placeholder?: string;
          value?: string;
          disabled?: boolean;
          error?: boolean;
          size?: 'sm' | 'md' | 'lg';
          required?: boolean;
          min?: string | number;
          max?: string | number;
          minlength?: string | number;
          maxlength?: string | number;
          pattern?: string;
          'error-message'?: string;
          'validate-on'?: 'blur' | 'change' | 'submit';
        },
        HTMLElement
      >;
      
      'rell-select': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          multiple?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          size?: 'sm' | 'md' | 'lg';
          placeholder?: string;
        },
        HTMLElement
      >;
      
      'rell-checkbox': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          size?: 'sm' | 'md' | 'lg';
          indeterminate?: boolean;
          value?: string;
          error?: boolean;
          'error-message'?: string;
        },
        HTMLElement
      >;
      
      'rell-checkbox-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-radio': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          value?: string;
          name?: string;
        },
        HTMLElement
      >;
      
      'rell-radio-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-switch': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          size?: 'sm' | 'md' | 'lg';
          label?: string;
          error?: boolean;
          'error-message'?: string;
        },
        HTMLElement
      >;
      
      'rell-switch-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-slider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string | number;
          min?: string | number;
          max?: string | number;
          step?: string | number;
          disabled?: boolean;
          'show-value'?: boolean;
          marks?: string;
        },
        HTMLElement
      >;
      
      'rell-form': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-date-range-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-search': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          placeholder?: string;
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
          clearable?: boolean;
          loading?: boolean;
        },
        HTMLElement
      >;
      
      'rell-autocomplete': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          placeholder?: string;
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
          loading?: boolean;
          'min-length'?: string | number;
        },
        HTMLElement
      >;
      
      'rell-rating': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string | number;
          max?: string | number;
          size?: 'sm' | 'md' | 'lg';
          readonly?: boolean;
          'allow-half'?: boolean;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      'rell-file-upload': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          accept?: string;
          multiple?: boolean;
          disabled?: boolean;
          'max-size'?: string | number;
          variant?: string;
          'drag-over'?: boolean;
        },
        HTMLElement
      >;
      
      'rell-calendar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          'min-date'?: string;
          'max-date'?: string;
          'disabled-dates'?: string;
          'first-day-of-week'?: string | number;
          'show-today'?: boolean;
          'show-other-months'?: boolean;
          multiple?: boolean;
          range?: boolean;
        },
        HTMLElement
      >;
      
      // Navigation
      'rell-breadcrumbs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-navbar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'default' | string;
          sticky?: boolean;
          height?: string;
          position?: 'static' | 'fixed' | 'sticky' | 'absolute' | 'relative';
          transparent?: boolean;
          'backdrop-blur'?: boolean;
        },
        HTMLElement
      >;
      
      'rell-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          orientation?: 'horizontal' | 'vertical';
        },
        HTMLElement
      >;
      
      'rell-menu-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          active?: boolean;
          disabled?: boolean;
          variant?: string;
        },
        HTMLElement
      >;
      
      'rell-menu-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-pagination': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          current?: string | number;
          total?: string | number;
          'page-size'?: string | number;
          'show-size-changer'?: boolean;
          'show-total'?: boolean;
          mode?: string;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      'rell-segmented-control': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          size?: 'sm' | 'md' | 'lg';
          variant?: string;
        },
        HTMLElement
      >;
      
      'rell-segmented-control-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          active?: boolean;
          value?: string;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      // Data Display
      'rell-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'elevated' | 'outlined' | 'flat';
          hover?: boolean;
          padding?: string;
          'border-color'?: 'cyan' | 'magenta' | 'pink' | 'yellow' | 'green' | 'blue' | string;
          'border-width'?: string | number;
          align?: 'left' | 'center' | 'right';
        },
        HTMLElement
      >;
      
      'rell-badge': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          size?: 'sm' | 'md' | 'lg';
          dot?: boolean;
          color?: string;
          outlined?: boolean;
        },
        HTMLElement
      >;
      
      'rell-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          size?: 'sm' | 'md' | 'lg';
          closable?: boolean;
          clickable?: boolean;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      'rell-avatar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          size?: 'sm' | 'md' | 'lg' | string | number;
          variant?: 'circle' | 'square' | 'rounded' | string;
          fallback?: string;
          gradient?: string;
        },
        HTMLElement
      >;
      
      'rell-image': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          width?: string | number;
          height?: string | number;
          fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
          lazy?: boolean;
          fallback?: string;
          placeholder?: string;
          radius?: string | number;
        },
        HTMLElement
      >;
      
      'rell-svg': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string | number;
          color?: string;
          viewBox?: string;
          width?: string | number;
          height?: string | number;
        },
        HTMLElement
      >;
      
      'rell-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          striped?: boolean;
          bordered?: boolean;
          hover?: boolean;
          size?: 'sm' | 'md' | 'lg';
          variant?: string;
        },
        HTMLElement
      >;
      
      'rell-table-row': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          clickable?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      
      'rell-table-cell': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          header?: boolean;
          align?: 'left' | 'center' | 'right';
          colspan?: string | number;
          rowspan?: string | number;
        },
        HTMLElement
      >;
      
      'rell-virtual-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          height?: string | number;
          'row-height'?: string | number;
          buffer?: string | number;
          striped?: boolean;
          bordered?: boolean;
          hover?: boolean;
        },
        HTMLElement
      >;
      
      'rell-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          selected?: boolean;
          disabled?: boolean;
          clickable?: boolean;
          size?: 'sm' | 'md' | 'lg';
          variant?: string;
          draggable?: boolean;
        },
        HTMLElement
      >;
      
      'rell-item-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          gap?: string | number;
          variant?: string;
          dividers?: boolean;
          draggable?: boolean;
        },
        HTMLElement
      >;
      
      'rell-tree': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tree-node': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-timeline': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          variant?: string;
          alternate?: boolean;
        },
        HTMLElement
      >;
      
      'rell-timeline-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
          color?: string;
          size?: string | number;
        },
        HTMLElement
      >;
      
      'rell-empty-state': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          size?: 'sm' | 'md' | 'lg';
        },
        HTMLElement
      >;
      
      'rell-qrcode': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          size?: string | number;
          color?: string;
          background?: string;
          'error-correction'?: 'L' | 'M' | 'Q' | 'H';
          margin?: string | number;
        },
        HTMLElement
      >;
      
      'rell-watermark': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          text?: string;
          opacity?: string | number;
          'font-size'?: string | number;
          color?: string;
          rotate?: string | number;
          gap?: string | number;
          'z-index'?: string | number;
          mode?: 'text' | 'pattern' | 'grid';
        },
        HTMLElement
      >;
      
      // Feedback
      'rell-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-notification': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-progress': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string | number;
          max?: string | number;
          size?: 'sm' | 'md' | 'lg';
          variant?: string;
          'show-label'?: boolean;
          indeterminate?: boolean;
        },
        HTMLElement
      >;
      
      'rell-skeleton': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          width?: string | number;
          height?: string | number;
          variant?: string;
          animated?: boolean;
        },
        HTMLElement
      >;
      
      'rell-backdrop': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          blur?: boolean;
          'z-index'?: string | number;
        },
        HTMLElement
      >;
      
      // Overlay
      'rell-dialog': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
          closable?: boolean;
        },
        HTMLElement
      >;
      
      'rell-modal': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
          closable?: boolean;
          'close-on-backdrop'?: boolean;
        },
        HTMLElement
      >;
      
      'rell-tooltip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
          variant?: string;
          delay?: string | number;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      'rell-popover': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
          trigger?: 'click' | 'hover' | 'focus' | 'manual';
          closable?: boolean;
          arrow?: boolean;
        },
        HTMLElement
      >;
      
      'rell-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
          trigger?: 'click' | 'hover' | 'focus' | 'manual';
          closable?: boolean;
        },
        HTMLElement
      >;
      
      'rell-popconfirm': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
          title?: string;
          description?: string;
          'confirm-text'?: string;
          'cancel-text'?: string;
          variant?: string;
        },
        HTMLElement
      >;
      
      'rell-context-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          position?: string;
        },
        HTMLElement
      >;
      
      // Other
      'rell-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tab': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-tab-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-stepper': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'rell-step': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-divider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          spacing?: string | number;
          label?: string;
          variant?: 'solid' | 'dashed' | 'dotted' | string;
          gradient?: string;
          thickness?: string | number;
        },
        HTMLElement
      >;
      
      'rell-link': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          href?: string;
          target?: '_self' | '_blank' | '_parent' | '_top';
          variant?: string;
          size?: 'sm' | 'md' | 'lg';
          disabled?: boolean;
          underline?: boolean;
        },
        HTMLElement
      >;
      
      'rell-accordion': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          multiple?: boolean;
          variant?: string;
        },
        HTMLElement
      >;
      
      'rell-accordion-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          value?: string;
          disabled?: boolean;
        },
        HTMLElement
      >;
      
      'rell-toolbar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          size?: 'sm' | 'md' | 'lg';
          dense?: boolean;
        },
        HTMLElement
      >;
      
      'rell-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-carousel': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          autoplay?: boolean;
          interval?: string | number;
          loop?: boolean;
          'show-dots'?: boolean;
          'show-arrows'?: boolean;
          transition?: string;
        },
        HTMLElement
      >;
      
      'rell-carousel-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'rell-color-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          format?: 'hex' | 'rgb' | 'hsl';
          'show-alpha'?: boolean;
          presets?: string;
        },
        HTMLElement
      >;
      
      'rell-split-pane': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          split?: string | number;
          min?: string | number;
          max?: string | number;
          'default-size'?: string | number;
        },
        HTMLElement
      >;
      
      'rell-resizable': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          direction?: 'horizontal' | 'vertical' | 'both';
          'min-width'?: string | number;
          'min-height'?: string | number;
          'max-width'?: string | number;
          'max-height'?: string | number;
          disabled?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
