import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellRow extends BaseComponent {
  static get observedAttributes() {
    return ['gap', 'align', 'justify', 'wrap', 'direction'];
  }

  private getGap(): string {
    const gap = this.getAttribute('gap');
    if (gap) return gap;
    return spacing[4];
  }

  private getAlign(): string {
    return this.getAttribute('align') || 'stretch';
  }

  private getJustify(): string {
    return this.getAttribute('justify') || 'flex-start';
  }

  private getWrap(): string {
    return this.hasAttribute('wrap') ? 'wrap' : 'nowrap';
  }

  private getDirection(): string {
    return this.getAttribute('direction') || 'row';
  }

  protected getComponentStyles(): string {
    const gap = this.getGap();
    const align = this.getAlign();
    const justify = this.getJustify();
    const wrap = this.getWrap();
    const direction = this.getDirection();

    return `
      :host {
        display: flex;
        flex-direction: ${direction};
        flex-wrap: ${wrap};
        align-items: ${align};
        justify-content: ${justify};
        gap: ${gap};
        width: 100%;
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

customElements.define('rell-row', RellRow);

