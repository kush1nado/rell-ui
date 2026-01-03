import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellCard extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'hover', 'padding'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'elevated';
  }

  private hasHover(): boolean {
    return this.hasAttribute('hover');
  }

  private getPadding(): string {
    return this.getAttribute('padding') || spacing[4];
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const hover = this.hasHover();
    const padding = this.getPadding();

    const variantStyles: Record<string, { bg: string; border: string; shadow: string }> = {
      elevated: {
        bg: 'var(--rell-surface-base)',
        border: 'transparent',
        shadow: shadows.md,
      },
      outlined: {
        bg: 'var(--rell-surface-base)',
        border: 'var(--rell-border-default)',
        shadow: 'none',
      },
      flat: {
        bg: 'var(--rell-bg-secondary)',
        border: 'transparent',
        shadow: 'none',
      },
    };

    const style = variantStyles[variant] || variantStyles.elevated;

    return `
      :host {
        display: block;
        width: 100%;
      }

      .card {
        display: flex;
        flex-direction: column;
        background-color: ${style.bg};
        border: 2px solid ${style.border};
        border-radius: ${radius.lg};
        box-shadow: ${style.shadow};
        padding: ${padding};
        transition: all 0.2s ease;
        box-sizing: border-box;
      }

      ${hover ? `
      .card:hover {
        transform: translateY(-2px);
        box-shadow: ${shadows.lg};
        border-color: var(--rell-border-hover);
      }
      ` : ''}

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${spacing[3]};
        margin-bottom: ${spacing[4]};
        padding-bottom: ${spacing[4]};
        border-bottom: 1px solid var(--rell-border-default);
      }

      .card-header-content {
        display: flex;
        align-items: center;
        gap: ${spacing[3]};
        flex: 1;
      }

      .card-header-actions {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .card-body {
        flex: 1;
      }

      .card-footer {
        margin-top: ${spacing[4]};
        padding-top: ${spacing[4]};
        border-top: 1px solid var(--rell-border-default);
      }

      ::slotted([slot="header"]) {
        margin: 0;
      }

      ::slotted([slot="header-icon"]) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: ${radius.md};
        background-color: var(--rell-surface-hover);
        flex-shrink: 0;
      }

      ::slotted([slot="header-title"]) {
        flex: 1;
        margin: 0;
      }

      ::slotted([slot="header-action"]) {
        margin: 0;
      }

      ::slotted([slot="footer"]) {
        margin: 0;
      }
    `;
  }

  protected render(): void {
    const hasHeader = this.querySelector('[slot="header"]') !== null;
    const hasHeaderIcon = this.querySelector('[slot="header-icon"]') !== null;
    const hasHeaderTitle = this.querySelector('[slot="header-title"]') !== null;
    const hasHeaderAction = this.querySelector('[slot="header-action"]') !== null;
    const hasFooter = this.querySelector('[slot="footer"]') !== null;

    const hasStructuredHeader = hasHeaderIcon || hasHeaderTitle || hasHeaderAction;
    const showHeader = hasHeader || hasStructuredHeader;

    let headerHTML = '';
    if (showHeader) {
      if (hasStructuredHeader) {
        headerHTML = `
          <div class="card-header">
            <div class="card-header-content">
              ${hasHeaderIcon ? '<slot name="header-icon"></slot>' : ''}
              ${hasHeaderTitle ? '<div class="card-header-title"><slot name="header-title"></slot></div>' : ''}
            </div>
            ${hasHeaderAction ? '<div class="card-header-actions"><slot name="header-action"></slot></div>' : ''}
          </div>
        `;
      } else {
        headerHTML = `<div class="card-header"><slot name="header"></slot></div>`;
      }
    }

    const footerHTML = hasFooter ? `<div class="card-footer"><slot name="footer"></slot></div>` : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="card">
        ${headerHTML}
        <div class="card-body">
          <slot></slot>
        </div>
        ${footerHTML}
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-card', RellCard);

