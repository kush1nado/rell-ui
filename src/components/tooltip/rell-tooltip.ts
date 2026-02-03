import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellTooltip extends BaseComponent {
  static get observedAttributes() {
    return ['position', 'variant', 'delay', 'disabled'];
  }

  private triggerElement: HTMLElement | null = null;
  private tooltipElement: HTMLElement | null = null;
  private showTimeout: number | null = null;
  private hideTimeout: number | null = null;

  private getPosition(): string {
    return this.getAttribute('position') || 'top';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getDelay(): number {
    const delay = this.getAttribute('delay');
    return delay ? parseInt(delay, 10) : 200;
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const variant = this.getVariant();

    const variantStyles: Record<string, { bg: string; text: string; border?: string }> = {
      default: {
        bg: 'var(--rell-surface-elevated)',
        text: 'var(--rell-text-primary)',
        border: 'var(--rell-border-default)',
      },
      primary: {
        bg: 'var(--rell-accent-cyan)',
        text: 'var(--rell-text-inverse)',
      },
      success: {
        bg: 'var(--rell-status-success)',
        text: 'var(--rell-text-inverse)',
      },
      warning: {
        bg: 'var(--rell-status-warning)',
        text: 'var(--rell-text-inverse)',
      },
      error: {
        bg: 'var(--rell-status-error)',
        text: 'var(--rell-text-inverse)',
      },
      info: {
        bg: 'var(--rell-status-info)',
        text: 'var(--rell-text-inverse)',
      },
    };

    const variantStyle = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .tooltip-content {
        position: absolute;
        z-index: 10000;
        padding: ${spacing[2]} ${spacing[3]};
        border-radius: ${radius.sm};
        background-color: ${variantStyle.bg};
        color: ${variantStyle.text};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        line-height: 1.4;
        box-shadow: ${shadows.lg};
        pointer-events: none;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.2s ease, transform 0.2s ease;
        max-width: 300px;
        white-space: normal;
        word-wrap: break-word;
        ${variantStyle.border ? `border: 1px solid ${variantStyle.border};` : ''}
      }

      .tooltip-content.show {
        opacity: 1;
        transform: scale(1);
      }

      .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
      }

      ${this.getPositionStyles(position, variantStyle)}
    `;
  }

  private getPositionStyles(position: string, variantStyle: { bg: string; border?: string }): string {
    const arrowSize = '6px';
    const arrowColor = variantStyle.border || variantStyle.bg;

    const positions: Record<string, string> = {
      top: `
        .tooltip-content {
          bottom: calc(100% + ${spacing[2]});
          left: 50%;
          transform: translateX(-50%) scale(0.95);
        }
        .tooltip-content.show {
          transform: translateX(-50%) scale(1);
        }
        .tooltip-arrow {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
          border-color: ${arrowColor} transparent transparent transparent;
        }
      `,
      bottom: `
        .tooltip-content {
          top: calc(100% + ${spacing[2]});
          left: 50%;
          transform: translateX(-50%) scale(0.95);
        }
        .tooltip-content.show {
          transform: translateX(-50%) scale(1);
        }
        .tooltip-arrow {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
          border-color: transparent transparent ${arrowColor} transparent;
        }
      `,
      left: `
        .tooltip-content {
          right: calc(100% + ${spacing[2]});
          top: 50%;
          transform: translateY(-50%) scale(0.95);
        }
        .tooltip-content.show {
          transform: translateY(-50%) scale(1);
        }
        .tooltip-arrow {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: ${arrowSize} 0 ${arrowSize} ${arrowSize};
          border-color: transparent transparent transparent ${arrowColor};
        }
      `,
      right: `
        .tooltip-content {
          left: calc(100% + ${spacing[2]});
          top: 50%;
          transform: translateY(-50%) scale(0.95);
        }
        .tooltip-content.show {
          transform: translateY(-50%) scale(1);
        }
        .tooltip-arrow {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
          border-color: transparent ${arrowColor} transparent transparent;
        }
      `,
    };

    return positions[position] || positions.top;
  }

  protected render(): void {
    if (this.isDisabled()) {
      return;
    }

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
      <div class="tooltip-content" role="tooltip">
        <slot name="content"></slot>
        <div class="tooltip-arrow"></div>
      </div>
    `;

    this.tooltipElement = this.shadow.querySelector('.tooltip-content') as HTMLElement;
    this.triggerElement = this;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.triggerElement || !this.tooltipElement) return;

    this.triggerElement.addEventListener('mouseenter', () => this.show());
    this.triggerElement.addEventListener('mouseleave', () => this.hide());
    this.triggerElement.addEventListener('focus', () => this.show());
    this.triggerElement.addEventListener('blur', () => this.hide());
  }

  private show(): void {
    if (this.isDisabled() || !this.tooltipElement) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    const delay = this.getDelay();
    this.showTimeout = window.setTimeout(() => {
      if (this.tooltipElement) {
        this.tooltipElement.classList.add('show');
        this.dispatchEvent(new CustomEvent('show', { bubbles: true, composed: true }));
      }
    }, delay);
  }

  private hide(): void {
    if (!this.tooltipElement) return;

    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    this.hideTimeout = window.setTimeout(() => {
      if (this.tooltipElement) {
        this.tooltipElement.classList.remove('show');
        this.dispatchEvent(new CustomEvent('hide', { bubbles: true, composed: true }));
      }
    }, 100);
  }

  public showTooltip(): void {
    this.show();
  }

  public hideTooltip(): void {
    this.hide();
  }

  protected onAttributeChange(): void {
    this.render();
  }

  disconnectedCallback(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }
}

customElements.define('rell-tooltip', RellTooltip);

