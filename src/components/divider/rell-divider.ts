import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellDivider extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'spacing', 'label', 'variant'];
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'horizontal';
  }

  private getSpacing(): string {
    return this.getAttribute('spacing') || spacing[4];
  }

  private getLabel(): string {
    return this.getAttribute('label') || '';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'solid';
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const spacing = this.getSpacing();
    const label = this.getLabel();
    const variant = this.getVariant();

    const isVertical = orientation === 'vertical';

    const variantStyles: Record<string, string> = {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
    };

    const borderStyle = variantStyles[variant] || 'solid';

    return `
      :host {
        display: block;
        width: 100%;
      }

      .divider {
        display: flex;
        align-items: center;
        ${isVertical ? `
          flex-direction: column;
          width: 1px;
          height: 100%;
          min-height: 40px;
          margin: 0 ${spacing};
        ` : `
          flex-direction: row;
          height: 1px;
          width: 100%;
          margin: ${spacing} 0;
        `}
        position: relative;
      }

      .divider-line {
        flex: 1;
        ${isVertical ? `
          width: 1px;
          height: 100%;
          border-left: 1px ${borderStyle} var(--rell-border-default);
        ` : `
          height: 1px;
          width: 100%;
          border-top: 1px ${borderStyle} var(--rell-border-default);
        `}
      }

      ${label ? `
        .divider-line:first-child {
          ${isVertical ? 'height: 1rem;' : 'width: 1rem;'}
        }
        .divider-line:last-child {
          ${isVertical ? 'height: 1rem;' : 'width: 1rem;'}
        }
      ` : ''}

      .divider-label {
        padding: ${isVertical ? `${spacing[2]} 0` : `0 ${spacing[2]}`};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        white-space: nowrap;
        flex-shrink: 0;
      }
    `;
  }

  protected render(): void {
    const label = this.getLabel();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="divider">
        ${label ? `<div class="divider-line"></div>` : ''}
        ${label ? `<span class="divider-label">${label}</span>` : ''}
        <div class="divider-line"></div>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-divider', RellDivider);

