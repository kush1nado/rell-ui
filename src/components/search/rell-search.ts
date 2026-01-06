import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSearch extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'placeholder', 'size', 'disabled', 'clearable', 'loading'];
  }

  private inputElement?: HTMLInputElement;

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || 'Search...';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isClearable(): boolean {
    return this.hasAttribute('clearable');
  }

  private isLoading(): boolean {
    return this.hasAttribute('loading');
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();

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

      .search-wrapper {
        position: relative;
        width: 100%;
      }

      .search-input {
        width: 100%;
        padding: ${style.padding};
        padding-left: 2.5rem;
        padding-right: ${this.isClearable() ? '2.5rem' : style.padding.split(' ')[1]};
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

      .search-input:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      .search-input:focus {
        border-color: var(--rell-border-focus);
        box-shadow: 0 0 0 3px var(--rell-border-focus)40, 0 0 12px var(--rell-border-focus)20;
      }

      .search-input:disabled {
        cursor: not-allowed;
        background-color: var(--rell-surface-disabled);
        opacity: 0.5;
      }

      .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: ${style.iconSize};
        height: ${style.iconSize};
        pointer-events: none;
        color: var(--rell-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .search-clear {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: ${style.iconSize};
        height: ${style.iconSize};
        cursor: pointer;
        color: var(--rell-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        padding: 0;
        transition: color 0.2s;
      }

      .search-clear:hover {
        color: var(--rell-text-primary);
      }

      .search-loading {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: ${style.iconSize};
        height: ${style.iconSize};
        pointer-events: none;
        color: var(--rell-interactive-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: translateY(-50%) rotate(0deg); }
        to { transform: translateY(-50%) rotate(360deg); }
      }
    `;
  }

  protected render(): void {
    const value = this.getValue();
    const placeholder = this.getPlaceholder();
    const disabled = this.isDisabled();
    const clearable = this.isClearable();
    const loading = this.isLoading();
    const showClear = clearable && value && !loading;

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="search-wrapper">
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <input 
          type="search"
          class="search-input"
          placeholder="${placeholder}"
          value="${value}"
          ${disabled ? 'disabled' : ''}
        />
        ${loading ? `
          <div class="search-loading">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          </div>
        ` : ''}
        ${showClear ? `
          <button class="search-clear" aria-label="Clear search">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ` : ''}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const input = this.shadow.querySelector('.search-input') as HTMLInputElement;
    const clearBtn = this.shadow.querySelector('.search-clear');

    this.inputElement = input;

    if (input) {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.setAttribute('value', target.value);
        this.dispatchEvent(new CustomEvent('input', {
          detail: { value: target.value },
          bubbles: true,
          composed: true,
        }));
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.dispatchEvent(new CustomEvent('search', {
            detail: { value: input.value },
            bubbles: true,
            composed: true,
          }));
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (input) {
          input.value = '';
          this.setAttribute('value', '');
          this.dispatchEvent(new CustomEvent('clear', {
            bubbles: true,
            composed: true,
          }));
          input.focus();
        }
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value' && this.inputElement) {
      this.inputElement.value = this.getValue();
    }
    this.render();
  }
}

customElements.define('rell-search', RellSearch);

