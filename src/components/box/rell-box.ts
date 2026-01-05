import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellBox extends BaseComponent {
  static get observedAttributes() {
    return ['padding', 'margin', 'variant', 'border-radius', 'shadow'];
  }

  private getPadding(): string {
    const padding = this.getAttribute('padding');
    return padding || spacing[4];
  }

  private getMargin(): string {
    return this.getAttribute('margin') || '0';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getBorderRadius(): string {
    const radius = this.getAttribute('border-radius');
    return radius || '0';
  }

  private getShadow(): string {
    const shadow = this.getAttribute('shadow');
    return shadow || 'none';
  }

  protected getComponentStyles(): string {
    const padding = this.getPadding();
    const margin = this.getMargin();
    const variant = this.getVariant();
    const borderRadius = this.getBorderRadius();
    const shadow = this.getShadow();

    const variantStyles: Record<string, { bg: string; border: string }> = {
      default: {
        bg: 'var(--rell-surface-base)',
        border: 'none',
      },
      outlined: {
        bg: 'var(--rell-surface-base)',
        border: '1px solid var(--rell-border-default)',
      },
      filled: {
        bg: 'var(--rell-bg-secondary)',
        border: 'none',
      },
      elevated: {
        bg: 'var(--rell-surface-base)',
        border: 'none',
      },
    };

    const style = variantStyles[variant] || variantStyles.default;
    const boxShadow = shadow !== 'none' ? (shadows[shadow as keyof typeof shadows] || shadow) : 'none';

    return `
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .box {
        width: 100%;
        padding: ${padding};
        margin: ${margin};
        background-color: ${style.bg};
        border: ${style.border};
        border-radius: ${borderRadius};
        box-shadow: ${boxShadow};
        box-sizing: border-box;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="box">
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-box', RellBox);
