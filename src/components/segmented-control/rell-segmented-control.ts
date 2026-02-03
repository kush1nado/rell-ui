import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellSegmentedControl extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'size', 'variant'];
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const variant = this.getVariant();

    const sizeStyles: Record<string, { padding: string; fontSize: string; height: string }> = {
      sm: { padding: `${spacing[1]} ${spacing[2]}`, fontSize: '0.875rem', height: '32px' },
      md: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '1rem', height: '40px' },
      lg: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1.125rem', height: '48px' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    const variantStyles: Record<string, { bg: string; border: string }> = {
      default: {
        bg: 'var(--rell-surface-elevated)',
        border: 'var(--rell-border-default)',
      },
      outlined: {
        bg: 'transparent',
        border: 'var(--rell-border-default)',
      },
    };

    const variantStyle = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: inline-flex;
        position: relative;
        background-color: ${variantStyle.bg};
        border: 2px solid ${variantStyle.border};
        border-radius: ${radius.md};
        padding: 2px;
        gap: 2px;
      }

      .segmented-control {
        display: flex;
        position: relative;
        width: 100%;
      }

      .segmented-control-indicator {
        position: absolute;
        background-color: var(--rell-interactive-primary);
        border-radius: ${radius.sm};
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${shadows.sm};
        z-index: 0;
        height: calc(100% - 4px);
        top: 2px;
      }

      ::slotted(rell-segmented-control-item) {
        position: relative;
        z-index: 1;
        flex: 1;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="segmented-control">
        <div class="segmented-control-indicator"></div>
        <slot></slot>
      </div>
    `;

    this.setupSegmentedControl();
  }

  private setupSegmentedControl(): void {
    const slot = this.shadow.querySelector('slot') as HTMLSlotElement;
    const indicator = this.shadow.querySelector('.segmented-control-indicator') as HTMLElement;

    const updateIndicator = () => {
      const assignedNodes = slot.assignedNodes();
      const items = assignedNodes.filter(
        (node): node is HTMLElement => node instanceof HTMLElement && node.tagName === 'RELL-SEGMENTED-CONTROL-ITEM'
      );

      const activeIndex = items.findIndex(item => item.getAttribute('active') !== null);
      
      if (activeIndex >= 0 && indicator) {
        const activeItem = items[activeIndex];
        const container = this.shadow.querySelector('.segmented-control') as HTMLElement;
        if (container && activeItem) {
          const containerRect = container.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const left = itemRect.left - containerRect.left;
          const width = itemRect.width;
          
          indicator.style.left = `${left}px`;
          indicator.style.width = `${width}px`;
        }
      }
    };

    slot.addEventListener('slotchange', () => {
      setTimeout(updateIndicator, 0);
    });

    this.addEventListener('segmented-control-change', updateIndicator);
    
    setTimeout(updateIndicator, 0);
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      const slot = this.shadow.querySelector('slot') as HTMLSlotElement;
      const assignedNodes = slot.assignedNodes();
      const items = assignedNodes.filter(
        (node): node is HTMLElement => node instanceof HTMLElement && node.tagName === 'RELL-SEGMENTED-CONTROL-ITEM'
      );

      items.forEach(item => {
        const value = item.getAttribute('value');
        if (value === this.getValue()) {
          item.setAttribute('active', '');
        } else {
          item.removeAttribute('active');
        }
      });

      this.dispatchEvent(new CustomEvent('segmented-control-change', { bubbles: true, composed: true }));
    }
  }
}

customElements.define('rell-segmented-control', RellSegmentedControl);

