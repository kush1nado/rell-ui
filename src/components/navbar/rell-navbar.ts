import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellNavbar extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'sticky', 'height'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private isSticky(): boolean {
    return this.hasAttribute('sticky');
  }

  private getHeight(): string {
    return this.getAttribute('height') || '60px';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const sticky = this.isSticky();
    const height = this.getHeight();

    const variantStyles: Record<string, { bg: string; shadow: string; border: string }> = {
      default: {
        bg: 'var(--rell-surface-base)',
        shadow: 'none',
        border: '1px solid var(--rell-border-default)',
      },
      elevated: {
        bg: 'var(--rell-surface-base)',
        shadow: 'var(--rell-shadow-md)',
        border: 'none',
      },
      transparent: {
        bg: 'transparent',
        shadow: 'none',
        border: 'none',
      },
    };

    const style = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: block;
        width: 100%;
      }

      .navbar {
        width: 100%;
        height: ${height};
        background-color: ${style.bg};
        box-shadow: ${style.shadow};
        border-bottom: ${style.border};
        padding: 0 ${spacing[6]};
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${spacing[4]};
        ${sticky ? `
          position: sticky;
          top: 0;
          z-index: 100;
        ` : ''}
      }

      .navbar-start {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
        flex: 1;
      }

      .navbar-center {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
        flex: 1;
        justify-content: center;
      }

      .navbar-end {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
        flex: 1;
        justify-content: flex-end;
      }

      ::slotted([slot="start"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
      }

      ::slotted([slot="center"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
      }

      ::slotted([slot="end"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[4]};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <nav class="navbar">
        <div class="navbar-start">
          <slot name="start"></slot>
        </div>
        <div class="navbar-center">
          <slot name="center"></slot>
        </div>
        <div class="navbar-end">
          <slot name="end"></slot>
        </div>
      </nav>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-navbar', RellNavbar);

