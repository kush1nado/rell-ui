import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellAlert extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'variant', 'dismissible', 'icon'];
  }

  private getType(): string {
    return this.getAttribute('type') || 'info';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'filled';
  }

  private isDismissible(): boolean {
    return this.hasAttribute('dismissible');
  }

  private hasIcon(): boolean {
    const iconAttr = this.getAttribute('icon');
    return iconAttr !== 'false' && (iconAttr === 'true' || this.getType() !== 'info');
  }

  protected getComponentStyles(): string {
    const type = this.getType();
    const variant = this.getVariant();

    const typeStyles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      success: {
        bg: 'var(--rell-status-success)',
        border: 'var(--rell-status-success)',
        text: 'var(--rell-text-inverse)',
        icon: '✓',
      },
      warning: {
        bg: 'var(--rell-status-warning)',
        border: 'var(--rell-status-warning)',
        text: 'var(--rell-text-inverse)',
        icon: '⚠',
      },
      error: {
        bg: 'var(--rell-status-error)',
        border: 'var(--rell-status-error)',
        text: 'var(--rell-text-inverse)',
        icon: '✕',
      },
      info: {
        bg: 'var(--rell-status-info)',
        border: 'var(--rell-status-info)',
        text: 'var(--rell-text-inverse)',
        icon: 'ℹ',
      },
    };

    const variantStyles: Record<string, { bgOpacity: string; borderOpacity: string }> = {
      filled: {
        bgOpacity: '1',
        borderOpacity: '1',
      },
      outlined: {
        bgOpacity: '0.1',
        borderOpacity: '1',
      },
      subtle: {
        bgOpacity: '0.1',
        borderOpacity: '0.3',
      },
    };

    const typeStyle = typeStyles[type] || typeStyles.info;
    const variantStyle = variantStyles[variant] || variantStyles.filled;

    const bgColor = variant === 'filled' 
      ? typeStyle.bg 
      : `color-mix(in srgb, ${typeStyle.bg} ${parseFloat(variantStyle.bgOpacity) * 100}%, transparent)`;
    
    const textColor = variant === 'filled' 
      ? typeStyle.text 
      : typeStyle.bg;

    return `
      :host {
        display: block;
        width: 100%;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: ${spacing[3]};
        padding: ${spacing[4]};
        border-radius: ${radius.md};
        border: 2px solid ${variant === 'filled' ? 'transparent' : typeStyle.border};
        background-color: ${bgColor};
        color: ${textColor};
        font-family: var(--rell-font-sans);
        position: relative;
      }

      .alert-icon {
        flex-shrink: 0;
        font-size: 1.25rem;
        line-height: 1;
        margin-top: 0.125rem;
      }

      .alert-content {
        flex: 1;
        min-width: 0;
      }

      .alert-title {
        font-weight: 600;
        margin-bottom: ${spacing[1]};
        font-size: 1rem;
      }

      .alert-message {
        font-size: 0.875rem;
        line-height: 1.5;
        opacity: ${variant === 'filled' ? '0.95' : '0.9'};
      }

      .alert-dismiss {
        flex-shrink: 0;
        background: none;
        border: none;
        color: ${textColor};
        cursor: pointer;
        padding: ${spacing[1]};
        margin: -${spacing[1]};
        font-size: 1.25rem;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .alert-dismiss:hover {
        opacity: 1;
      }

      ::slotted(*) {
        margin: 0;
      }
    `;
  }

  protected render(): void {
    const type = this.getType();
    const dismissible = this.isDismissible();
    const showIcon = this.hasIcon();

    const icons: Record<string, string> = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ',
    };

    const iconHTML = showIcon 
      ? `<span class="alert-icon" aria-hidden="true">${icons[type] || icons.info}</span>`
      : '';

    const dismissHTML = dismissible
      ? `<button class="alert-dismiss" aria-label="Dismiss">×</button>`
      : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="alert" role="alert">
        ${iconHTML}
        <div class="alert-content">
          <slot></slot>
        </div>
        ${dismissHTML}
      </div>
    `;

    if (dismissible) {
      const dismissBtn = this.shadow.querySelector('.alert-dismiss');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
          this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
          this.remove();
        });
      }
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-alert', RellAlert);

