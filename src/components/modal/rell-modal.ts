import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellModal extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'size', 'closable', 'close-on-backdrop'];
  }

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isClosable(): boolean {
    return this.hasAttribute('closable');
  }

  private closeOnBackdrop(): boolean {
    return this.hasAttribute('close-on-backdrop');
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const open = this.isOpen();

    const sizeStyles: Record<string, { width: string; maxWidth: string }> = {
      sm: { width: '90%', maxWidth: '400px' },
      md: { width: '90%', maxWidth: '600px' },
      lg: { width: '90%', maxWidth: '800px' },
      xl: { width: '90%', maxWidth: '1200px' },
      full: { width: '100%', maxWidth: '100%' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        display: ${open ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        opacity: ${open ? '1' : '0'};
        transition: opacity 0.3s ease;
        pointer-events: ${open ? 'auto' : 'none'};
      }

      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 10, 15, 0.8);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .modal-container {
        position: relative;
        z-index: 1;
        width: ${style.width};
        max-width: ${style.maxWidth};
        max-height: 90vh;
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.lg};
        box-shadow: ${shadows.xl};
        display: flex;
        flex-direction: column;
        transform: ${open ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)'};
        transition: transform 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${spacing[4]} ${spacing[6]};
        border-bottom: 1px solid var(--rell-border-default);
        gap: ${spacing[3]};
        flex-shrink: 0;
      }

      .modal-title {
        flex: 1;
        font-family: var(--rell-font-sans);
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--rell-text-primary);
      }

      .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        color: var(--rell-text-secondary);
        cursor: pointer;
        border-radius: ${radius.md};
        transition: all 0.2s ease;
        font-size: 1.5rem;
        line-height: 1;
        padding: 0;
      }

      .modal-close:hover {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
      }

      .modal-body {
        padding: ${spacing[6]};
        overflow-y: auto;
        flex: 1;
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${spacing[3]};
        padding: ${spacing[4]} ${spacing[6]};
        border-top: 1px solid var(--rell-border-default);
        flex-shrink: 0;
      }

      ::slotted([slot="header"]) {
        margin: 0;
      }

      ::slotted([slot="footer"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[3]};
      }
    `;
  }

  protected render(): void {
    const open = this.isOpen();
    const closable = this.isClosable();
    const closeOnBackdrop = this.closeOnBackdrop();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <slot name="title"></slot>
            <slot name="header"></slot>
          </div>
          ${closable ? `
          <button class="modal-close" aria-label="Close modal">&times;</button>
          ` : ''}
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    const backdrop = this.shadow.querySelector('.modal-backdrop');
    const closeButton = this.shadow.querySelector('.modal-close');
    const container = this.shadow.querySelector('.modal-container');

    if (backdrop && closeOnBackdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close();
        }
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.close();
      });
    }

    if (container) {
      container.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Close on Escape key
    if (open && closable) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      };
      document.addEventListener('keydown', handleEscape);
      this.addEventListener('close', () => {
        document.removeEventListener('keydown', handleEscape);
      }, { once: true });
    }
  }

  public open(): void {
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  public close(): void {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-modal', RellModal);

