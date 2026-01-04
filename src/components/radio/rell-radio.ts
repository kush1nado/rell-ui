import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellRadio extends BaseComponent {
  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled', 'size'];
  }

  private radioElement?: HTMLInputElement;
  private labelElement?: HTMLLabelElement;

  private getName(): string {
    return this.getAttribute('name') || '';
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private isChecked(): boolean {
    return this.hasAttribute('checked');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();

    const sizeStyles: Record<string, { size: string; dotSize: string }> = {
      sm: { size: '16px', dotSize: '8px' },
      md: { size: '20px', dotSize: '10px' },
      lg: { size: '24px', dotSize: '12px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${spacing[3]};
      }

      .radio-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      .radio-input {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
      }

      .radio-custom {
        position: relative;
        display: inline-block;
        width: ${style.size};
        height: ${style.size};
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.full};
        background-color: var(--rell-surface-base);
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        opacity: ${disabled ? '0.5' : '1'};
        box-sizing: border-box;
      }

      .radio-custom:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: ${style.dotSize};
        height: ${style.dotSize};
        border-radius: ${radius.full};
        background-color: var(--rell-interactive-primary);
        transition: transform 0.2s ease;
      }

      .radio-input:checked + .radio-custom {
        border-color: var(--rell-interactive-primary);
      }

      .radio-input:checked + .radio-custom:before {
        transform: translate(-50%, -50%) scale(1);
      }

      .radio-input:focus-visible + .radio-custom {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: 2px;
      }

      .radio-label {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-primary);
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        user-select: none;
      }

      .radio-label.disabled {
        opacity: 0.5;
      }
    `;
  }

  protected render(): void {
    const name = this.getName();
    const value = this.getValue();
    const checked = this.isChecked();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <label class="radio-wrapper">
        <input 
          type="radio" 
          class="radio-input" 
          name="${name}"
          value="${value}"
          ${checked ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''}
        />
        <span class="radio-custom"></span>
      </label>
      <span class="radio-label ${disabled ? 'disabled' : ''}">
        <slot></slot>
      </span>
    `;

    this.radioElement = this.shadow.querySelector('.radio-input') as HTMLInputElement;
    this.labelElement = this.shadow.querySelector('.radio-label');

    if (this.radioElement) {
      this.radioElement.addEventListener('change', () => {
        if (this.radioElement?.checked) {
          this.setAttribute('checked', '');
          this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.getValue() },
            bubbles: true,
            composed: true,
          }));
        }
      });
    }

    if (this.labelElement) {
      this.labelElement.addEventListener('click', () => {
        if (!disabled && this.radioElement) {
          this.radioElement.click();
        }
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (this.radioElement) {
      if (name === 'checked') {
        this.radioElement.checked = this.isChecked();
      }
      if (name === 'disabled') {
        this.radioElement.disabled = this.isDisabled();
      }
      if (name === 'name') {
        this.radioElement.name = this.getName();
      }
      if (name === 'value') {
        this.radioElement.value = this.getValue();
      }
    }
    this.render();
  }
}

customElements.define('rell-radio', RellRadio);

