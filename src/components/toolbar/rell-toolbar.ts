import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellToolbar extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'dense'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDense(): boolean {
    return this.hasAttribute('dense');
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const dense = this.isDense();

    const sizeStyles: Record<string, { padding: string; minHeight: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, minHeight: '40px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, minHeight: '48px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, minHeight: '56px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const padding = dense ? spacing[2] : style.padding;

    const variantStyles: Record<string, { bg: string; border?: string }> = {
      default: {
        bg: 'var(--rell-surface-base)',
        border: 'var(--rell-border-default)',
      },
      elevated: {
        bg: 'var(--rell-surface-elevated)',
        border: 'var(--rell-border-default)',
      },
      outlined: {
        bg: 'transparent',
        border: 'var(--rell-border-default)',
      },
    };

    const variantStyle = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        padding: ${padding};
        min-height: ${dense ? '36px' : style.minHeight};
        background-color: ${variantStyle.bg};
        border: ${variantStyle.border ? `1px solid ${variantStyle.border}` : 'none'};
        border-radius: ${radius.md};
        font-family: var(--rell-font-sans);
      }

      .toolbar-section {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .toolbar-section:first-child {
        margin-right: auto;
      }

      .toolbar-section:last-child {
        margin-left: auto;
      }

      ::slotted([slot="start"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      ::slotted([slot="end"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      ::slotted(rell-button),
      ::slotted(rell-button-group) {
        flex-shrink: 0;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="toolbar-section">
        <slot name="start"></slot>
        <slot></slot>
      </div>
      <div class="toolbar-section">
        <slot name="end"></slot>
      </div>
    `;
    
    // Add global style for icons in toolbar buttons
    if (!document.getElementById('rell-toolbar-icon-styles')) {
      const style = document.createElement('style');
      style.id = 'rell-toolbar-icon-styles';
      style.textContent = `
        rell-toolbar rell-button rell-svg {
          width: 18px !important;
          height: 18px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-toolbar', RellToolbar);

