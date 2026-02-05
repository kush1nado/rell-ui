import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellSection extends BaseComponent {
  static get observedAttributes() {
    return ['padding', 'background', 'overflow', 'position', 'variant', 'z-index'];
  }

  private getPadding(): string {
    const padding = this.getAttribute('padding');
    if (padding) return padding;
    return spacing[6];
  }

  private getBackground(): string {
    return this.getAttribute('background') || '';
  }

  private getOverflow(): string {
    return this.getAttribute('overflow') || 'visible';
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'static';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private getZIndex(): string {
    return this.getAttribute('z-index') || '';
  }

  protected getComponentStyles(): string {
    const padding = this.getPadding();
    const background = this.getBackground();
    const overflow = this.getOverflow();
    const position = this.getPosition();
    const variant = this.getVariant();
    const zIndex = this.getZIndex();

    const variantStyles: Record<string, { bg: string }> = {
      primary: {
        bg: 'var(--rell-bg-primary)',
      },
      secondary: {
        bg: 'var(--rell-bg-secondary)',
      },
      gradient: {
        bg: 'linear-gradient(135deg, var(--rell-bg-primary), var(--rell-bg-secondary))',
      },
    };

    const style = variantStyles[variant] || variantStyles.primary;
    const finalBackground = background || style.bg;

    return `
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .section {
        width: 100%;
        padding: ${padding};
        background: ${finalBackground};
        overflow: ${overflow};
        position: ${position};
        ${zIndex ? `z-index: ${zIndex};` : ''}
        box-sizing: border-box;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <section class="section">
        <slot></slot>
      </section>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-section', RellSection);

