import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSegmentedControlItem extends BaseComponent {
  static get observedAttributes() {
    return ['active', 'value', 'disabled'];
  }

  private isActive(): boolean {
    return this.hasAttribute('active');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const active = this.isActive();
    const disabled = this.isDisabled();

    return `
      :host {
        display: block;
      }

      .segmented-control-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${spacing[2]} ${spacing[3]};
        border-radius: ${radius.sm};
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--rell-text-secondary);
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: 500;
        border: none;
        background: none;
        white-space: nowrap;
        user-select: none;
      }

      ${active ? `
      .segmented-control-item {
        color: var(--rell-text-inverse);
      }
      ` : ''}

      ${disabled ? `
      .segmented-control-item {
        opacity: 0.5;
        cursor: not-allowed;
      }
      ` : `
      .segmented-control-item:hover:not(.active) {
        color: var(--rell-text-primary);
      }
      `}
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <button class="segmented-control-item" ${this.isDisabled() ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;

    if (!this.isDisabled()) {
      this.addEventListener('click', () => {
        const control = this.closest('rell-segmented-control');
        if (control) {
          const value = this.getAttribute('value') || '';
          control.setAttribute('value', value);
          
          // Update all items
          const items = control.querySelectorAll('rell-segmented-control-item');
          items.forEach(item => {
            if (item === this) {
              item.setAttribute('active', '');
            } else {
              item.removeAttribute('active');
            }
          });

          control.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { value }
          }));
        }
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'active') {
      this.render();
    }
  }
}

customElements.define('rell-segmented-control-item', RellSegmentedControlItem);

