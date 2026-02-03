import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellMenuDivider extends BaseComponent {
  protected getComponentStyles(): string {
    return `
      :host {
        display: block;
        width: 100%;
      }

      .menu-divider {
        height: 1px;
        background-color: var(--rell-border-default);
        margin: ${spacing[1]} 0;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="menu-divider" role="separator"></div>
    `;
  }
}

customElements.define('rell-menu-divider', RellMenuDivider);

