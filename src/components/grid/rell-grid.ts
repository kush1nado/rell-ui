import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellGrid extends BaseComponent {
  static get observedAttributes() {
    return ['columns', 'rows', 'gap', 'column-gap', 'row-gap', 'align-items', 'justify-items'];
  }

  private getColumns(): string {
    return this.getAttribute('columns') || 'repeat(auto-fill, minmax(200px, 1fr))';
  }

  private getRows(): string {
    return this.getAttribute('rows') || 'auto';
  }

  private getGap(): string {
    const gap = this.getAttribute('gap');
    if (gap) return gap;
    return spacing[4];
  }

  private getColumnGap(): string {
    return this.getAttribute('column-gap') || this.getGap();
  }

  private getRowGap(): string {
    return this.getAttribute('row-gap') || this.getGap();
  }

  private getAlignItems(): string {
    return this.getAttribute('align-items') || 'stretch';
  }

  private getJustifyItems(): string {
    return this.getAttribute('justify-items') || 'stretch';
  }

  protected getComponentStyles(): string {
    const columns = this.getColumns();
    const rows = this.getRows();
    const columnGap = this.getColumnGap();
    const rowGap = this.getRowGap();
    const alignItems = this.getAlignItems();
    const justifyItems = this.getJustifyItems();

    return `
      :host {
        display: grid;
        grid-template-columns: ${columns};
        grid-template-rows: ${rows};
        column-gap: ${columnGap};
        row-gap: ${rowGap};
        align-items: ${alignItems};
        justify-items: ${justifyItems};
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

customElements.define('rell-grid', RellGrid);
