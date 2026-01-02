import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellCol extends BaseComponent {
  static get observedAttributes() {
    return ['span', 'offset', 'grow', 'shrink', 'basis', 'align-self'];
  }

  private getSpan(): string {
    const span = this.getAttribute('span');
    if (!span) return 'auto';
    
    const spanNum = parseInt(span, 10);
    if (isNaN(spanNum) || spanNum < 1 || spanNum > 12) return 'auto';
    
    return `${(spanNum / 12) * 100}%`;
  }

  private getOffset(): string {
    const offset = this.getAttribute('offset');
    if (!offset) return '0';
    
    const offsetNum = parseInt(offset, 10);
    if (isNaN(offsetNum) || offsetNum < 0 || offsetNum > 11) return '0';
    
    return `${(offsetNum / 12) * 100}%`;
  }

  private getGrow(): string {
    return this.getAttribute('grow') || '0';
  }

  private getShrink(): string {
    return this.getAttribute('shrink') || '1';
  }

  private getBasis(): string {
    return this.getAttribute('basis') || 'auto';
  }

  private getAlignSelf(): string {
    return this.getAttribute('align-self') || 'auto';
  }

  protected getComponentStyles(): string {
    const span = this.getSpan();
    const offset = this.getOffset();
    const grow = this.getGrow();
    const shrink = this.getShrink();
    const basis = this.getBasis();
    const alignSelf = this.getAlignSelf();

    const width = span !== 'auto' ? `width: ${span};` : '';
    const marginLeft = offset !== '0' ? `margin-left: ${offset};` : '';

    return `
      :host {
        flex-grow: ${grow};
        flex-shrink: ${shrink};
        flex-basis: ${basis};
        align-self: ${alignSelf};
        ${width}
        ${marginLeft}
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

customElements.define('rell-col', RellCol);

