import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellSpacer extends BaseComponent {
  static get observedAttributes() {
    return ['size', 'axis'];
  }

  private getSize(): string {
    const size = this.getAttribute('size');
    if (size) return size;
    return spacing[4];
  }

  private getAxis(): string {
    return this.getAttribute('axis') || 'vertical';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const axis = this.getAxis();

    return `
      :host {
        display: block;
        flex-shrink: 0;
        ${axis === 'vertical' ? `
          width: 100%;
          height: ${size};
        ` : `
          width: ${size};
          height: 100%;
        `}
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-spacer', RellSpacer);
