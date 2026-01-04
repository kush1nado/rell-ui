import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellTabPanel extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'active'];
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private isActive(): boolean {
    return this.hasAttribute('active');
  }

  protected getComponentStyles(): string {
    const active = this.isActive();

    return `
      :host {
        display: ${active ? 'block' : 'none'};
      }

      .tab-panel {
        padding: ${spacing[4]};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="tab-panel" role="tabpanel" ${this.isActive() ? '' : 'hidden'}>
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-tab-panel', RellTabPanel);

