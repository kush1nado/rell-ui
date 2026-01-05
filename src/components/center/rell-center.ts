import { BaseComponent } from '../../utils/base-component';

export class RellCenter extends BaseComponent {
  static get observedAttributes() {
    return ['axis', 'inline'];
  }

  private getAxis(): string {
    return this.getAttribute('axis') || 'both';
  }

  private isInline(): boolean {
    return this.hasAttribute('inline');
  }

  protected getComponentStyles(): string {
    const axis = this.getAxis();
    const inline = this.isInline();

    const display = inline ? 'inline-flex' : 'flex';
    
    let justifyContent = 'center';
    let alignItems = 'center';

    if (axis === 'horizontal') {
      alignItems = 'stretch';
    } else if (axis === 'vertical') {
      justifyContent = 'flex-start';
    }

    return `
      :host {
        display: ${display};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
        ${inline ? 'width: auto;' : 'width: 100%;'}
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

customElements.define('rell-center', RellCenter);
