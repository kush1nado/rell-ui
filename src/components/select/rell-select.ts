import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, colors } from '../../tokens';

export class RellSelect extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'disabled', 'error', 'size'];
  }

  private selectElement?: HTMLSelectElement;
  private options: Array<{ value: string; label: string }> = [];

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
      select {
        width: 100%;
        padding: ${style.padding};
        padding-right: 2.5rem;
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
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        opacity: ${disabled ? '0.5' : '1'};
        pointer-events: ${disabled ? 'none' : 'auto'};
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300ffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 12px;
      }

      select:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      select:focus {
        border-color: ${borderColorFocus};
        box-shadow: 0 0 0 3px ${borderColorFocus}40, 0 0 12px ${borderColorFocus}20;
      }

      select:disabled {
        background-color: var(--rell-surface-disabled);
      }

      select option {
        background-color: var(--rell-surface-base);
        color: var(--rell-text-primary);
        padding: 0.5rem;
      }
    `;
  }

  protected render(): void {
    const value = this.getValue();
    const disabled = this.isDisabled();

    let optionsHTML = '';
    if (this.options.length > 0) {
      optionsHTML = this.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    } else {
      const options = Array.from(this.querySelectorAll('option'));
      if (options.length > 0) {
        optionsHTML = options.map(opt => {
          const val = opt.getAttribute('value') || '';
          const text = opt.textContent || '';
          const selected = opt.hasAttribute('selected') ? 'selected' : '';
          return `<option value="${val}" ${selected}>${text}</option>`;
        }).join('');
      } else {
        optionsHTML = '<option value="">Select an option...</option>';
      }
    }

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <select ${disabled ? 'disabled' : ''}>
        ${optionsHTML}
      </select>
    `;

    this.selectElement = this.shadow.querySelector('select') as HTMLSelectElement;

    if (this.selectElement) {
      if (value) {
        this.selectElement.value = value;
      }

      this.selectElement.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.setAttribute('value', target.value);
        this.dispatchEvent(new CustomEvent('change', { 
          detail: { value: target.value },
          bubbles: true, 
          composed: true 
        }));
      });
    }
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (this.selectElement && name === 'value' && this.selectElement.value !== newValue) {
      this.selectElement.value = newValue || '';
    }
    this.render();
  }

  public setOptions(options: Array<{ value: string; label: string }>): void {
    this.options = options;
    this.render();
  }
}

customElements.define('rell-select', RellSelect);

