import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellChip extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'closable', 'clickable', 'disabled'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isClosable(): boolean {
    return this.hasAttribute('closable');
  }

  private isClickable(): boolean {
    return this.hasAttribute('clickable');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const clickable = this.isClickable();
    const disabled = this.isDisabled();

    const sizeStyles: Record<string, { fontSize: string; padding: string; height: string; iconSize: string }> = {
      sm: { 
        fontSize: '0.75rem', 
        padding: `${spacing[1]} ${spacing[2]}`, 
        height: '20px',
        iconSize: '14px'
      },
      md: { 
        fontSize: '0.875rem', 
        padding: `${spacing[2]} ${spacing[3]}`, 
        height: '28px',
        iconSize: '16px'
      },
      lg: { 
        fontSize: '1rem', 
        padding: `${spacing[2]} ${spacing[4]}`, 
        height: '36px',
        iconSize: '18px'
      },
    };

    const variantStyles: Record<string, { bg: string; color: string; border?: string; hoverBg?: string }> = {
      default: {
        bg: 'var(--rell-surface-elevated)',
        color: 'var(--rell-text-primary)',
        border: 'var(--rell-border-default)',
        hoverBg: 'var(--rell-surface-hover)',
      },
      primary: {
        bg: 'var(--rell-interactive-primary)',
        color: 'var(--rell-text-inverse)',
        hoverBg: 'var(--rell-interactive-primary-hover)',
      },
      secondary: {
        bg: 'var(--rell-interactive-secondary)',
        color: 'var(--rell-text-inverse)',
        hoverBg: 'var(--rell-interactive-secondary-hover)',
      },
      success: {
        bg: 'var(--rell-status-success)',
        color: 'var(--rell-text-inverse)',
      },
      warning: {
        bg: 'var(--rell-status-warning)',
        color: 'var(--rell-text-inverse)',
      },
      error: {
        bg: 'var(--rell-status-error)',
        color: 'var(--rell-text-inverse)',
      },
      info: {
        bg: 'var(--rell-status-info)',
        color: 'var(--rell-text-inverse)',
      },
      outline: {
        bg: 'transparent',
        color: 'var(--rell-text-primary)',
        border: 'var(--rell-border-default)',
        hoverBg: 'var(--rell-surface-hover)',
      },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: inline-flex;
        align-items: center;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: ${spacing[2]};
        font-family: var(--rell-font-sans);
        font-weight: 500;
        font-size: ${style.fontSize};
        line-height: 1;
        padding: ${style.padding};
        height: ${style.height};
        border-radius: ${radius.full};
        background-color: ${variantStyle.bg};
        color: ${variantStyle.color};
        border: ${variantStyle.border ? `1px solid ${variantStyle.border}` : 'none'};
        box-sizing: border-box;
        transition: all 0.2s ease;
        ${clickable && !disabled ? 'cursor: pointer;' : ''}
        ${disabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}
      }

      ${clickable && !disabled ? `
      .chip:hover {
        background-color: ${variantStyle.hoverBg || variantStyle.bg};
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      ` : ''}

      .chip-content {
        display: flex;
        align-items: center;
        gap: ${spacing[1]};
      }

      .chip-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${style.iconSize};
        height: ${style.iconSize};
        border: none;
        background: transparent;
        color: ${variantStyle.color};
        cursor: pointer;
        border-radius: ${radius.full};
        transition: all 0.2s ease;
        padding: 0;
        margin-left: -${spacing[1]};
        opacity: 0.7;
        font-size: ${style.iconSize};
        line-height: 1;
      }

      .chip-close:hover {
        opacity: 1;
        background-color: ${variant === 'default' || variant === 'outline' 
          ? 'rgba(0, 0, 0, 0.1)' 
          : 'rgba(255, 255, 255, 0.2)'};
      }

      .chip-icon {
        display: flex;
        align-items: center;
        width: ${style.iconSize};
        height: ${style.iconSize};
        flex-shrink: 0;
      }

      ::slotted([slot="icon"]) {
        width: ${style.iconSize};
        height: ${style.iconSize};
      }
    `;
  }

  protected render(): void {
    const closable = this.isClosable();
    const clickable = this.isClickable();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="chip" role="button" ${disabled ? 'aria-disabled="true"' : ''} tabindex="${clickable && !disabled ? '0' : '-1'}">
        <div class="chip-content">
          <slot name="icon"></slot>
          <slot></slot>
        </div>
        ${closable ? `<button class="chip-close" aria-label="Remove">&times;</button>` : ''}
      </div>
    `;

    const chip = this.shadow.querySelector('.chip') as HTMLElement;
    const closeButton = this.shadow.querySelector('.chip-close') as HTMLElement;

    if (clickable && !disabled && chip) {
      chip.addEventListener('click', (e) => {
        if (closeButton && (e.target === closeButton || closeButton.contains(e.target as Node))) {
          return;
        }
        this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      });

      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chip.click();
        }
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        if (this.hasAttribute('auto-remove')) {
          this.remove();
        }
      });
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-chip', RellChip);

