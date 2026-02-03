import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellDropdown extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'position', 'trigger', 'closable'];
  }

  private triggerElement: HTMLElement | null = null;
  private dropdownElement: HTMLElement | null = null;
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'bottom-start';
  }

  private getTrigger(): string {
    return this.getAttribute('trigger') || 'click';
  }

  private isClosable(): boolean {
    const closable = this.getAttribute('closable');
    return closable !== 'false';
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const open = this.isOpen();

    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .dropdown-menu {
        position: absolute;
        z-index: 10000;
        min-width: 200px;
        max-width: 400px;
        max-height: 400px;
        overflow-y: auto;
        padding: ${spacing[1]};
        border-radius: ${radius.md};
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        box-shadow: ${shadows.xl};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
        opacity: ${open ? '1' : '0'};
        transform: ${open ? 'scale(1)' : 'scale(0.95)'};
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: ${open ? 'auto' : 'none'};
        ${this.getPositionStyles(position, open)}
      }

      .dropdown-item {
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

      .dropdown-item:hover:not(.disabled) {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
      }

      .dropdown-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .dropdown-item.danger {
        color: var(--rell-status-error);
      }

      .dropdown-item.danger:hover:not(.disabled) {
        background-color: rgba(255, 59, 48, 0.1);
      }

      .dropdown-divider {
        height: 1px;
        background-color: var(--rell-border-default);
        margin: ${spacing[1]} 0;
      }

      .dropdown-header {
        padding: ${spacing[2]} ${spacing[3]};
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--rell-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      ::slotted([slot="trigger"]) {
        cursor: pointer;
      }

      ::slotted(rell-item) {
        margin: ${spacing[1]} 0;
      }

      ::slotted(rell-item:first-child) {
        margin-top: 0;
      }

      ::slotted(rell-item:last-child) {
        margin-bottom: 0;
      }
    `;
  }

  private getPositionStyles(position: string, open: boolean): string {
    const scale = open ? 'scale(1)' : 'scale(0.95)';
    const positions: Record<string, string> = {
      'top-start': `
        bottom: calc(100% + ${spacing[2]});
        left: 0;
        transform: ${scale};
      `,
      'top-end': `
        bottom: calc(100% + ${spacing[2]});
        right: 0;
        transform: ${scale};
      `,
      'top': `
        bottom: calc(100% + ${spacing[2]});
        left: 50%;
        transform: translateX(-50%) ${scale};
      `,
      'bottom-start': `
        top: calc(100% + ${spacing[2]});
        left: 0;
        transform: ${scale};
      `,
      'bottom-end': `
        top: calc(100% + ${spacing[2]});
        right: 0;
        transform: ${scale};
      `,
      'bottom': `
        top: calc(100% + ${spacing[2]});
        left: 50%;
        transform: translateX(-50%) ${scale};
      `,
      'left-start': `
        right: calc(100% + ${spacing[2]});
        top: 0;
        transform: ${scale};
      `,
      'left-end': `
        right: calc(100% + ${spacing[2]});
        bottom: 0;
        transform: ${scale};
      `,
      'left': `
        right: calc(100% + ${spacing[2]});
        top: 50%;
        transform: translateY(-50%) ${scale};
      `,
      'right-start': `
        left: calc(100% + ${spacing[2]});
        top: 0;
        transform: ${scale};
      `,
      'right-end': `
        left: calc(100% + ${spacing[2]});
        bottom: 0;
        transform: ${scale};
      `,
      'right': `
        left: calc(100% + ${spacing[2]});
        top: 50%;
        transform: translateY(-50%) ${scale};
      `,
    };

    return positions[position] || positions['bottom-start'];
  }

  protected render(): void {
    const open = this.isOpen();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot name="trigger"></slot>
      <div class="dropdown-menu">
        <slot></slot>
      </div>
    `;

    this.dropdownElement = this.shadow.querySelector('.dropdown-menu') as HTMLElement;
    this.triggerElement = this.querySelector('[slot="trigger"]') as HTMLElement || this;

    this.attachEventListeners();
    
    // Setup menu items on slot change
    const slot = this.shadow.querySelector('slot:not([name="trigger"])');
    if (slot) {
      const setupItems = () => {
        this.setupMenuItems();
      };
      slot.addEventListener('slotchange', setupItems);
      // Also setup immediately
      setTimeout(setupItems, 0);
    }
  }

  private setupMenuItems(): void {
    // Get all items from light DOM
    const items = Array.from(this.querySelectorAll('.dropdown-item, rell-item, [role="menuitem"]'));
    
    items.forEach((item) => {
      if (item.classList.contains('disabled')) return;
      
      // Check if already has listener
      if ((item as any).__dropdownListener) return;
      
      const clickHandler = (e: Event) => {
        e.stopPropagation();
        if (!item.classList.contains('disabled')) {
          this.dispatchEvent(new CustomEvent('item-click', {
            bubbles: true,
            composed: true,
            detail: { item, element: item }
          }));
          
          // Close by default unless explicitly set to false
          if (this.isClosable()) {
            this.close();
          }
        }
      };
      
      item.addEventListener('click', clickHandler);
      (item as any).__dropdownListener = clickHandler;
    });
  }

  private attachEventListeners(): void {
    if (!this.triggerElement) return;

    const trigger = this.getTrigger();

    if (trigger === 'click') {
      this.triggerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    } else if (trigger === 'hover') {
      this.triggerElement.addEventListener('mouseenter', () => this.open());
      this.triggerElement.addEventListener('mouseleave', () => this.close());
    }

    if (this.dropdownElement) {
      this.dropdownElement.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
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
    
    if (this.getTrigger() === 'click') {
      this.clickOutsideHandler = this.handleClickOutside;
      setTimeout(() => {
        document.addEventListener('click', this.clickOutsideHandler!);
      }, 0);
    }
  }

  public close(): void {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }

  disconnectedCallback(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}

customElements.define('rell-dropdown', RellDropdown);

