import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellLink extends BaseComponent {
  static get observedAttributes() {
    return ['href', 'target', 'variant', 'size', 'disabled', 'underline'];
  }

  private getHref(): string {
    return this.getAttribute('href') || '#';
  }

  private getTarget(): string {
    return this.getAttribute('target') || '_self';
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

  private hasUnderline(): boolean {
    const underline = this.getAttribute('underline');
    return underline !== 'false';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const disabled = this.isDisabled();
    const underline = this.hasUnderline();

    const sizeStyles: Record<string, { fontSize: string }> = {
      sm: { fontSize: '0.875rem' },
      md: { fontSize: '1rem' },
      lg: { fontSize: '1.125rem' },
    };

    const variantStyles: Record<string, { color: string; hoverColor: string }> = {
      primary: {
        color: 'var(--rell-interactive-primary)',
        hoverColor: 'var(--rell-interactive-primary-hover)',
      },
      secondary: {
        color: 'var(--rell-interactive-secondary)',
        hoverColor: 'var(--rell-interactive-secondary-hover)',
      },
      success: {
        color: 'var(--rell-status-success)',
        hoverColor: 'var(--rell-status-success)',
      },
      warning: {
        color: 'var(--rell-status-warning)',
        hoverColor: 'var(--rell-status-warning)',
      },
      error: {
        color: 'var(--rell-status-error)',
        hoverColor: 'var(--rell-status-error)',
      },
      info: {
        color: 'var(--rell-status-info)',
        hoverColor: 'var(--rell-status-info)',
      },
      text: {
        color: 'var(--rell-text-primary)',
        hoverColor: 'var(--rell-text-secondary)',
      },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    return `
      :host {
        display: inline;
      }

      .link {
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
        font-weight: 500;
        color: ${variantStyle.color};
        text-decoration: ${underline ? 'underline' : 'none'};
        text-underline-offset: 2px;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        opacity: ${disabled ? '0.5' : '1'};
        display: inline-flex;
        align-items: center;
        gap: ${spacing[1]};
      }

      ${!disabled ? `
      .link:hover {
        color: ${variantStyle.hoverColor};
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      ` : ''}

      .link:focus-visible {
        outline: 2px solid ${variantStyle.color};
        outline-offset: 2px;
        border-radius: 2px;
      }

      ::slotted([slot="icon"]) {
        display: inline-flex;
        align-items: center;
      }
    `;
  }

  protected render(): void {
    const href = this.getHref();
    const target = this.getTarget();
    const disabled = this.isDisabled();

    const isExternal = target === '_blank' || href.startsWith('http');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <a 
        class="link" 
        href="${disabled ? '#' : href}" 
        target="${target}"
        ${disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
        ${isExternal ? 'rel="noopener noreferrer"' : ''}
      >
        <slot name="icon"></slot>
        <slot></slot>
      </a>
    `;

    if (disabled) {
      const link = this.shadow.querySelector('.link') as HTMLAnchorElement;
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-link', RellLink);

