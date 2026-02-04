import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellWatermark extends BaseComponent {
  static get observedAttributes() {
    return ['text', 'opacity', 'font-size', 'color', 'rotate', 'gap', 'z-index', 'mode'];
  }

  private getText(): string {
    return this.getAttribute('text') || 'WATERMARK';
  }

  private getOpacity(): number {
    const opacity = this.getAttribute('opacity');
    return opacity ? parseFloat(opacity) : 0.15;
  }

  private getFontSize(): string {
    return this.getAttribute('font-size') || '16px';
  }

  private getColor(): string {
    return this.getAttribute('color') || 'var(--rell-text-secondary)';
  }

  private getRotate(): number {
    const rotate = this.getAttribute('rotate');
    return rotate ? parseFloat(rotate) : -45;
  }

  private getGap(): string {
    return this.getAttribute('gap') || '200px';
  }

  private getZIndex(): string {
    return this.getAttribute('z-index') || '1';
  }

  protected getComponentStyles(): string {
    const text = this.getText();
    const opacity = this.getOpacity();
    const fontSize = this.getFontSize();
    const color = this.getColor();
    const rotate = this.getRotate();
    const gap = this.getGap();
    const zIndex = this.getZIndex();

    return `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }

      .watermark-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: ${zIndex};
        overflow: hidden;
      }

      .watermark-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: repeating-linear-gradient(
          ${rotate}deg,
          transparent,
          transparent ${gap},
          ${color} ${gap},
          ${color} calc(${gap} + 1px)
        );
        background-size: ${gap} ${gap};
        opacity: ${opacity};
      }

      .watermark-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--rell-font-sans);
        font-size: ${fontSize};
        font-weight: 600;
        color: ${color};
        opacity: ${opacity};
        transform: rotate(${rotate}deg);
        white-space: nowrap;
        pointer-events: none;
        background: repeating-linear-gradient(
          ${rotate}deg,
          transparent,
          transparent ${gap},
          transparent ${gap}
        );
      }

      .watermark-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent calc(${gap} - 1px),
            ${color} calc(${gap} - 1px),
            ${color} ${gap}
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent calc(${gap} - 1px),
            ${color} calc(${gap} - 1px),
            ${color} ${gap}
          );
        opacity: ${opacity};
        pointer-events: none;
      }

      ::slotted(*) {
        position: relative;
        z-index: calc(${zIndex} + 1);
      }
    `;
  }

  protected render(): void {
    const text = this.getText();
    const mode = this.getAttribute('mode') || 'text';

    let content = '';
    if (mode === 'pattern') {
      content = '<div class="watermark-pattern"></div>';
    } else if (mode === 'grid') {
      content = '<div class="watermark-grid"></div>';
    } else {
      content = `<div class="watermark-text">${text}</div>`;
    }

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="watermark-container">
        ${content}
      </div>
      <slot></slot>
    `;
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'text' || name === 'opacity' || name === 'font-size' || name === 'color' || 
        name === 'rotate' || name === 'gap' || name === 'z-index') {
      this.render();
    }
  }
}

customElements.define('rell-watermark', RellWatermark);

