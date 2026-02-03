import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTable extends BaseComponent {
  static get observedAttributes() {
    return ['striped', 'bordered', 'hover', 'size', 'variant'];
  }

  private isStriped(): boolean {
    return this.hasAttribute('striped');
  }

  private isBordered(): boolean {
    return this.hasAttribute('bordered');
  }

  private hasHover(): boolean {
    return this.hasAttribute('hover');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const striped = this.isStriped();
    const bordered = this.isBordered();
    const hover = this.hasHover();
    const size = this.getSize();

    const sizeStyles: Record<string, { padding: string; fontSize: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: block;
        width: 100%;
        overflow-x: auto;
      }

      .table-wrapper {
        width: 100%;
        overflow-x: auto;
        border-radius: ${radius.md};
        border: ${bordered ? '1px solid var(--rell-border-default)' : 'none'};
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
        background-color: var(--rell-surface-base);
      }

      thead {
        background-color: var(--rell-surface-elevated);
      }

      ::slotted(rell-table-row[slot="header"]) {
        background-color: var(--rell-surface-elevated);
      }

      ${striped ? `
      ::slotted(rell-table-row:nth-child(even)) {
        background-color: var(--rell-surface-elevated);
      }
      ` : ''}

      ${hover ? `
      ::slotted(rell-table-row:hover) {
        background-color: var(--rell-surface-hover);
      }
      ` : ''}

      ::slotted(rell-table-row:last-child rell-table-cell) {
        border-bottom: none;
      }

      .table-empty {
        padding: ${spacing[8]};
        text-align: center;
        color: var(--rell-text-tertiary);
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="table-wrapper">
        <table>
          <thead>
            <slot name="header"></slot>
          </thead>
          <tbody>
            <slot></slot>
          </tbody>
        </table>
      </div>
    `;
    
    // Add global styles to ensure table elements display correctly
    if (!document.getElementById('rell-table-global-styles')) {
      const style = document.createElement('style');
      style.id = 'rell-table-global-styles';
      style.textContent = `
        rell-table-row {
          display: table-row !important;
        }
        rell-table-cell {
          display: table-cell !important;
        }
        rell-table-cell[header] {
          display: table-header-cell !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-table', RellTable);

