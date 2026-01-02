import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellContainer extends BaseComponent {
  static get observedAttributes() {
    return ['max-width', 'padding', 'fluid'];
  }

  private getMaxWidth(): string {
    const maxWidth = this.getAttribute('max-width');
    if (maxWidth) return maxWidth;
    
    const fluid = this.hasAttribute('fluid');
    return fluid ? '100%' : '1200px';
  }

  private getPadding(): string {
    const padding = this.getAttribute('padding');
    if (padding) return padding;
    return spacing[4];
  }

  protected getComponentStyles(): string {
    const maxWidth = this.getMaxWidth();
    const padding = this.getPadding();

    return `
      :host {
        width: 100%;
        max-width: ${maxWidth};
        margin-left: auto;
        margin-right: auto;
        padding-left: ${padding};
        padding-right: ${padding};
        box-sizing: border-box;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-container', RellContainer);

