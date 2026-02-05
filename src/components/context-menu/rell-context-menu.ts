import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellContextMenu extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'position'];
  }

  private menuElement: HTMLElement | null = null;
  private targetElement: HTMLElement | null = null;
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  protected getComponentStyles(): string {
    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .context-menu {
        position: fixed;
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
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.15s ease, transform 0.15s ease;
        pointer-events: none;
      }

      .context-menu.open {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }

      .context-menu-item {
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

      .context-menu-item:hover:not(.disabled) {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
      }

      .context-menu-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .context-menu-item.danger {
        color: var(--rell-status-error);
      }

      .context-menu-item.danger:hover:not(.disabled) {
        background-color: rgba(255, 59, 48, 0.1);
      }

      .context-menu-divider {
        height: 1px;
        background-color: var(--rell-border-default);
        margin: ${spacing[1]} 0;
      }

      .context-menu-header {
        padding: ${spacing[2]} ${spacing[3]};
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--rell-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
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

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
      <div class="context-menu">
        <slot name="menu"></slot>
      </div>
    `;

    this.menuElement = this.shadow.querySelector('.context-menu') as HTMLElement;
    this.targetElement = this;

    this.setupContextMenu();
  }

  private setupContextMenu(): void {
    if (!this.targetElement || !this.menuElement) return;

    this.targetElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.show(e.clientX, e.clientY);
    });

    this.setupMenuItems();
  }

  private setupMenuItems(): void {
    const items = Array.from(this.querySelectorAll('.context-menu-item, rell-item, [role="menuitem"]'));
    
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

  public show(x: number, y: number): void {
    if (!this.menuElement) return;

    this.setAttribute('open', '');
    this.menuElement.classList.add('open');

    // Position menu
    const rect = this.menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x;
    let top = y;

    // Adjust if menu goes off screen
    const spacingValue = parseFloat(spacing[2]);
    if (left + rect.width > viewportWidth) {
      left = viewportWidth - rect.width - spacingValue;
    }
    if (top + rect.height > viewportHeight) {
      top = viewportHeight - rect.height - spacingValue;
    }
    if (left < 0) left = spacingValue;
    if (top < 0) top = spacingValue;

    this.menuElement.style.left = `${left}px`;
    this.menuElement.style.top = `${top}px`;

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
    
    this.clickOutsideHandler = this.handleClickOutside;
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideHandler!);
    }, 0);
  }

  public close(): void {
    if (!this.menuElement) return;

    this.removeAttribute('open');
    this.menuElement.classList.remove('open');

    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'open') {
      if (this.isOpen()) {
        this.menuElement?.classList.add('open');
      } else {
        this.menuElement?.classList.remove('open');
      }
    }
  }

  disconnectedCallback(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}

customElements.define('rell-context-menu', RellContextMenu);

