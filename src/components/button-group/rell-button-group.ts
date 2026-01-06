import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellButtonGroup extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'variant', 'size', 'gap'];
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'horizontal';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || '';
  }

  private getSize(): string {
    return this.getAttribute('size') || '';
  }

  private getGap(): string {
    return this.getAttribute('gap') || '0';
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const gap = this.getGap();
    const isVertical = orientation === 'vertical';

    return `
      :host {
        display: inline-flex;
        flex-direction: ${isVertical ? 'column' : 'row'};
        gap: ${gap};
      }

      ::slotted(rell-button) {
        ${gap === '0' ? `
          ${isVertical ? `
            border-radius: 0;
            margin-top: -1px;
            border-top: none;
          ` : `
            border-radius: 0;
            margin-left: -1px;
            border-left: none;
          `}
        ` : ''}
      }

      ::slotted(rell-button:not(:first-child):not(:last-child)) {
        ${gap === '0' ? `
          ${isVertical ? `
            border-top: 1px solid var(--rell-border-default);
            border-bottom: 1px solid var(--rell-border-default);
          ` : `
            border-left: 1px solid var(--rell-border-default);
            border-right: 1px solid var(--rell-border-default);
          `}
        ` : ''}
      }

      ::slotted(rell-button:first-child) {
        ${gap === '0' ? `
          ${isVertical ? `
            border-top-left-radius: ${radius.md};
            border-top-right-radius: ${radius.md};
            margin-top: 0;
            border-bottom: 1px solid var(--rell-border-default);
          ` : `
            border-top-left-radius: ${radius.md};
            border-bottom-left-radius: ${radius.md};
            margin-left: 0;
            border-right: 1px solid var(--rell-border-default);
          `}
        ` : ''}
      }

      ::slotted(rell-button:last-child) {
        ${gap === '0' ? `
          ${isVertical ? `
            border-bottom-left-radius: ${radius.md};
            border-bottom-right-radius: ${radius.md};
            border-top: 1px solid var(--rell-border-default);
          ` : `
            border-top-right-radius: ${radius.md};
            border-bottom-right-radius: ${radius.md};
            border-left: 1px solid var(--rell-border-default);
          `}
        ` : ''}
      }

      ::slotted(rell-button:only-child) {
        border-radius: ${radius.md};
        ${gap === '0' ? `
          ${isVertical ? 'border-top: 2px solid var(--rell-border-default); border-bottom: 2px solid var(--rell-border-default);' : 'border-left: 2px solid var(--rell-border-default); border-right: 2px solid var(--rell-border-default);'}
        ` : ''}
      }
    `;
  }

  protected render(): void {
    const variant = this.getVariant();
    const size = this.getSize();

    const buttons = Array.from(this.querySelectorAll('rell-button'));
    buttons.forEach(button => {
      if (variant) {
        button.setAttribute('variant', variant);
      }
      if (size) {
        button.setAttribute('size', size);
      }
    });

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-button-group', RellButtonGroup);

