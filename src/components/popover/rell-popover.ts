import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellPopover extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'position', 'trigger', 'closable', 'arrow'];
  }

  private triggerElement: HTMLElement | null = null;
  private popoverElement: HTMLElement | null = null;
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'bottom';
  }

  private getTrigger(): string {
    return this.getAttribute('trigger') || 'click';
  }

  private isClosable(): boolean {
    return this.hasAttribute('closable');
  }

  private hasArrow(): boolean {
    const arrow = this.getAttribute('arrow');
    return arrow !== 'false';
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const open = this.isOpen();

    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .popover-content {
        position: absolute;
        z-index: 10000;
        min-width: 200px;
        max-width: 400px;
        padding: ${spacing[4]};
        border-radius: ${radius.md};
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        box-shadow: ${shadows.xl};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
        opacity: ${open ? '1' : '0'};
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: ${open ? 'auto' : 'none'};
        ${this.getPositionStyles(position, open)}
      }

      .popover-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${spacing[3]};
        padding-bottom: ${spacing[3]};
        border-bottom: 1px solid var(--rell-border-default);
      }

      .popover-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--rell-text-primary);
        margin: 0;
      }

      .popover-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        background: transparent;
        color: var(--rell-text-secondary);
        cursor: pointer;
        border-radius: ${radius.sm};
        transition: all 0.2s ease;
        font-size: 1.25rem;
        line-height: 1;
        padding: 0;
        margin-left: ${spacing[2]};
      }

      .popover-close:hover {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
      }

      .popover-body {
        color: var(--rell-text-secondary);
        line-height: 1.5;
      }

      .popover-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${spacing[2]};
        margin-top: ${spacing[3]};
        padding-top: ${spacing[3]};
        border-top: 1px solid var(--rell-border-default);
      }

      .popover-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        ${this.getArrowStyles(position)}
      }

      ::slotted([slot="header"]) {
        margin: 0;
      }

      ::slotted([slot="footer"]) {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
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
    };

    return positions[position] || positions.bottom;
  }

  private getArrowStyles(position: string): string {
    if (!this.hasArrow()) {
      return 'display: none;';
    }

    const arrowSize = '8px';
    const arrowColor = 'var(--rell-border-default)';
    const arrowBg = 'var(--rell-surface-base)';

    const arrows: Record<string, string> = {
      top: `
        bottom: -${arrowSize};
        left: 50%;
        transform: translateX(-50%);
        border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
        border-color: ${arrowColor} transparent transparent transparent;
      `,
      bottom: `
        top: -${arrowSize};
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
        border-color: transparent transparent ${arrowColor} transparent;
      `,
      left: `
        right: -${arrowSize};
        top: 50%;
        transform: translateY(-50%);
        border-width: ${arrowSize} 0 ${arrowSize} ${arrowSize};
        border-color: transparent transparent transparent ${arrowColor};
      `,
      right: `
        left: -${arrowSize};
        top: 50%;
        transform: translateY(-50%);
        border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
        border-color: transparent ${arrowColor} transparent transparent;
      `,
      'top-start': `
        bottom: -${arrowSize};
        left: ${spacing[4]};
        border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
        border-color: ${arrowColor} transparent transparent transparent;
      `,
      'top-end': `
        bottom: -${arrowSize};
        right: ${spacing[4]};
        border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
        border-color: ${arrowColor} transparent transparent transparent;
      `,
      'bottom-start': `
        top: -${arrowSize};
        left: ${spacing[4]};
        border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
        border-color: transparent transparent ${arrowColor} transparent;
      `,
      'bottom-end': `
        top: -${arrowSize};
        right: ${spacing[4]};
        border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
        border-color: transparent transparent ${arrowColor} transparent;
      `,
    };

    return arrows[position] || arrows.bottom;
  }

  protected render(): void {
    const open = this.isOpen();
    const closable = this.isClosable();
    const hasHeader = this.querySelector('[slot="header"]') || this.querySelector('[slot="title"]');
    const hasFooter = this.querySelector('[slot="footer"]');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot name="trigger"></slot>
      <div class="popover-content">
        ${hasHeader ? `
        <div class="popover-header">
          <div class="popover-title">
            <slot name="title"></slot>
            <slot name="header"></slot>
          </div>
          ${closable ? `<button class="popover-close" aria-label="Close">&times;</button>` : ''}
        </div>
        ` : ''}
        <div class="popover-body">
          <slot></slot>
        </div>
        ${hasFooter ? `
        <div class="popover-footer">
          <slot name="footer"></slot>
        </div>
        ` : ''}
        ${this.hasArrow() ? '<div class="popover-arrow"></div>' : ''}
      </div>
    `;

    this.popoverElement = this.shadow.querySelector('.popover-content') as HTMLElement;
    this.triggerElement = this.querySelector('[slot="trigger"]') as HTMLElement || this;

    if (closable) {
      const closeButton = this.shadow.querySelector('.popover-close');
      if (closeButton) {
        closeButton.addEventListener('click', () => this.close());
      }
    }

    this.attachEventListeners();
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

    if (this.popoverElement) {
      this.popoverElement.addEventListener('click', (e) => {
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

customElements.define('rell-popover', RellPopover);

