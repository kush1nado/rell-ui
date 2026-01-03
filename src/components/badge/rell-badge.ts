import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellBadge extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'dot'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDot(): boolean {
    return this.hasAttribute('dot');
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const dot = this.isDot();

    const sizeStyles: Record<string, { fontSize: string; padding: string; minWidth: string; height: string }> = {
      sm: { fontSize: '0.75rem', padding: `${spacing[1]} ${spacing[2]}`, minWidth: '16px', height: '16px' },
      md: { fontSize: '0.875rem', padding: `${spacing[1]} ${spacing[2]}`, minWidth: '20px', height: '20px' },
      lg: { fontSize: '1rem', padding: `${spacing[2]} ${spacing[3]}`, minWidth: '24px', height: '24px' },
    };

    const variantStyles: Record<string, { bg: string; color: string }> = {
      primary: {
        bg: 'var(--rell-interactive-primary)',
        color: 'var(--rell-text-inverse)',
      },
      secondary: {
        bg: 'var(--rell-interactive-secondary)',
        color: 'var(--rell-text-inverse)',
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
      neutral: {
        bg: 'var(--rell-surface-base)',
        color: 'var(--rell-text-primary)',
      },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    return `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--rell-font-sans);
        font-weight: 500;
        font-size: ${style.fontSize};
        line-height: 1;
        padding: ${dot ? '0' : style.padding};
        min-width: ${dot ? style.height : style.minWidth};
        height: ${style.height};
        border-radius: ${dot ? radius.full : radius.full};
        background-color: ${variantStyle.bg};
        color: ${variantStyle.color};
        box-sizing: border-box;
      }

      .badge-dot {
        width: ${style.height};
        height: ${style.height};
        padding: 0;
      }
    `;
  }

  protected render(): void {
    const dot = this.isDot();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <span class="badge ${dot ? 'badge-dot' : ''}" role="status">
        ${dot ? '' : '<slot></slot>'}
      </span>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-badge', RellBadge);

