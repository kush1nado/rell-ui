import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellAutocomplete extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'placeholder', 'size', 'disabled', 'loading', 'min-length'];
  }

  private inputElement?: HTMLInputElement;
  private isOpen: boolean = false;
  private filteredOptions: Array<{ value: string; label: string }> = [];
  private selectedIndex: number = -1;

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || 'Type to search...';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isLoading(): boolean {
    return this.hasAttribute('loading');
  }

  private getMinLength(): number {
    const minLength = this.getAttribute('min-length');
    return minLength ? parseInt(minLength) : 0;
  }

  private getOptions(): Array<{ value: string; label: string }> {
    const options: Array<{ value: string; label: string }> = [];
    const optionElements = this.querySelectorAll('option');
    
    optionElements.forEach(opt => {
      options.push({
        value: opt.value || opt.textContent || '',
        label: opt.textContent || opt.value || '',
      });
    });

    return options;
  }

  private filterOptions(query: string): Array<{ value: string; label: string }> {
    const options = this.getOptions();
    if (!query || query.length < this.getMinLength()) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(lowerQuery) ||
      opt.value.toLowerCase().includes(lowerQuery)
    );
  }

  protected getComponentStyles(): string {
    const size = this.getSize();

    const sizeStyles: Record<string, { padding: string; fontSize: string; iconSize: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem', iconSize: '16px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem', iconSize: '20px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem', iconSize: '24px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .autocomplete-wrapper {
        position: relative;
        width: 100%;
      }

      .autocomplete-input {
        width: 100%;
        padding: ${style.padding};
        padding-right: 2.5rem;
        font-size: ${style.fontSize};
        font-family: var(--rell-font-sans);
        color: var(--rell-text-primary);
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.md};
        outline: none;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }

      .autocomplete-input:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      .autocomplete-input:focus {
        border-color: var(--rell-border-focus);
        box-shadow: 0 0 0 3px var(--rell-border-focus)40, 0 0 12px var(--rell-border-focus)20;
      }

      .autocomplete-input:disabled {
        cursor: not-allowed;
        background-color: var(--rell-surface-disabled);
        opacity: 0.5;
      }

      .autocomplete-arrow {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: ${style.iconSize};
        height: ${style.iconSize};
        pointer-events: none;
        color: var(--rell-text-secondary);
        transition: transform 0.2s;
      }

      .autocomplete-arrow.open {
        transform: translateY(-50%) rotate(180deg);
      }

      .autocomplete-dropdown {
        position: absolute;
        top: calc(100% + ${spacing[1]});
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-focus);
        border-radius: ${radius.md};
        box-shadow: var(--rell-shadow-lg);
        max-height: 300px;
        overflow-y: auto;
        display: ${this.isOpen ? 'block' : 'none'};
      }

      .autocomplete-option {
        padding: ${spacing[3]} ${spacing[4]};
        cursor: pointer;
        transition: background-color 0.2s;
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
        color: var(--rell-text-primary);
      }

      .autocomplete-option:hover,
      .autocomplete-option.highlighted {
        background-color: var(--rell-surface-hover);
      }

      .autocomplete-option.selected {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
      }

      .autocomplete-empty {
        padding: ${spacing[4]};
        text-align: center;
        color: var(--rell-text-tertiary);
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
      }

      .autocomplete-loading {
        padding: ${spacing[4]};
        text-align: center;
        color: var(--rell-text-secondary);
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
      }
    `;
  }

  protected render(): void {
    const value = this.getValue();
    const placeholder = this.getPlaceholder();
    const disabled = this.isDisabled();
    const loading = this.isLoading();

    const optionsHTML = this.filteredOptions.map((opt, index) => {
      const isHighlighted = index === this.selectedIndex;
      const isSelected = opt.value === value;
      return `
        <div 
          class="autocomplete-option ${isHighlighted ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}"
          data-value="${opt.value}"
          data-index="${index}"
        >
          ${opt.label}
        </div>
      `;
    }).join('');

    const emptyMessage = this.filteredOptions.length === 0 && value.length >= this.getMinLength()
      ? '<div class="autocomplete-empty">No results found</div>'
      : '';

    const loadingMessage = loading
      ? '<div class="autocomplete-loading">Loading...</div>'
      : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="autocomplete-wrapper">
        <input 
          type="text"
          class="autocomplete-input"
          placeholder="${placeholder}"
          value="${value}"
          ${disabled ? 'disabled' : ''}
          autocomplete="off"
        />
        <svg class="autocomplete-arrow ${this.isOpen ? 'open' : ''}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <div class="autocomplete-dropdown">
          ${loading ? loadingMessage : (optionsHTML || emptyMessage)}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const input = this.shadow.querySelector('.autocomplete-input') as HTMLInputElement;
    const dropdown = this.shadow.querySelector('.autocomplete-dropdown');
    const options = this.shadow.querySelectorAll('.autocomplete-option');

    this.inputElement = input;

    if (input) {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const query = target.value;
        this.filteredOptions = this.filterOptions(query);
        this.selectedIndex = -1;
        this.isOpen = this.filteredOptions.length > 0 || query.length >= this.getMinLength();
        this.render();
      });

      input.addEventListener('focus', () => {
        if (!this.isDisabled()) {
          const query = input.value;
          this.filteredOptions = this.filterOptions(query);
          this.isOpen = this.filteredOptions.length > 0 || query.length >= this.getMinLength();
          this.render();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.selectedIndex < this.filteredOptions.length - 1) {
            this.selectedIndex++;
            this.render();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
            this.render();
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (this.selectedIndex >= 0 && this.filteredOptions[this.selectedIndex]) {
            this.selectOption(this.filteredOptions[this.selectedIndex]);
          }
        } else if (e.key === 'Escape') {
          this.isOpen = false;
          this.render();
        }
      });
    }

    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const opt = this.filteredOptions.find(o => o.value === value);
        if (opt) {
          this.selectOption(opt);
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

  private selectOption(option: { value: string; label: string }): void {
    if (this.inputElement) {
      this.inputElement.value = option.label;
      this.setAttribute('value', option.value);
      this.isOpen = false;
      this.selectedIndex = -1;
      this.render();

      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: option.value, label: option.label },
        bubbles: true,
        composed: true,
      }));
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value' && this.inputElement) {
      const options = this.getOptions();
      const selected = options.find(opt => opt.value === this.getValue());
      if (selected) {
        this.inputElement.value = selected.label;
      }
    }
    this.render();
  }
}

customElements.define('rell-autocomplete', RellAutocomplete);

