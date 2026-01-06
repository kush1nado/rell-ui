import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';
import type { RellItem } from './rell-item';

export class RellItemList extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'gap', 'variant', 'dividers', 'draggable'];
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  private getGap(): string {
    return this.getAttribute('gap') || spacing[2];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private hasDividers(): boolean {
    return this.hasAttribute('dividers');
  }

  private isDraggable(): boolean {
    return this.hasAttribute('draggable');
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const gap = this.getGap();
    const variant = this.getVariant();
    const dividers = this.hasDividers();

    const variantStyles: Record<string, { bg: string; padding: string; border: string }> = {
      default: {
        bg: 'transparent',
        padding: '0',
        border: 'none',
      },
      outlined: {
        bg: 'var(--rell-surface-base)',
        padding: spacing[2],
        border: `1px solid var(--rell-border-default)`,
      },
      filled: {
        bg: 'var(--rell-surface-base)',
        padding: spacing[2],
        border: 'none',
      },
    };

    const style = variantStyles[variant] || variantStyles.default;
    const isHorizontal = orientation === 'horizontal';

    return `
      :host {
        display: block;
        width: 100%;
      }

      .item-list {
        display: flex;
        flex-direction: ${isHorizontal ? 'row' : 'column'};
        gap: ${gap};
        background-color: ${style.bg};
        padding: ${style.padding};
        border: ${style.border};
        border-radius: ${radius.md};
        list-style: none;
        margin: 0;
        box-sizing: border-box;
      }

      ${dividers && !isHorizontal ? `
      ::slotted(rell-item:not(:last-child)) {
        border-bottom: 1px solid var(--rell-border-default);
        padding-bottom: ${gap};
        margin-bottom: ${gap};
      }
      ` : ''}

      ${dividers && isHorizontal ? `
      ::slotted(rell-item:not(:last-child)) {
        border-right: 1px solid var(--rell-border-default);
        padding-right: ${gap};
        margin-right: ${gap};
      }
      ` : ''}

      ::slotted(rell-item) {
        display: block;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <ul class="item-list" role="list">
        <slot></slot>
      </ul>
    `;

    if (this.isDraggable()) {
      this.setupDraggable();
    }
  }

  private setupDraggable(): void {
    // Wait for items to be slotted
    setTimeout(() => {
      const slot = this.shadow.querySelector('slot');
      if (!slot) return;

      const updateItems = () => {
        const items = this.getItems();
        items.forEach((item, index) => {
          if (!item.hasAttribute('draggable')) {
            item.setAttribute('draggable', '');
          }
          if (!item.hasAttribute('data-id')) {
            item.setAttribute('data-id', `item-${index}`);
          }
        });
      };

      updateItems();
      slot.addEventListener('slotchange', updateItems);

      // Listen for reorder events
      this.addEventListener('item-reorder', ((e: CustomEvent) => {
        const newOrder = this.getOrder();
        this.dispatchEvent(new CustomEvent('order-changed', {
          bubbles: true,
          composed: true,
          detail: {
            order: newOrder,
            items: newOrder.map(id => this.getItemById(id))
          }
        }));
      }) as EventListener);
    }, 0);
  }

  private getItems(): Element[] {
    return Array.from(this.querySelectorAll('rell-item'));
  }

  private getItemById(id: string): Element | null {
    return this.querySelector(`rell-item[data-id="${id}"]`);
  }

  public getOrder(): string[] {
    const items = this.getItems();
    return items.map(item => item.getAttribute('data-id') || '').filter(Boolean);
  }

  public setOrder(order: string[]): void {
    const items = this.getItems();
    const itemMap = new Map(items.map(item => [item.getAttribute('data-id') || '', item]));
    
    order.forEach(id => {
      const item = itemMap.get(id);
      if (item) {
        this.appendChild(item);
      }
    });
  }

  public getOrderAsData(): Array<{ id: string; element: Element }> {
    const items = this.getItems();
    return items.map(item => ({
      id: item.getAttribute('data-id') || '',
      element: item
    }));
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-item-list', RellItemList);

