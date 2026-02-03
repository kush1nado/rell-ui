import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellMenu extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'orientation'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const orientation = this.getOrientation();
    const isHorizontal = orientation === 'horizontal';

    const variantStyles: Record<string, { bg: string; border: string }> = {
      default: {
        bg: 'transparent',
        border: 'none',
      },
      outlined: {
        bg: 'var(--rell-surface-base)',
        border: 'var(--rell-border-default)',
      },
      elevated: {
        bg: 'var(--rell-surface-elevated)',
        border: 'none',
      },
    };

    const style = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: ${isHorizontal ? 'flex' : 'block'};
        flex-direction: ${isHorizontal ? 'row' : 'column'};
        width: 100%;
      }

      .menu {
        display: ${isHorizontal ? 'flex' : 'block'};
        flex-direction: ${isHorizontal ? 'row' : 'column'};
        background-color: ${style.bg};
        ${style.border !== 'none' ? `border: 2px solid ${style.border};` : ''}
        border-radius: ${radius.md};
        padding: ${spacing[1]};
        ${variant === 'elevated' ? `box-shadow: ${shadows.md};` : ''}
        gap: ${isHorizontal ? spacing[1] : 0};
        --menu-orientation: ${orientation};
      }

      ::slotted(rell-menu-item) {
        ${isHorizontal ? `
          margin: 0;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        ` : 'margin: ' + spacing[1] + ' 0;'}
      }

      ::slotted(rell-menu-item:first-child) {
        margin-top: 0;
      }

      ::slotted(rell-menu-item:last-child) {
        margin-bottom: 0;
      }

      ${isHorizontal ? `
        ::slotted(rell-menu-item) {
          margin-right: ${spacing[1]};
          --menu-item-width: auto;
        }
        ::slotted(rell-menu-item:last-child) {
          margin-right: 0;
        }
      ` : ''}

      ::slotted(rell-menu-divider) {
        ${isHorizontal ? 'width: 1px; height: 24px; margin: 0 ' + spacing[1] + ';' : 'margin: ' + spacing[1] + ' 0;'}
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <nav class="menu" role="menu">
        <slot></slot>
      </nav>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-menu', RellMenu);

