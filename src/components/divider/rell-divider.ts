import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellDivider extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'spacing', 'label', 'variant', 'gradient', 'thickness'];
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

  private getGradient(): string {
    return this.getAttribute('gradient') || '';
  }

  private getThickness(): string {
    return this.getAttribute('thickness') || '1px';
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const spacing = this.getSpacing();
    const label = this.getLabel();
    const variant = this.getVariant();
    const gradient = this.getGradient();
    const thickness = this.getThickness();

    const isVertical = orientation === 'vertical';

    const variantStyles: Record<string, string> = {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
    };

    const gradientMap: Record<string, string> = {
      'cyan-magenta': 'linear-gradient(90deg, var(--rell-accent-cyan), var(--rell-accent-magenta))',
      'cyan-magenta-pink': 'linear-gradient(90deg, var(--rell-accent-cyan), var(--rell-accent-magenta), var(--rell-accent-pink))',
      'magenta-pink': 'linear-gradient(90deg, var(--rell-accent-magenta), var(--rell-accent-pink))',
      'cyan-green': 'linear-gradient(90deg, var(--rell-accent-cyan), var(--rell-accent-green))',
    };

    const borderStyle = variantStyles[variant] || 'solid';
    const gradientValue = gradient ? gradientMap[gradient] : '';
    const hasGradient = !!gradientValue;

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
          width: ${thickness};
          height: 100%;
          min-height: 40px;
          margin: 0 ${spacing};
        ` : `
          flex-direction: row;
          height: ${thickness};
          width: 100%;
          margin: ${spacing} 0;
        `}
        position: relative;
      }

      .divider-line {
        flex: 1;
        ${isVertical ? `
          width: ${thickness};
          height: 100%;
          ${hasGradient ? `
            background: ${gradientValue};
            border: none;
          ` : `
            border-left: ${thickness} ${borderStyle} var(--rell-border-default);
          `}
        ` : `
          height: ${thickness};
          width: 100%;
          ${hasGradient ? `
            background: ${gradientValue};
            border: none;
          ` : `
            border-top: ${thickness} ${borderStyle} var(--rell-border-default);
          `}
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

