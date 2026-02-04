import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellPopconfirm extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'position', 'title', 'description', 'confirm-text', 'cancel-text', 'variant'];
  }

  private triggerElement: HTMLElement | null = null;
  private popconfirmElement: HTMLElement | null = null;
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'top';
  }

  private getTitle(): string {
    return this.getAttribute('title') || 'Подтвердите действие';
  }

  private getDescription(): string {
    return this.getAttribute('description') || '';
  }

  private getConfirmText(): string {
    return this.getAttribute('confirm-text') || 'Подтвердить';
  }

  private getCancelText(): string {
    return this.getAttribute('cancel-text') || 'Отмена';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const open = this.isOpen();

    const variantStyles: Record<string, { bg: string; bgHover: string; color: string }> = {
      primary: {
        bg: 'var(--rell-interactive-primary)',
        bgHover: 'var(--rell-interactive-primary-hover)',
        color: 'var(--rell-text-inverse)',
      },
      danger: {
        bg: 'var(--rell-error)',
        bgHover: 'var(--rell-error-hover)',
        color: 'var(--rell-text-inverse)',
      },
    };

    const variant = variantStyles[this.getVariant()] || variantStyles.primary;

    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .popconfirm-content {
        position: absolute;
        z-index: 10000;
        min-width: 250px;
        max-width: 400px;
        padding: ${spacing[4]};
        border-radius: ${radius.md};
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        box-shadow: ${shadows.xl};
        font-family: var(--rell-font-sans);
        opacity: ${open ? '1' : '0'};
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: ${open ? 'auto' : 'none'};
        ${this.getPositionStyles(position, open)}
      }

      .popconfirm-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--rell-text-primary);
        margin: 0 0 ${spacing[2]} 0;
      }

      .popconfirm-description {
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        margin: 0 0 ${spacing[4]} 0;
        line-height: 1.5;
      }

      .popconfirm-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${spacing[2]};
      }

      .popconfirm-button {
        padding: ${spacing[2]} ${spacing[4]};
        border-radius: ${radius.sm};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .popconfirm-button-cancel {
        background-color: transparent;
        color: var(--rell-text-secondary);
        border: 1px solid var(--rell-border-default);
      }

      .popconfirm-button-cancel:hover {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
        border-color: var(--rell-border-hover);
      }

      .popconfirm-button-confirm {
        background-color: ${variant.bg};
        color: ${variant.color};
        border: 1px solid ${variant.bg};
      }

      .popconfirm-button-confirm:hover {
        background-color: ${variant.bgHover};
        border-color: ${variant.bgHover};
      }

      .popconfirm-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        ${this.getArrowStyles(position)}
      }
    `;
  }

  private getPositionStyles(position: string, open: boolean): string {
    const scale = open ? 'scale(1)' : 'scale(0.95)';
    const positions: Record<string, string> = {
      top: `
        bottom: calc(100% + ${spacing[2]});
        left: 50%;
        transform: translateX(-50%) ${scale};
      `,
      bottom: `
        top: calc(100% + ${spacing[2]});
        left: 50%;
        transform: translateX(-50%) ${scale};
      `,
      left: `
        right: calc(100% + ${spacing[2]});
        top: 50%;
        transform: translateY(-50%) ${scale};
      `,
      right: `
        left: calc(100% + ${spacing[2]});
        top: 50%;
        transform: translateY(-50%) ${scale};
      `,
    };
    return positions[position] || positions.top;
  }

  private getArrowStyles(position: string): string {
    const arrowSize = '8px';
    const positions: Record<string, string> = {
      top: `
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
        border-color: var(--rell-border-default) transparent transparent transparent;
      `,
      bottom: `
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
        border-color: transparent transparent var(--rell-border-default) transparent;
      `,
      left: `
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: ${arrowSize} 0 ${arrowSize} ${arrowSize};
        border-color: transparent transparent transparent var(--rell-border-default);
      `,
      right: `
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
        border-color: transparent var(--rell-border-default) transparent transparent;
      `,
    };
    return positions[position] || positions.top;
  }

  protected render(): void {
    const title = this.getTitle();
    const description = this.getDescription();
    const confirmText = this.getConfirmText();
    const cancelText = this.getCancelText();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot name="trigger"></slot>
      <div class="popconfirm-content">
        <div class="popconfirm-arrow"></div>
        <div class="popconfirm-title">${title}</div>
        ${description ? `<div class="popconfirm-description">${description}</div>` : ''}
        <div class="popconfirm-actions">
          <button class="popconfirm-button popconfirm-button-cancel" type="button">${cancelText}</button>
          <button class="popconfirm-button popconfirm-button-confirm" type="button">${confirmText}</button>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const triggerSlot = this.shadow.querySelector('slot[name="trigger"]') as HTMLSlotElement;
    if (triggerSlot) {
      triggerSlot.addEventListener('slotchange', () => {
        const assignedElements = triggerSlot.assignedElements();
        if (assignedElements.length > 0) {
          this.triggerElement = assignedElements[0] as HTMLElement;
          this.attachTriggerEvents();
        }
      });

      const assignedElements = triggerSlot.assignedElements();
      if (assignedElements.length > 0) {
        this.triggerElement = assignedElements[0] as HTMLElement;
        this.attachTriggerEvents();
      }
    }

    const cancelButton = this.shadow.querySelector('.popconfirm-button-cancel');
    const confirmButton = this.shadow.querySelector('.popconfirm-button-confirm');

    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        this.close();
        this.dispatchEvent(new CustomEvent('cancel', {
          bubbles: true,
          composed: true,
        }));
      });
    }

    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        this.close();
        this.dispatchEvent(new CustomEvent('confirm', {
          bubbles: true,
          composed: true,
        }));
      });
    }

    this.popconfirmElement = this.shadow.querySelector('.popconfirm-content') as HTMLElement;
    this.setupClickOutside();
  }

  private attachTriggerEvents(): void {
    if (!this.triggerElement) return;

    this.triggerElement.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
  }

  private setupClickOutside(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }

    this.clickOutsideHandler = (e: MouseEvent) => {
      if (!this.isOpen()) return;

      const target = e.target as Node;
      if (!this.shadow.contains(target) && !this.contains(target)) {
        this.close();
      }
    };

    document.addEventListener('click', this.clickOutsideHandler);
  }

  public open(): void {
    this.setAttribute('open', '');
  }

  public close(): void {
    this.removeAttribute('open');
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'open') {
      this.render();
    }
  }

  disconnectedCallback(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}

customElements.define('rell-popconfirm', RellPopconfirm);

