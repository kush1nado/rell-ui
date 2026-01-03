import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellNotification extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'position', 'duration', 'auto-close'];
  }

  private getType(): string {
    return this.getAttribute('type') || 'info';
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'top-right';
  }

  private getDuration(): number {
    const duration = this.getAttribute('duration');
    return duration ? parseInt(duration, 10) : 5000;
  }

  private shouldAutoClose(): boolean {
    const autoClose = this.getAttribute('auto-close');
    return autoClose !== 'false' && (autoClose === 'true' || !this.hasAttribute('auto-close'));
  }

  protected getComponentStyles(): string {
    const type = this.getType();

    const typeStyles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      success: {
        bg: 'var(--rell-status-success)',
        border: 'var(--rell-status-success)',
        text: 'var(--rell-text-inverse)',
        icon: '✓',
      },
      warning: {
        bg: 'var(--rell-status-warning)',
        border: 'var(--rell-status-warning)',
        text: 'var(--rell-text-inverse)',
        icon: '⚠',
      },
      error: {
        bg: 'var(--rell-status-error)',
        border: 'var(--rell-status-error)',
        text: 'var(--rell-text-inverse)',
        icon: '✕',
      },
      info: {
        bg: 'var(--rell-status-info)',
        border: 'var(--rell-status-info)',
        text: 'var(--rell-text-inverse)',
        icon: 'ℹ',
      },
    };

    const typeStyle = typeStyles[type] || typeStyles.info;

    return `
      :host {
        display: block;
        position: fixed;
        z-index: 10000;
        max-width: 400px;
      }

      @keyframes slideInTop {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes slideInBottom {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes slideOutTop {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
      }

      @keyframes slideOutBottom {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
      }

      :host[data-position^="top"] {
        animation: slideInTop 0.3s ease-out;
      }

      :host[data-position^="bottom"] {
        animation: slideInBottom 0.3s ease-out;
      }

      :host[data-position^="top"].closing {
        animation: slideOutTop 0.2s ease-in forwards;
      }

      :host[data-position^="bottom"].closing {
        animation: slideOutBottom 0.2s ease-in forwards;
      }

      .notification {
        display: flex;
        align-items: flex-start;
        gap: ${spacing[3]};
        padding: ${spacing[4]};
        border-radius: ${radius.md};
        border: 2px solid ${typeStyle.border};
        background-color: ${typeStyle.bg};
        color: ${typeStyle.text};
        font-family: var(--rell-font-sans);
        box-shadow: ${shadows.lg};
        min-width: 300px;
      }

      .notification-icon {
        flex-shrink: 0;
        font-size: 1.25rem;
        line-height: 1;
        margin-top: 0.125rem;
      }

      .notification-content {
        flex: 1;
        min-width: 0;
      }

      .notification-title {
        font-weight: 600;
        margin-bottom: ${spacing[1]};
        font-size: 1rem;
      }

      .notification-message {
        font-size: 0.875rem;
        line-height: 1.5;
        opacity: 0.95;
      }

      .notification-dismiss {
        flex-shrink: 0;
        background: none;
        border: none;
        color: ${typeStyle.text};
        cursor: pointer;
        padding: ${spacing[1]};
        margin: -${spacing[1]};
        font-size: 1.25rem;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .notification-dismiss:hover {
        opacity: 1;
      }
    `;
  }

  private setPosition(): void {
    const position = this.getPosition();
    
    // Reset all position properties
    this.style.top = '';
    this.style.bottom = '';
    this.style.left = '';
    this.style.right = '';
    this.style.transform = '';
    
    const positions: Record<string, { top?: string; bottom?: string; left?: string; right?: string; transform?: string }> = {
      'top-right': { top: spacing[4], right: spacing[4] },
      'top-left': { top: spacing[4], left: spacing[4] },
      'top-center': { top: spacing[4], left: '50%', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: spacing[4], right: spacing[4] },
      'bottom-left': { bottom: spacing[4], left: spacing[4] },
      'bottom-center': { bottom: spacing[4], left: '50%', transform: 'translateX(-50%)' },
    };

    const pos = positions[position] || positions['top-right'];
    Object.entries(pos).forEach(([prop, value]) => {
      if (value) {
        this.style.setProperty(prop, value);
      }
    });
  }

  protected render(): void {
    const type = this.getType();

    const icons: Record<string, string> = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ',
    };

    const position = this.getPosition();
    this.setAttribute('data-position', position);

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="notification" role="alert">
        <span class="notification-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <div class="notification-content">
          <slot></slot>
        </div>
        <button class="notification-dismiss" aria-label="Dismiss">×</button>
      </div>
    `;

    this.setPosition();

    const dismissBtn = this.shadow.querySelector('.notification-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        this.close();
      });
    }

    if (this.shouldAutoClose()) {
      setTimeout(() => {
        this.close();
      }, this.getDuration());
    }
  }

  public close(): void {
    this.classList.add('closing');
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
      this.remove();
    }, 200);
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-notification', RellNotification);

