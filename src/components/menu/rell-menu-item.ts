import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellMenuItem extends BaseComponent {
  static get observedAttributes() {
    return ['active', 'disabled', 'variant'];
  }

  private isActive(): boolean {
    return this.hasAttribute('active');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const active = this.isActive();
    const disabled = this.isDisabled();
    const variant = this.getVariant();

    return `
      :host {
        display: block;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
      }

      .menu-item {
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
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        white-space: nowrap;
        box-sizing: border-box;
      }

      :host {
        --menu-item-width: 100%;
      }

      .menu-item {
        width: var(--menu-item-width, 100%);
      }

      .menu-item:hover:not(.disabled) {
        background-color: var(--rell-surface-hover);
      }

      ${active ? `
      .menu-item {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
      }
      ` : ''}

      ${disabled ? `
      .menu-item {
        opacity: 0.5;
        cursor: not-allowed;
      }
      ` : ''}

      ${variant === 'danger' ? `
      .menu-item {
        color: var(--rell-status-error);
      }
      .menu-item:hover:not(.disabled) {
        background-color: rgba(255, 59, 48, 0.1);
      }
      ` : ''}

      ::slotted([slot="icon"]) {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <a class="menu-item" role="menuitem" tabindex="${this.isDisabled() ? '-1' : '0'}">
        <slot name="icon"></slot>
        <slot></slot>
      </a>
    `;

    if (!this.isDisabled()) {
      this.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('menu-item-click', {
          bubbles: true,
          composed: true,
          detail: { item: this }
        }));
      });
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-menu-item', RellMenuItem);

