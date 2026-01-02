import { BaseComponent } from '../../utils/base-component';
import { colors, spacing, radius, shadows } from '../../tokens';

export class RellButton extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'full-width'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isFullWidth(): boolean {
    return this.hasAttribute('full-width');
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const disabled = this.isDisabled();
    const fullWidth = this.isFullWidth();

    const sizeStyles: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[4]}`, fontSize: '0.875rem', minHeight: '32px' },
      md: { padding: `${spacing[3]} ${spacing[6]}`, fontSize: '1rem', minHeight: '40px' },
      lg: { padding: `${spacing[4]} ${spacing[8]}`, fontSize: '1.125rem', minHeight: '48px' },
    };

    const variantStyles: Record<string, { bg: string; bgHover: string; bgActive: string; color: string; border: string; shadow: string }> = {
      primary: {
        bg: 'var(--rell-interactive-primary)',
        bgHover: 'var(--rell-interactive-primary-hover)',
        bgActive: 'var(--rell-interactive-primary-active)',
        color: 'var(--rell-text-inverse)',
        border: 'transparent',
        shadow: shadows.cyan,
      },
      secondary: {
        bg: 'var(--rell-interactive-secondary)',
        bgHover: 'var(--rell-interactive-secondary-hover)',
        bgActive: 'var(--rell-interactive-secondary-active)',
        color: 'var(--rell-text-inverse)',
        border: 'transparent',
        shadow: shadows.magenta,
      },
      outline: {
        bg: 'transparent',
        bgHover: 'var(--rell-surface-hover)',
        bgActive: 'var(--rell-surface-active)',
        color: 'var(--rell-interactive-primary)',
        border: 'var(--rell-interactive-primary)',
        shadow: 'none',
      },
      ghost: {
        bg: 'transparent',
        bgHover: 'var(--rell-surface-hover)',
        bgActive: 'var(--rell-surface-active)',
        color: 'var(--rell-text-primary)',
        border: 'transparent',
        shadow: 'none',
      },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    return `
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${style.padding};
        font-size: ${style.fontSize};
        min-height: ${style.minHeight};
        font-weight: 500;
        font-family: var(--rell-font-sans);
        color: ${variantStyle.color};
        background-color: ${variantStyle.bg};
        border: 2px solid ${variantStyle.border};
        border-radius: ${radius.md};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        outline: none;
        box-shadow: ${variantStyle.shadow};
        width: ${fullWidth ? '100%' : 'auto'};
        opacity: ${disabled ? '0.5' : '1'};
        pointer-events: ${disabled ? 'none' : 'auto'};
      }

      button:hover:not(:disabled) {
        background-color: ${variantStyle.bgHover};
        box-shadow: ${variantStyle.shadow}, 0 0 20px ${variantStyle.bgHover}40;
        transform: translateY(-1px);
      }

      button:active:not(:disabled) {
        background-color: ${variantStyle.bgActive};
        transform: translateY(0);
      }

      button:focus-visible {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: 2px;
      }

      button:disabled {
        cursor: not-allowed;
      }
    `;
  }

  protected render(): void {
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <button ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;

    if (!disabled) {
      const button = this.shadow.querySelector('button');
      if (button) {
        button.addEventListener('click', (e) => {
          if (!this.isDisabled()) {
            this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
          }
        });
      }
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-button', RellButton);

