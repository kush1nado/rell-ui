import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

export class RellSelect extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'multiple', 'disabled', 'error', 'error-message', 'size', 'placeholder'];
  }

  private isMultiple(): boolean {
    return this.hasAttribute('multiple');
  }

  private getValue(): string | string[] {
    const value = this.getAttribute('value');
    if (!value) return this.isMultiple() ? [] : '';
    
    if (this.isMultiple()) {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').filter(Boolean);
      }
    }
    return value;
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private hasError(): boolean {
    return this.hasAttribute('error');
  }

  private getErrorMessage(): string {
    return this.getAttribute('error-message') || '';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  public setError(message?: string): void {
    this.setAttribute('error', '');
    if (message) {
      this.setAttribute('error-message', message);
    }
  }

  public clearError(): void {
    this.removeAttribute('error');
    this.removeAttribute('error-message');
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || 'Select an option...';
  }

  private options: SelectOption[] = [];
  private isOpen: boolean = false;
  private selectedValues: string[] = [];

  private getOptions(): SelectOption[] {
    if (this.options.length > 0) {
      return this.options;
    }

    const optionElements = Array.from(this.querySelectorAll('option'));
    return optionElements.map(opt => ({
      value: opt.getAttribute('value') || '',
      label: opt.textContent || '',
      selected: opt.hasAttribute('selected'),
    }));
  }

  private updateSelectedValues(): void {
    const value = this.getValue();
    this.selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  }

  private toggleOption(value: string): void {
    if (this.isMultiple()) {
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      } else {
        this.selectedValues.push(value);
      }
    } else {
      this.selectedValues = [value];
      this.isOpen = false;
    }
    this.updateValue();
    this.render();
  }

  private removeOption(value: string, e: Event): void {
    e.stopPropagation();
    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
      this.updateValue();
      this.render();
    }
  }

  private updateValue(): void {
    const value = this.isMultiple() 
      ? JSON.stringify(this.selectedValues)
      : this.selectedValues[0] || '';
    this.setAttribute('value', value);
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.isMultiple() ? this.selectedValues : this.selectedValues[0] },
      bubbles: true,
      composed: true,
    }));
  }

  private getOptionLabel(value: string): string {
    const options = this.getOptions();
    const option = options.find(opt => opt.value === value);
    return option?.label || value;
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();
    const error = this.hasError();
    const multiple = this.isMultiple();

    const sizeStyles: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem', minHeight: '32px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem', minHeight: '40px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem', minHeight: '48px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const borderColor = error ? 'var(--rell-border-error)' : 'var(--rell-border-default)';
    const borderColorFocus = error ? 'var(--rell-border-error)' : 'var(--rell-border-focus)';

    return `
      .select-wrapper {
        position: relative;
        width: 100%;
      }

      .select-trigger {
        width: 100%;
        min-height: ${style.minHeight};
        padding: ${style.padding};
        padding-right: 2.5rem;
        font-size: ${style.fontSize};
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
        display: flex;
        align-items: center;
        flex-wrap: ${multiple ? 'wrap' : 'nowrap'};
        gap: ${spacing[2]};
      }

      .select-trigger:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      .select-trigger:focus,
      .select-trigger.open {
        border-color: ${borderColorFocus};
        box-shadow: 0 0 0 3px ${borderColorFocus}40, 0 0 12px ${borderColorFocus}20;
      }

      .select-trigger:disabled {
        background-color: var(--rell-surface-disabled);
      }

      .select-value {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${spacing[2]};
        min-height: 1.5em;
      }

      .select-placeholder {
        color: var(--rell-text-tertiary);
      }

      .select-chip {
        display: inline-flex;
        align-items: center;
        gap: ${spacing[1]};
        padding: ${spacing[1]} ${spacing[2]};
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        border-radius: ${radius.sm};
        font-size: 0.875em;
        line-height: 1;
      }

      .select-chip-remove {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        transition: background-color 0.2s;
      }

      .select-chip-remove:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }

      .select-arrow {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        pointer-events: none;
        transition: transform 0.2s;
      }

      .select-trigger.open .select-arrow {
        transform: translateY(-50%) rotate(180deg);
      }

      .select-dropdown {
        position: absolute;
        top: calc(100% + ${spacing[1]});
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: var(--rell-surface-base);
        border: 2px solid ${borderColorFocus};
        border-radius: ${radius.md};
        box-shadow: var(--rell-shadow-lg);
        max-height: 300px;
        overflow-y: auto;
        display: none;
      }

      .select-dropdown.open {
        display: block;
      }

      .select-option {
        padding: ${spacing[3]} ${spacing[4]};
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .select-option:hover {
        background-color: var(--rell-surface-hover);
      }

      .select-option.selected {
        background-color: var(--rell-surface-active);
        color: var(--rell-interactive-primary);
      }

      .select-option-checkbox {
        width: 16px;
        height: 16px;
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .select-option.selected .select-option-checkbox {
        background-color: var(--rell-interactive-primary);
        border-color: var(--rell-interactive-primary);
      }

      .select-option.selected .select-option-checkbox::after {
        content: '✓';
        color: var(--rell-text-inverse);
        font-size: 12px;
        line-height: 1;
      }

      .select-error-message {
        margin-top: ${spacing[2]};
        font-size: 0.875rem;
        color: var(--rell-status-error);
        display: ${this.hasError() ? 'block' : 'none'};
      }
    `;
  }

  protected render(): void {
    this.updateSelectedValues();
    const options = this.getOptions();
    const disabled = this.isDisabled();
    const multiple = this.isMultiple();
    const placeholder = this.getPlaceholder();
    const errorMessage = this.getErrorMessage();

    const hasSelection = this.selectedValues.length > 0;
    const displayValue = hasSelection
      ? (multiple
          ? this.selectedValues.map(v => {
              const label = this.getOptionLabel(v);
              return `
                <span class="select-chip">
                  <span>${label}</span>
                  <span class="select-chip-remove" data-value="${v}">×</span>
                </span>
              `;
            }).join('')
          : this.getOptionLabel(this.selectedValues[0]))
      : `<span class="select-placeholder">${placeholder}</span>`;

    const optionsHTML = options.map(opt => {
      const isSelected = this.selectedValues.includes(opt.value);
      return `
        <div class="select-option ${isSelected ? 'selected' : ''}" data-value="${opt.value}">
          ${multiple ? '<span class="select-option-checkbox"></span>' : ''}
          <span>${opt.label}</span>
        </div>
      `;
    }).join('');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="select-wrapper">
        <div class="select-trigger ${this.isOpen ? 'open' : ''}" ${disabled ? '' : 'tabindex="0"'}>
          <div class="select-value">${displayValue}</div>
          <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <path fill="var(--rell-interactive-primary)" d="M6 9L1 4h10z"/>
          </svg>
        </div>
        <div class="select-dropdown ${this.isOpen ? 'open' : ''}">
          ${optionsHTML}
        </div>
        ${errorMessage ? `<span class="select-error-message">${errorMessage}</span>` : ''}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const trigger = this.shadow.querySelector('.select-trigger');
    const dropdown = this.shadow.querySelector('.select-dropdown');
    const options = this.shadow.querySelectorAll('.select-option');
    const removeButtons = this.shadow.querySelectorAll('.select-chip-remove');

    if (trigger && !this.isDisabled()) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        this.render();
      });

      trigger.addEventListener('keydown', (e) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          keyEvent.preventDefault();
          this.isOpen = !this.isOpen;
          this.render();
        }
        if (keyEvent.key === 'Escape') {
          this.isOpen = false;
          this.render();
        }
      });
    }

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        if (value) {
          this.toggleOption(value);
        }
      });
    });

    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = btn.getAttribute('data-value');
        if (value) {
          this.removeOption(value, e);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.shadow.contains(e.target as Node)) {
        this.isOpen = false;
        this.render();
      }
    });
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      this.updateSelectedValues();
    }
    this.render();
  }

  public setOptions(options: Array<{ value: string; label: string }>): void {
    this.options = options;
    this.render();
  }
}

customElements.define('rell-select', RellSelect);
