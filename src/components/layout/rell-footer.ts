import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellFooter extends BaseComponent {
  static get observedAttributes() {
    return ['height', 'sticky', 'variant'];
  }

  private getHeight(): string {
    return this.getAttribute('height') || 'auto';
  }

  private isSticky(): boolean {
    return this.hasAttribute('sticky');
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const height = this.getHeight();
    const sticky = this.isSticky();
    const variant = this.getVariant();

    const variantStyles: Record<string, string> = {
      default: 'var(--rell-surface-base)',
      elevated: 'var(--rell-surface-base)',
      transparent: 'transparent',
    };

    const bgColor = variantStyles[variant] || variantStyles.default;
    const shadow = variant === 'elevated' ? 'var(--rell-shadow-md)' : 'none';

    return `
      :host {
        display: block;
        width: 100%;
      }

      .footer {
        width: 100%;
        min-height: ${height === 'auto' ? '60px' : height};
        background-color: ${bgColor};
        box-shadow: ${shadow};
        border-top: ${variant === 'transparent' ? 'none' : '1px solid var(--rell-border-default)'};
        padding: ${spacing[4]} ${spacing[6]};
        box-sizing: border-box;
        ${sticky ? `
          position: sticky;
          bottom: 0;
          z-index: 100;
        ` : ''}
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <footer class="footer">
        <slot></slot>
      </footer>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-footer', RellFooter);

