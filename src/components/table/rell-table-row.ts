import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellTableRow extends BaseComponent {
  static get observedAttributes() {
    return ['clickable', 'selected'];
  }

  private isClickable(): boolean {
    return this.hasAttribute('clickable');
  }

  private isSelected(): boolean {
    return this.hasAttribute('selected');
  }

  protected getComponentStyles(): string {
    const clickable = this.isClickable();
    const selected = this.isSelected();

    return `
      :host {
        display: table-row;
        transition: background-color 0.2s ease;
      }

      ${selected ? `
      :host {
        background-color: var(--rell-interactive-primary);
      }
      ::slotted(rell-table-cell) {
        color: var(--rell-text-inverse);
      }
      ` : ''}

      ${clickable ? `
      :host {
        cursor: pointer;
      }
      :host:hover {
        background-color: var(--rell-surface-hover);
      }
      ` : ''}
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
    `;

    if (this.isClickable()) {
      this.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('row-click', {
          bubbles: true,
          composed: true,
          detail: { row: this }
        }));
      });
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-table-row', RellTableRow);

