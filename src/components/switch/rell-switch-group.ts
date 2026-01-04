import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellSwitchGroup extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'gap'];
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  private getGap(): string {
    return this.getAttribute('gap') || spacing[3];
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const gap = this.getGap();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .switch-group {
        display: flex;
        flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
        gap: ${gap};
        flex-wrap: ${orientation === 'horizontal' ? 'wrap' : 'nowrap'};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="switch-group">
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-switch-group', RellSwitchGroup);

