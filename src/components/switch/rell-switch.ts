import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSwitch extends BaseComponent {
  static get observedAttributes() {
    return ['checked', 'disabled', 'size', 'label', 'error', 'error-message'];
  }

  private switchElement?: HTMLInputElement;
  private labelElement?: HTMLLabelElement;

  private isChecked(): boolean {
    return this.hasAttribute('checked');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getLabel(): string {
    return this.getAttribute('label') || '';
  }

  private hasError(): boolean {
    return this.hasAttribute('error');
  }

  private getErrorMessage(): string {
    return this.getAttribute('error-message') || '';
  }

  public setError(message?: string): void {
    this.setAttribute('error', '');
    if (message) {
      this.setAttribute('error-message', message);
    }
    this.render();
  }

  public clearError(): void {
    this.removeAttribute('error');
    this.removeAttribute('error-message');
    this.render();
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();
    const error = this.hasError();

    const sizeStyles: Record<string, { width: string; height: string; thumbSize: string; translate: string }> = {
      sm: { width: '36px', height: '20px', thumbSize: '14px', translate: '16px' },
      md: { width: '44px', height: '24px', thumbSize: '18px', translate: '20px' },
      lg: { width: '52px', height: '28px', thumbSize: '22px', translate: '24px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const borderColor = error ? 'var(--rell-border-error)' : 'var(--rell-border-default)';
    const bgColor = error ? 'var(--rell-border-error)' : 'var(--rell-surface-base)';

    return `
      :host {
        display: inline-flex;
        align-items: flex-start;
        gap: ${spacing[3]};
        flex-direction: column;
      }

      .switch-wrapper {
        display: flex;
        align-items: center;
        gap: ${spacing[3]};
      }

      .switch-container {
        position: relative;
        display: inline-block;
        width: ${style.width};
        height: ${style.height};
      }

      .switch-input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .switch-slider {
        position: absolute;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${bgColor};
        border: 2px solid ${borderColor};
        transition: all 0.3s ease;
        border-radius: ${radius.full};
        opacity: ${disabled ? '0.5' : '1'};
      }

      .switch-slider:before {
        position: absolute;
        content: "";
        height: ${style.thumbSize};
        width: ${style.thumbSize};
        left: 2px;
        bottom: 2px;
        background-color: var(--rell-text-primary);
        transition: all 0.3s ease;
        border-radius: ${radius.full};
      }

      .switch-input:checked + .switch-slider {
        background-color: var(--rell-interactive-primary);
        border-color: var(--rell-interactive-primary);
      }

      .switch-input:checked + .switch-slider:before {
        transform: translateX(${style.translate});
        background-color: var(--rell-text-inverse);
      }

      .switch-input:focus-visible + .switch-slider {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: 2px;
      }

      .switch-label {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-primary);
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        user-select: none;
      }

      .switch-label.disabled {
        opacity: 0.5;
      }

      .switch-error-message {
        margin-top: ${spacing[1]};
        font-size: 0.875rem;
        color: var(--rell-status-error);
        display: ${this.hasError() ? 'block' : 'none'};
      }
    `;
  }

  protected render(): void {
    const checked = this.isChecked();
    const disabled = this.isDisabled();
    const label = this.getLabel();
    const errorMessage = this.getErrorMessage();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div>
        <label class="switch-wrapper">
          <div class="switch-container">
            <input 
              type="checkbox" 
              class="switch-input" 
              ${checked ? 'checked' : ''} 
              ${disabled ? 'disabled' : ''}
            />
            <span class="switch-slider"></span>
          </div>
          ${label ? `<span class="switch-label ${disabled ? 'disabled' : ''}">${label}</span>` : '<slot></slot>'}
        </label>
        ${errorMessage ? `<span class="switch-error-message">${errorMessage}</span>` : ''}
      </div>
    `;

    this.switchElement = this.shadow.querySelector('.switch-input') as HTMLInputElement;
    this.labelElement = this.shadow.querySelector('.switch-label') as HTMLLabelElement | null || undefined;

    if (this.switchElement) {
      this.switchElement.addEventListener('change', () => {
        if (this.switchElement?.checked) {
          this.setAttribute('checked', '');
        } else {
          this.removeAttribute('checked');
        }
        this.dispatchEvent(new CustomEvent('change', {
          detail: { checked: this.switchElement?.checked },
          bubbles: true,
          composed: true,
        }));
      });
    }

    if (this.labelElement) {
      this.labelElement.addEventListener('click', () => {
        if (!disabled && this.switchElement) {
          this.switchElement.click();
        }
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (this.switchElement) {
      if (name === 'checked') {
        this.switchElement.checked = this.isChecked();
      }
      if (name === 'disabled') {
        this.switchElement.disabled = this.isDisabled();
      }
    }
    this.render();
  }
}

customElements.define('rell-switch', RellSwitch);

