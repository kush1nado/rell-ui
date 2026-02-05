import { BaseComponent } from '../../utils/base-component';

export class RellBackground extends BaseComponent {
  static get observedAttributes() {
    return ['pattern', 'gradient', 'blur', 'opacity', 'variant'];
  }

  private getPattern(): string {
    return this.getAttribute('pattern') || '';
  }

  private getGradient(): string {
    return this.getAttribute('gradient') || '';
  }

  private getBlur(): string {
    return this.getAttribute('blur') || '';
  }

  private getOpacity(): string {
    return this.getAttribute('opacity') || '1';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'grid';
  }

  protected getComponentStyles(): string {
    const pattern = this.getPattern();
    const gradient = this.getGradient();
    const blur = this.getBlur();
    const opacity = this.getOpacity();
    const variant = this.getVariant();

    const patternMap: Record<string, string> = {
      grid: `
        background-image: 
          linear-gradient(var(--rell-border-default) 1px, transparent 1px),
          linear-gradient(90deg, var(--rell-border-default) 1px, transparent 1px);
        background-size: 20px 20px;
      `,
      dots: `
        background-image: radial-gradient(circle, var(--rell-border-default) 1px, transparent 1px);
        background-size: 20px 20px;
      `,
      lines: `
        background-image: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          var(--rell-border-default) 2px,
          var(--rell-border-default) 4px
        );
      `,
    };

    const gradientMap: Record<string, string> = {
      'cyan-magenta': 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
      'cyan-magenta-pink': 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1), rgba(255, 0, 102, 0.1))',
      'magenta-pink': 'linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 102, 0.1))',
      'cyan-green': 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 136, 0.1))',
    };

    const patternKey = pattern || variant;
    const patternValue = patternKey && patternMap[patternKey] ? patternMap[patternKey].trim() : '';
    const gradientValue = gradient ? gradientMap[gradient] : '';

    let backgroundStyle = '';
    if (gradientValue && patternValue) {
      const patternBg = patternValue.replace(/background-image:\s*/, '').replace(/background-size:.*$/, '').trim();
      backgroundStyle = `
        background: ${gradientValue};
        background-image: ${patternBg};
        background-size: 20px 20px;
      `;
    } else if (gradientValue) {
      backgroundStyle = `background: ${gradientValue};`;
    } else if (patternValue) {
      backgroundStyle = patternValue;
    }

    return `
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: ${opacity};
        ${backgroundStyle}
        ${blur ? `
          backdrop-filter: blur(${blur});
          -webkit-backdrop-filter: blur(${blur});
        ` : ''}
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="background"></div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-background', RellBackground);

