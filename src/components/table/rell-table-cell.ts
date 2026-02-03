import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellTableCell extends BaseComponent {
  static get observedAttributes() {
    return ['header', 'align', 'colspan', 'rowspan'];
  }

  private isHeader(): boolean {
    return this.hasAttribute('header');
  }

  private getAlign(): string {
    return this.getAttribute('align') || 'left';
  }

  protected getComponentStyles(): string {
    const align = this.getAlign();
    const isHeader = this.isHeader();

    return `
      :host {
        display: ${isHeader ? 'table-header-cell' : 'table-cell'};
        text-align: ${align};
        padding: ${spacing[3]} ${spacing[4]};
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        vertical-align: middle;
        white-space: nowrap;
        ${isHeader ? `
        font-weight: 600;
        color: var(--rell-text-primary);
        border-bottom: 2px solid var(--rell-border-default);
        background-color: var(--rell-surface-elevated);
        ` : `
        color: var(--rell-text-secondary);
        border-bottom: 1px solid var(--rell-border-default);
        `}
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

customElements.define('rell-table-cell', RellTableCell);

