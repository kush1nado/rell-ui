import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellAccordionItem extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'value', 'disabled'];
  }

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const open = this.isOpen();
    const disabled = this.isDisabled();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .accordion-item {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .accordion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${spacing[4]};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        background-color: ${open ? 'var(--rell-surface-hover)' : 'transparent'};
        user-select: none;
        gap: ${spacing[3]};
        ${disabled ? 'opacity: 0.5;' : ''}
      }

      ${!disabled ? `
      .accordion-header:hover {
        background-color: var(--rell-surface-hover);
      }
      ` : ''}

      .accordion-title {
        flex: 1;
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: 500;
        color: var(--rell-text-primary);
        margin: 0;
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .accordion-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
        color: var(--rell-text-secondary);
        flex-shrink: 0;
        ${open ? 'transform: rotate(180deg);' : ''}
      }

      .accordion-content {
        max-height: ${open ? '1000px' : '0'};
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease;
        padding: ${open ? spacing[4] : '0'} ${spacing[4]};
        padding-top: ${open ? spacing[4] : '0'};
        color: var(--rell-text-secondary);
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        line-height: 1.6;
      }

      .accordion-content-inner {
        padding-bottom: ${spacing[4]};
      }

      ::slotted([slot="icon"]) {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
    `;
  }

  protected render(): void {
    const open = this.isOpen();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="accordion-item">
        <div class="accordion-header" role="button" ${disabled ? 'aria-disabled="true"' : ''} tabindex="${disabled ? '-1' : '0'}">
          <div class="accordion-title">
            <slot name="icon"></slot>
            <slot name="title"></slot>
          </div>
          <div class="accordion-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="accordion-content">
          <div class="accordion-content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    const header = this.shadow.querySelector('.accordion-header') as HTMLElement;
    if (header && !disabled) {
      header.addEventListener('click', () => this.toggle());
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    }
  }

  public toggle(): void {
    if (this.isDisabled()) return;

    const wasOpen = this.isOpen();
    if (wasOpen) {
      this.removeAttribute('open');
    } else {
      this.setAttribute('open', '');
    }

    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { value: this.getValue(), open: !wasOpen },
      bubbles: true,
      composed: true,
    }));
  }

  public open(): void {
    if (!this.isOpen() && !this.isDisabled()) {
      this.setAttribute('open', '');
      this.dispatchEvent(new CustomEvent('toggle', {
        detail: { value: this.getValue(), open: true },
        bubbles: true,
        composed: true,
      }));
    }
  }

  public close(): void {
    if (this.isOpen()) {
      this.removeAttribute('open');
      this.dispatchEvent(new CustomEvent('toggle', {
        detail: { value: this.getValue(), open: false },
        bubbles: true,
        composed: true,
      }));
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-accordion-item', RellAccordionItem);

