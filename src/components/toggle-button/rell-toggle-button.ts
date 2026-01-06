import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellToggleButton extends BaseComponent {
  static get observedAttributes() {
    return ['checked', 'disabled', 'size', 'variant', 'value'];
  }

  private buttonElement?: HTMLButtonElement;

  private isChecked(): boolean {
    return this.hasAttribute('checked');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const variant = this.getVariant();
    const checked = this.isChecked();

    const sizeStyles: Record<string, { padding: string; fontSize: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    const variantStyles: Record<string, { bg: string; color: string; border: string; hover: string }> = {
      primary: {
        bg: checked ? 'var(--rell-interactive-primary)' : 'var(--rell-surface-base)',
        color: checked ? 'var(--rell-text-inverse)' : 'var(--rell-text-primary)',
        border: checked ? 'var(--rell-interactive-primary)' : 'var(--rell-border-default)',
        hover: 'var(--rell-surface-hover)',
      },
      secondary: {
        bg: checked ? 'var(--rell-interactive-secondary)' : 'var(--rell-surface-base)',
        color: checked ? 'var(--rell-text-inverse)' : 'var(--rell-text-primary)',
        border: checked ? 'var(--rell-interactive-secondary)' : 'var(--rell-border-default)',
        hover: 'var(--rell-surface-hover)',
      },
      outline: {
        bg: checked ? 'var(--rell-interactive-primary)' : 'transparent',
        color: checked ? 'var(--rell-text-inverse)' : 'var(--rell-interactive-primary)',
        border: 'var(--rell-interactive-primary)',
        hover: checked ? 'var(--rell-interactive-primary)' : 'var(--rell-surface-hover)',
      },
    };

    const colors = variantStyles[variant] || variantStyles.primary;

    return `
      :host {
        display: inline-block;
      }

      .toggle-button {
        padding: ${style.padding};
        font-size: ${style.fontSize};
        font-family: var(--rell-font-sans);
        font-weight: 500;
        color: ${colors.color};
        background-color: ${colors.bg};
        border: 2px solid ${colors.border};
        border-radius: ${radius.md};
        cursor: ${this.isDisabled() ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        outline: none;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${spacing[2]};
        min-width: 40px;
      }

      .toggle-button:hover:not(:disabled) {
        background-color: ${colors.hover};
        ${!checked ? `border-color: var(--rell-border-hover);` : ''}
      }

      .toggle-button:focus {
        box-shadow: 0 0 0 3px ${colors.border}40, 0 0 12px ${colors.border}20;
      }

      .toggle-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .toggle-button:active:not(:disabled) {
        transform: scale(0.98);
      }
    `;
  }

  protected render(): void {
    const checked = this.isChecked();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <button class="toggle-button" ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const button = this.shadow.querySelector('.toggle-button') as HTMLButtonElement;
    this.buttonElement = button;

    if (button && !this.isDisabled()) {
      button.addEventListener('click', () => {
        if (this.isChecked()) {
          this.removeAttribute('checked');
        } else {
          this.setAttribute('checked', '');
        }

        this.dispatchEvent(new CustomEvent('change', {
          detail: { 
            checked: !this.isChecked(),
            value: this.getValue(),
          },
          bubbles: true,
          composed: true,
        }));

        this.render();
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'checked' || name === 'disabled') {
      this.render();
    }
  }
}

customElements.define('rell-toggle-button', RellToggleButton);

