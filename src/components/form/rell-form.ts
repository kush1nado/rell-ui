import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellForm extends BaseComponent {
  static get observedAttributes() {
    return ['method', 'action', 'novalidate'];
  }

  private formElement?: HTMLFormElement;

  private getMethod(): string {
    return this.getAttribute('method') || 'get';
  }

  private getAction(): string {
    return this.getAttribute('action') || '';
  }

  private isNoValidate(): boolean {
    return this.hasAttribute('novalidate');
  }

  private getFormInputs(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-input, rell-select, rell-checkbox, rell-radio, rell-switch'));
  }

  private getNativeInputs(): HTMLInputElement[] {
    return Array.from(this.querySelectorAll('input, select, textarea'));
  }

  public validate(): boolean {
    const inputs = this.getFormInputs();
    let isValid = true;

    inputs.forEach(input => {
      if (input instanceof HTMLElement) {
        if (input.tagName === 'RELL-INPUT' && typeof (input as any).validate === 'function') {
          const inputValid = (input as any).validate();
          if (!inputValid) isValid = false;
        } else {
          const hasError = input.hasAttribute('error');
          if (hasError) isValid = false;
        }
      }
    });

    if (!isValid) {
      this.dispatchEvent(new CustomEvent('invalid', {
        detail: { message: 'Form validation failed' },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('valid', {
        bubbles: true,
        composed: true,
      }));
    }

    return isValid;
  }

  public getFormData(): FormData {
    const formData = new FormData();
    
    const nativeInputs = this.getNativeInputs();
    nativeInputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.checked) {
          formData.append(input.name || '', input.value);
        }
      } else if (input.type !== 'submit' && input.type !== 'button') {
        if (input.value) {
          formData.append(input.name || '', input.value);
        }
      }
    });

    const formInputs = this.getFormInputs();
    formInputs.forEach(input => {
      if (input.tagName === 'RELL-INPUT') {
        const value = input.getAttribute('value') || '';
        const name = input.getAttribute('name') || '';
        if (name && value) {
          formData.append(name, value);
        }
      } else if (input.tagName === 'RELL-SELECT') {
        const value = input.getAttribute('value') || '';
        const name = input.getAttribute('name') || '';
        if (name && value) {
          if (input.hasAttribute('multiple')) {
            try {
              const values = JSON.parse(value);
              values.forEach((v: string) => formData.append(name, v));
            } catch {
              formData.append(name, value);
            }
          } else {
            formData.append(name, value);
          }
        }
      } else if (input.tagName === 'RELL-CHECKBOX') {
        if (input.hasAttribute('checked')) {
          const value = input.getAttribute('value') || 'on';
          const name = input.getAttribute('name') || '';
          if (name) {
            formData.append(name, value);
          }
        }
      } else if (input.tagName === 'RELL-RADIO') {
        if (input.hasAttribute('checked')) {
          const value = input.getAttribute('value') || '';
          const name = input.getAttribute('name') || '';
          if (name && value) {
            formData.append(name, value);
          }
        }
      } else if (input.tagName === 'RELL-SWITCH') {
        if (input.hasAttribute('checked')) {
          const value = input.getAttribute('value') || 'on';
          const name = input.getAttribute('name') || '';
          if (name) {
            formData.append(name, value);
          }
        }
      }
    });

    return formData;
  }

  public getFormDataAsObject(): Record<string, any> {
    const formData = this.getFormData();
    const obj: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (obj[key]) {
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
    });

    return obj;
  }

  public reset(): void {
    const inputs = this.getFormInputs();
    inputs.forEach(input => {
      if (input.tagName === 'RELL-INPUT') {
        input.removeAttribute('value');
        (input as any).clearError?.();
      } else if (input.tagName === 'RELL-SELECT') {
        input.removeAttribute('value');
        (input as any).clearError?.();
      } else if (input.tagName === 'RELL-CHECKBOX' || input.tagName === 'RELL-RADIO' || input.tagName === 'RELL-SWITCH') {
        input.removeAttribute('checked');
        (input as any).clearError?.();
      }
    });

    if (this.formElement) {
      this.formElement.reset();
    }

    this.dispatchEvent(new CustomEvent('reset', {
      bubbles: true,
      composed: true,
    }));
  }

  public clearErrors(): void {
    const inputs = this.getFormInputs();
    inputs.forEach(input => {
      if (typeof (input as any).clearError === 'function') {
        (input as any).clearError();
      }
    });
  }

  protected getComponentStyles(): string {
    return `
      :host {
        display: block;
        width: 100%;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: ${spacing[4]};
        width: 100%;
      }

      .form-error {
        padding: ${spacing[3]};
        background-color: var(--rell-status-error);
        color: var(--rell-text-inverse);
        border-radius: var(--rell-radius-md);
        font-size: 0.875rem;
        margin-bottom: ${spacing[4]};
        display: none;
      }

      .form-error.show {
        display: block;
      }

      .form-success {
        padding: ${spacing[3]};
        background-color: var(--rell-status-success);
        color: var(--rell-text-inverse);
        border-radius: var(--rell-radius-md);
        font-size: 0.875rem;
        margin-bottom: ${spacing[4]};
        display: none;
      }

      .form-success.show {
        display: block;
      }
    `;
  }

  protected render(): void {
    const method = this.getMethod();
    const action = this.getAction();
    const novalidate = this.isNoValidate();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <form 
        method="${method}" 
        ${action ? `action="${action}"` : ''}
        ${novalidate ? 'novalidate' : ''}
      >
        <slot></slot>
      </form>
    `;

    this.formElement = this.shadow.querySelector('form') as HTMLFormElement;

    if (this.formElement) {
      this.formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isValid = this.validate();
        
        if (isValid) {
          const formData = this.getFormDataAsObject();
          this.dispatchEvent(new CustomEvent('submit', {
            detail: { 
              formData,
              formDataObject: formData,
              nativeEvent: e,
            },
            bubbles: true,
            composed: true,
          }));
        } else {
          this.dispatchEvent(new CustomEvent('submit-error', {
            detail: { message: 'Form validation failed' },
            bubbles: true,
            composed: true,
          }));
        }
      });

      this.formElement.addEventListener('reset', () => {
        this.reset();
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (this.formElement) {
      if (name === 'method') {
        this.formElement.method = this.getMethod();
      }
      if (name === 'action') {
        const action = this.getAction();
        if (action) {
          this.formElement.setAttribute('action', action);
        } else {
          this.formElement.removeAttribute('action');
        }
      }
      if (name === 'novalidate') {
        if (this.isNoValidate()) {
          this.formElement.setAttribute('novalidate', '');
        } else {
          this.formElement.removeAttribute('novalidate');
        }
      }
    }
  }
}

customElements.define('rell-form', RellForm);

