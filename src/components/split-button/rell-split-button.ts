import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellSplitButton extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'open'];
  }

  private dropdownElement: HTMLElement | null = null;
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();
    const disabled = this.isDisabled();
    const open = this.isOpen();

    const sizeStyles: Record<string, { padding: string; fontSize: string; height: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem', height: '32px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem', height: '40px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem', height: '48px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: inline-flex;
        position: relative;
      }

      .split-button-group {
        display: flex;
        align-items: stretch;
      }

      .split-button-main {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }

      .split-button-divider {
        width: 1px;
        background-color: ${disabled ? 'var(--rell-border-default)' : 'rgba(255, 255, 255, 0.2)'};
        flex-shrink: 0;
      }

      .split-button-dropdown {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-left: ${spacing[2]};
        padding-right: ${spacing[2]};
        min-width: ${style.height};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .split-button-menu {
        position: absolute;
        top: calc(100% + ${spacing[2]});
        left: 0;
        z-index: 10000;
        min-width: 200px;
        max-width: 400px;
        max-height: 400px;
        overflow-y: auto;
        padding: ${spacing[1]};
        border-radius: ${radius.md};
        background-color: var(--rell-surface-elevated);
        border: 2px solid var(--rell-border-default);
        box-shadow: ${shadows.xl};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
        opacity: ${open ? '1' : '0'};
        transform: ${open ? 'scale(1)' : 'scale(0.95)'};
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: ${open ? 'auto' : 'none'};
      }

      ::slotted(rell-button) {
        margin: 0;
      }

      ::slotted(.split-button-item) {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        padding: ${spacing[2]} ${spacing[3]};
        border-radius: ${radius.sm};
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--rell-text-primary);
        text-decoration: none;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
      }

      ::slotted(.split-button-item:hover:not(.disabled)) {
        background-color: var(--rell-surface-hover);
      }

      ::slotted(.split-button-item.disabled) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      ::slotted(.split-button-item.danger) {
        color: var(--rell-status-error);
      }

      ::slotted(.split-button-item.danger:hover:not(.disabled)) {
        background-color: rgba(255, 59, 48, 0.1);
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="split-button-group">
        <slot name="button"></slot>
        <div class="split-button-divider"></div>
        <rell-button 
          class="split-button-dropdown"
          variant="${this.getVariant()}"
          size="${this.getSize()}"
          ${this.isDisabled() ? 'disabled' : ''}>
          ▼
        </rell-button>
      </div>
      <div class="split-button-menu">
        <slot name="menu"></slot>
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const dropdownButton = this.shadow.querySelector('.split-button-dropdown') as HTMLElement;
    this.dropdownElement = this.shadow.querySelector('.split-button-menu') as HTMLElement;

    if (dropdownButton) {
      dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    this.setupMenuItems();

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  private setupMenuItems(): void {
    const items = Array.from(this.querySelectorAll('.split-button-item, rell-item, [role="menuitem"]'));
    
    items.forEach((item) => {
      if (item.classList.contains('disabled')) return;
      
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!item.classList.contains('disabled')) {
          this.dispatchEvent(new CustomEvent('item-click', {
            bubbles: true,
            composed: true,
            detail: { item, element: item }
          }));
          
          this.close();
        }
      });
    });
  }

  private handleClickOutside = (e: MouseEvent): void => {
    if (!this.isOpen()) return;

    const target = e.target as Node;
    if (!this.contains(target) && !this.shadow.contains(target)) {
      this.close();
    }
  };

  public open(): void {
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
    
    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside);
    }, 0);
  }

  public close(): void {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    
    document.removeEventListener('click', this.handleClickOutside);
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'open') {
      // Menu visibility is handled by CSS
    } else if (name === 'variant' || name === 'size' || name === 'disabled') {
      this.render();
    }
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }
}

customElements.define('rell-split-button', RellSplitButton);

