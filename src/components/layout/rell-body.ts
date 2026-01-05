import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellBody extends BaseComponent {
  static get observedAttributes() {
    return ['padding', 'max-width', 'variant'];
  }

  private getPadding(): string {
    return this.getAttribute('padding') || spacing[6];
  }

  private getMaxWidth(): string {
    return this.getAttribute('max-width') || 'none';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const padding = this.getPadding();
    const maxWidth = this.getMaxWidth();
    const variant = this.getVariant();

    const variantStyles: Record<string, string> = {
      default: 'var(--rell-bg-primary)',
      secondary: 'var(--rell-bg-secondary)',
      elevated: 'var(--rell-bg-elevated)',
    };

    const bgColor = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: block;
        width: 100%;
        flex: 1;
      }

      .body {
        width: 100%;
        min-height: 100%;
        background-color: ${bgColor};
        padding: ${padding};
        box-sizing: border-box;
        ${maxWidth !== 'none' ? `
          max-width: ${maxWidth};
          margin: 0 auto;
        ` : ''}
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <main class="body">
        <slot></slot>
      </main>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-body', RellBody);

