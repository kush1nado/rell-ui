import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellDrawer extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'position', 'width', 'overlay'];
  }

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'left';
  }

  private getWidth(): string {
    return this.getAttribute('width') || '320px';
  }

  private hasOverlay(): boolean {
    return this.hasAttribute('overlay');
  }

  private close(): void {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true,
    }));
  }

  public open(): void {
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('open', {
      bubbles: true,
      composed: true,
    }));
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const width = this.getWidth();
    const open = this.isOpen();
    const overlay = this.hasOverlay();

    const positionStyles: Record<string, { transform: string; top: string; bottom: string; left: string; right: string }> = {
      left: {
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        top: '0',
        bottom: '0',
        left: '0',
        right: 'auto',
      },
      right: {
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        top: '0',
        bottom: '0',
        left: 'auto',
        right: '0',
      },
      top: {
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        top: '0',
        bottom: 'auto',
        left: '0',
        right: '0',
      },
      bottom: {
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        top: 'auto',
        bottom: '0',
        left: '0',
        right: '0',
      },
    };

    const style = positionStyles[position] || positionStyles.left;
    const isVertical = position === 'top' || position === 'bottom';

    return `
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        pointer-events: ${open ? 'auto' : 'none'};
      }

      .drawer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: ${open ? '1' : '0'};
        transition: opacity 0.3s ease;
        ${!overlay ? 'display: none;' : ''}
      }

      .drawer-content {
        position: absolute;
        ${style.top !== 'auto' ? `top: ${style.top};` : ''}
        ${style.bottom !== 'auto' ? `bottom: ${style.bottom};` : ''}
        ${style.left !== 'auto' ? `left: ${style.left};` : ''}
        ${style.right !== 'auto' ? `right: ${style.right};` : ''}
        ${isVertical ? `width: 100%; height: ${width};` : `width: ${width}; height: 100%;`}
        background-color: var(--rell-surface-base);
        box-shadow: ${shadows.lg};
        transform: ${style.transform};
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        z-index: 1;
      }

      .drawer-header {
        padding: ${spacing[4]} ${spacing[6]};
        border-bottom: 1px solid var(--rell-border-default);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }

      .drawer-body {
        flex: 1;
        padding: ${spacing[4]} ${spacing[6]};
        overflow-y: auto;
      }

      .drawer-footer {
        padding: ${spacing[4]} ${spacing[6]};
        border-top: 1px solid var(--rell-border-default);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: ${spacing[3]};
        flex-shrink: 0;
      }
      
      ::slotted([slot="footer"]) {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${spacing[3]};
      }

      .drawer-close {
        background: none;
        border: none;
        color: var(--rell-text-primary);
        cursor: pointer;
        padding: ${spacing[2]};
        border-radius: ${radius.sm};
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: 1.5rem;
        line-height: 1;
      }

      .drawer-close:hover {
        background-color: var(--rell-surface-hover);
      }
    `;
  }

  protected render(): void {
    const open = this.isOpen();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="drawer-overlay" data-action="close"></div>
      <div class="drawer-content">
        <div class="drawer-header">
          <slot name="header"></slot>
          <button class="drawer-close" data-action="close" aria-label="Close">×</button>
        </div>
        <div class="drawer-body">
          <slot></slot>
        </div>
        <div class="drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const overlay = this.shadow.querySelector('.drawer-overlay');
    const closeBtn = this.shadow.querySelector('.drawer-close');

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (this.hasOverlay()) {
          this.close();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.close();
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'open') {
      this.render();
    }
  }
}

customElements.define('rell-drawer', RellDrawer);

