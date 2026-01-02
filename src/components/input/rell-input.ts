import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, colors } from '../../tokens';

export class RellInput extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled', 'error', 'size'];
  }

  private inputElement?: HTMLInputElement;

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
    return this.hasAttribute('error');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
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
    `;
  }

  protected render(): void {
    const type = this.getType();
    const placeholder = this.getPlaceholder();
    const value = this.getValue();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <input 
        type="${type}" 
        placeholder="${placeholder}" 
        value="${value}"
        ${disabled ? 'disabled' : ''}
      />
    `;

    this.inputElement = this.shadow.querySelector('input') as HTMLInputElement;

    if (this.inputElement) {
      this.inputElement.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.setAttribute('value', target.value);
        this.dispatchEvent(new CustomEvent('input', { 
          detail: { value: target.value },
          bubbles: true, 
          composed: true 
        }));
      });

      this.inputElement.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.dispatchEvent(new CustomEvent('change', { 
          detail: { value: target.value },
          bubbles: true, 
          composed: true 
        }));
      });
    }
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (this.inputElement) {
      if (name === 'value' && this.inputElement.value !== newValue) {
        this.inputElement.value = newValue || '';
      }
      if (name === 'disabled') {
        this.inputElement.disabled = this.isDisabled();
      }
    }
    this.render();
  }
}

customElements.define('rell-input', RellInput);

