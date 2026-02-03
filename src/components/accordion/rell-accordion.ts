import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellAccordion extends BaseComponent {
  static get observedAttributes() {
    return ['multiple', 'variant'];
  }

  private allowMultiple(): boolean {
    return this.hasAttribute('multiple');
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getItems(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-accordion-item'));
  }

  public openItem(value: string): void {
    const items = this.getItems();
    const item = items.find(item => item.getAttribute('value') === value);
    if (item) {
      item.setAttribute('open', '');
    }
  }

  public closeItem(value: string): void {
    const items = this.getItems();
    const item = items.find(item => item.getAttribute('value') === value);
    if (item) {
      item.removeAttribute('open');
    }
  }

  public toggleItem(value: string): void {
    const items = this.getItems();
    const item = items.find(item => item.getAttribute('value') === value);
    if (item) {
      if (item.hasAttribute('open')) {
        this.closeItem(value);
      } else {
        this.openItem(value);
      }
    }
  }

  private handleItemToggle = (e: CustomEvent): void => {
    const value = e.detail.value;
    const isOpen = e.detail.open;

    if (!this.allowMultiple()) {
      const items = this.getItems();
      items.forEach(item => {
        const itemValue = item.getAttribute('value');
        if (itemValue !== value && item.hasAttribute('open')) {
          item.removeAttribute('open');
        }
      });
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value, open: isOpen },
      bubbles: true,
      composed: true,
    }));
  };

  protected getComponentStyles(): string {
    const variant = this.getVariant();

    const variantStyles: Record<string, string> = {
      default: `
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.md};
        overflow: hidden;
      `,
      separated: `
        gap: ${spacing[2]};
      `,
    };

    return `
      :host {
        display: block;
        width: 100%;
        ${variantStyles[variant] || variantStyles.default}
      }

      ::slotted(rell-accordion-item) {
        ${variant === 'separated' ? `
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.md};
        ` : `
        border-bottom: 1px solid var(--rell-border-default);
        `}
      }

      ::slotted(rell-accordion-item:last-child) {
        border-bottom: none;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot></slot>
    `;

    const items = this.getItems();
    items.forEach(item => {
      item.addEventListener('toggle', this.handleItemToggle as EventListener);
    });
  }

  protected onAttributeChange(): void {
    this.render();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.render();
  }
}

customElements.define('rell-accordion', RellAccordion);

