import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSkeleton extends BaseComponent {
  static get observedAttributes() {
    return ['width', 'height', 'variant', 'animated'];
  }

  private getWidth(): string {
    return this.getAttribute('width') || '100%';
  }

  private getHeight(): string {
    return this.getAttribute('height') || '1rem';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'rect';
  }

  private isAnimated(): boolean {
    return this.hasAttribute('animated');
  }

  protected getComponentStyles(): string {
    const width = this.getWidth();
    const height = this.getHeight();
    const variant = this.getVariant();
    const animated = this.isAnimated();

    const variantStyles: Record<string, { borderRadius: string }> = {
      rect: { borderRadius: radius.md },
      circle: { borderRadius: radius.full },
      text: { borderRadius: radius.sm },
    };

    const style = variantStyles[variant] || variantStyles.rect;

    return `
      :host {
        display: inline-block;
        width: ${width};
        height: ${height};
      }

      .skeleton {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          var(--rell-surface-base) 0%,
          var(--rell-surface-hover) 50%,
          var(--rell-surface-base) 100%
        );
        background-size: 200% 100%;
        border-radius: ${style.borderRadius};
        ${animated ? `
        animation: skeleton-loading 1.5s ease-in-out infinite;
        ` : ''}
      }

      @keyframes skeleton-loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="skeleton"></div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-skeleton', RellSkeleton);

