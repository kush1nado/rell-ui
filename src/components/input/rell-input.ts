import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, colors } from '../../tokens';

export class RellInput extends BaseComponent {
  static get observedAttributes() {
    return [
      'type', 'placeholder', 'value', 'disabled', 'error', 'size',
      'required', 'min', 'max', 'minlength', 'maxlength', 'pattern',
      'error-message', 'validate-on'
    ];
  }

  private inputElement?: HTMLInputElement;
  private customValidator?: (value: string) => string | null;
  private validationMessage: string = '';

  private getType(): string {
    return this.getAttribute('type') || 'text';
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || '';
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private hasError(): boolean {
    return this.hasAttribute('error') || this.validationMessage !== '';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isRequired(): boolean {
    return this.hasAttribute('required');
  }

  private getMin(): string {
    return this.getAttribute('min') || '';
  }

  private getMax(): string {
    return this.getAttribute('max') || '';
  }

  private getMinLength(): string {
    return this.getAttribute('minlength') || '';
  }

  private getMaxLength(): string {
    return this.getAttribute('maxlength') || '';
  }

  private getPattern(): string {
    return this.getAttribute('pattern') || '';
  }

  private getErrorMessage(): string {
    return this.getAttribute('error-message') || this.validationMessage || '';
  }

  private getValidateOn(): string {
    return this.getAttribute('validate-on') || 'blur';
  }

  public setCustomValidator(validator: (value: string) => string | null): void {
    this.customValidator = validator;
  }

  public setError(message?: string): void {
    this.setAttribute('error', '');
    if (message) {
      this.setAttribute('error-message', message);
      this.validationMessage = message;
    }
    this.updateErrorMessage();
  }

  public clearError(): void {
    this.removeAttribute('error');
    this.removeAttribute('error-message');
    this.validationMessage = '';
    this.updateErrorMessage();
  }

  public validate(): boolean {
    if (!this.inputElement) return true;

    const value = this.inputElement.value;
    this.validationMessage = '';

    // HTML5 validation
    if (!this.inputElement.checkValidity()) {
      this.validationMessage = this.inputElement.validationMessage;
      this.setAttribute('error', '');
      this.updateErrorMessage();
      this.dispatchEvent(new CustomEvent('invalid', {
        detail: { message: this.validationMessage, value },
        bubbles: true,
        composed: true,
      }));
      return false;
    }

    // Custom validation
    if (this.customValidator) {
      const customError = this.customValidator(value);
      if (customError) {
        this.validationMessage = customError;
        this.setAttribute('error', '');
        this.updateErrorMessage();
        this.dispatchEvent(new CustomEvent('invalid', {
          detail: { message: customError, value },
          bubbles: true,
          composed: true,
        }));
        return false;
      }
    }

    // Clear error state
    this.validationMessage = '';
    this.removeAttribute('error');
    this.updateErrorMessage();
    this.dispatchEvent(new CustomEvent('valid', {
      detail: { value },
      bubbles: true,
      composed: true,
    }));
    return true;
  }

  private updateErrorMessage(): void {
    const errorMessageEl = this.shadow.querySelector('.error-message');
    if (errorMessageEl) {
      const message = this.getErrorMessage();
      errorMessageEl.textContent = message;
      errorMessageEl.setAttribute('style', `display: ${message ? 'block' : 'none'}`);
    }
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();
    const error = this.hasError();

    const sizeStyles: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem', minHeight: '32px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem', minHeight: '40px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem', minHeight: '48px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const borderColor = error ? 'var(--rell-border-error)' : 'var(--rell-border-default)';
    const borderColorFocus = error ? 'var(--rell-border-error)' : 'var(--rell-border-focus)';

    return `
      input {
        width: 100%;
        padding: ${style.padding};
        font-size: ${style.fontSize};
        min-height: ${style.minHeight};
        font-family: var(--rell-font-sans);
        color: var(--rell-text-primary);
        background-color: var(--rell-surface-base);
        border: 2px solid ${borderColor};
        border-radius: ${radius.md};
        outline: none;
        transition: all 0.2s ease;
        box-sizing: border-box;
        opacity: ${disabled ? '0.5' : '1'};
        pointer-events: ${disabled ? 'none' : 'auto'};
      }

      input::placeholder {
        color: var(--rell-text-tertiary);
      }

      input:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      input:focus {
        border-color: ${borderColorFocus};
        box-shadow: 0 0 0 3px ${borderColorFocus}40, 0 0 12px ${borderColorFocus}20;
      }

      input:disabled {
        cursor: not-allowed;
        background-color: var(--rell-surface-disabled);
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .error-message {
        margin-top: ${spacing[2]};
        font-size: 0.875rem;
        color: var(--rell-status-error);
        display: ${this.hasError() ? 'block' : 'none'};
      }
    `;
  }

  protected render(): void {
    const type = this.getType();
    const placeholder = this.getPlaceholder();
    const value = this.getValue();
    const disabled = this.isDisabled();
    const required = this.isRequired();
    const min = this.getMin();
    const max = this.getMax();
    const minLength = this.getMinLength();
    const maxLength = this.getMaxLength();
    const pattern = this.getPattern();
    const errorMessage = this.getErrorMessage();
    const validateOn = this.getValidateOn();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="input-wrapper">
        <input 
          type="${type}" 
          placeholder="${placeholder}" 
          value="${value}"
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          ${min ? `min="${min}"` : ''}
          ${max ? `max="${max}"` : ''}
          ${minLength ? `minlength="${minLength}"` : ''}
          ${maxLength ? `maxlength="${maxLength}"` : ''}
          ${pattern ? `pattern="${pattern}"` : ''}
        />
        ${errorMessage ? `<span class="error-message">${errorMessage}</span>` : ''}
      </div>
    `;

    this.inputElement = this.shadow.querySelector('input') as HTMLInputElement;

    if (this.inputElement) {
      this.inputElement.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.setAttribute('value', target.value);
        
        if (validateOn === 'input') {
          this.validate();
        }
        
        this.dispatchEvent(new CustomEvent('input', { 
          detail: { value: target.value },
          bubbles: true, 
          composed: true 
        }));
      });

      this.inputElement.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        
        if (validateOn === 'change' || validateOn === 'blur') {
          this.validate();
        }
        
        this.dispatchEvent(new CustomEvent('change', { 
          detail: { value: target.value },
          bubbles: true, 
          composed: true 
        }));
      });

      this.inputElement.addEventListener('blur', () => {
        if (validateOn === 'blur') {
          this.validate();
        }
      });

      this.inputElement.addEventListener('invalid', (e) => {
        e.preventDefault();
        this.validate();
      });
    }
    
    this.updateErrorMessage();
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (this.inputElement) {
      if (name === 'value' && this.inputElement.value !== newValue) {
        this.inputElement.value = newValue || '';
      }
      if (name === 'disabled') {
        this.inputElement.disabled = this.isDisabled();
      }
      if (name === 'required') {
        if (this.isRequired()) {
          this.inputElement.setAttribute('required', '');
        } else {
          this.inputElement.removeAttribute('required');
        }
      }
      if (name === 'min') {
        const min = this.getMin();
        if (min) {
          this.inputElement.setAttribute('min', min);
        } else {
          this.inputElement.removeAttribute('min');
        }
      }
      if (name === 'max') {
        const max = this.getMax();
        if (max) {
          this.inputElement.setAttribute('max', max);
        } else {
          this.inputElement.removeAttribute('max');
        }
      }
      if (name === 'minlength') {
        const minLength = this.getMinLength();
        if (minLength) {
          this.inputElement.setAttribute('minlength', minLength);
        } else {
          this.inputElement.removeAttribute('minlength');
        }
      }
      if (name === 'maxlength') {
        const maxLength = this.getMaxLength();
        if (maxLength) {
          this.inputElement.setAttribute('maxlength', maxLength);
        } else {
          this.inputElement.removeAttribute('maxlength');
        }
      }
      if (name === 'pattern') {
        const pattern = this.getPattern();
        if (pattern) {
          this.inputElement.setAttribute('pattern', pattern);
        } else {
          this.inputElement.removeAttribute('pattern');
        }
      }
    }
    
    if (name === 'error-message' || name === 'validate-on') {
      this.render();
    } else if (name !== 'value' && name !== 'disabled') {
      this.render();
    }
  }
}

customElements.define('rell-input', RellInput);

