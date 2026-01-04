import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTab extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'active', 'disabled'];
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
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
        display: inline-block;
      }

      button {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        padding: ${spacing[3]} ${spacing[4]};
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: ${active ? '600' : '500'};
        color: ${active ? 'var(--rell-interactive-primary)' : 'var(--rell-text-secondary)'};
        background: none;
        border: none;
        border-bottom: 2px solid ${active ? 'var(--rell-interactive-primary)' : 'transparent'};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        outline: none;
        opacity: ${disabled ? '0.5' : '1'};
        position: relative;
      }

      button:hover:not(:disabled) {
        color: var(--rell-text-primary);
      }

      button:focus-visible {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: -2px;
      }

      button:disabled {
        cursor: not-allowed;
      }

      .tab-indicator {
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--rell-interactive-primary);
        transform: scaleX(${active ? '1' : '0'});
        transition: transform 0.2s ease;
      }
    `;
  }

  protected render(): void {
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <button role="tab" ${disabled ? 'disabled' : ''} tabindex="${this.isActive() ? '0' : '-1'}">
        <slot></slot>
        <span class="tab-indicator"></span>
      </button>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-tab', RellTab);

