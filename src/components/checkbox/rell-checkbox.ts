import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellCheckbox extends BaseComponent {
  static get observedAttributes() {
    return ['checked', 'disabled', 'size', 'indeterminate', 'value'];
  }

  private checkboxElement?: HTMLInputElement;
  private labelElement?: HTMLLabelElement;

  private isChecked(): boolean {
    return this.hasAttribute('checked');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isIndeterminate(): boolean {
    return this.hasAttribute('indeterminate');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();

    const sizeStyles: Record<string, { size: string; checkSize: string }> = {
      sm: { size: '16px', checkSize: '10px' },
      md: { size: '20px', checkSize: '12px' },
      lg: { size: '24px', checkSize: '14px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${spacing[3]};
      }

      .checkbox-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      .checkbox-input {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
      }

      .checkbox-custom {
        position: relative;
        display: inline-block;
        width: ${style.size};
        height: ${style.size};
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.md};
        background-color: var(--rell-surface-base);
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        opacity: ${disabled ? '0.5' : '1'};
        box-sizing: border-box;
      }

      .checkbox-custom:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0) rotate(45deg);
        width: ${parseFloat(style.checkSize) * 0.6}px;
        height: ${parseFloat(style.checkSize) * 1.2}px;
        border-right: 2px solid var(--rell-text-inverse);
        border-bottom: 2px solid var(--rell-text-inverse);
        transition: transform 0.2s ease;
      }

      .checkbox-input:checked + .checkbox-custom {
        background-color: var(--rell-interactive-primary);
        border-color: var(--rell-interactive-primary);
      }

      .checkbox-input:checked + .checkbox-custom:before {
        transform: translate(-50%, -50%) scale(1) rotate(45deg);
      }

      .checkbox-input:indeterminate + .checkbox-custom {
        background-color: var(--rell-interactive-primary);
        border-color: var(--rell-interactive-primary);
      }

      .checkbox-input:indeterminate + .checkbox-custom:before {
        content: "";
        width: ${parseFloat(style.checkSize) * 0.8}px;
        height: 2px;
        border: none;
        background-color: var(--rell-text-inverse);
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
      }

      .checkbox-input:focus-visible + .checkbox-custom {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: 2px;
      }

      .checkbox-label {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-primary);
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        user-select: none;
      }

      .checkbox-label.disabled {
        opacity: 0.5;
      }
    `;
  }

  protected render(): void {
    const checked = this.isChecked();
    const disabled = this.isDisabled();
    const indeterminate = this.isIndeterminate();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <label class="checkbox-wrapper">
        <input 
          type="checkbox" 
          class="checkbox-input" 
          ${checked ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''}
        />
        <span class="checkbox-custom"></span>
      </label>
      <span class="checkbox-label ${disabled ? 'disabled' : ''}">
        <slot></slot>
      </span>
    `;

    this.checkboxElement = this.shadow.querySelector('.checkbox-input') as HTMLInputElement;
    this.labelElement = this.shadow.querySelector('.checkbox-label');

    if (this.checkboxElement) {
      if (indeterminate) {
        this.checkboxElement.indeterminate = true;
      }

      this.checkboxElement.addEventListener('change', () => {
        if (this.checkboxElement) {
          if (this.checkboxElement.checked) {
            this.setAttribute('checked', '');
            this.removeAttribute('indeterminate');
          } else {
            this.removeAttribute('checked');
            this.removeAttribute('indeterminate');
          }
          this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checkboxElement.checked },
            bubbles: true,
            composed: true,
          }));
        }
      });
    }

    if (this.labelElement) {
      this.labelElement.addEventListener('click', () => {
        if (!disabled && this.checkboxElement) {
          this.checkboxElement.click();
        }
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (this.checkboxElement) {
      if (name === 'checked') {
        this.checkboxElement.checked = this.isChecked();
      }
      if (name === 'disabled') {
        this.checkboxElement.disabled = this.isDisabled();
      }
      if (name === 'indeterminate') {
        this.checkboxElement.indeterminate = this.isIndeterminate();
      }
    }
    this.render();
  }
}

customElements.define('rell-checkbox', RellCheckbox);

