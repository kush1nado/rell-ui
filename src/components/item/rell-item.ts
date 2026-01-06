import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellItem extends BaseComponent {
  static get observedAttributes() {
    return ['selected', 'disabled', 'clickable', 'size', 'variant', 'draggable'];
  }

  private dragStartY = 0;
  private isDragging = false;

  private isSelected(): boolean {
    return this.hasAttribute('selected');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private isClickable(): boolean {
    return this.hasAttribute('clickable') || this.hasAttribute('href');
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getHref(): string | null {
    return this.getAttribute('href');
  }

  private isDraggable(): boolean {
    return this.hasAttribute('draggable') && !this.isDisabled();
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const disabled = this.isDisabled();
    const selected = this.isSelected();
    const clickable = this.isClickable();
    const variant = this.getVariant();

    const sizeStyles: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
      sm: { padding: `${spacing[2]} ${spacing[3]}`, fontSize: '0.875rem', minHeight: '32px' },
      md: { padding: `${spacing[3]} ${spacing[4]}`, fontSize: '1rem', minHeight: '40px' },
      lg: { padding: `${spacing[4]} ${spacing[5]}`, fontSize: '1.125rem', minHeight: '48px' },
    };

    const variantStyles: Record<string, { bg: string; bgHover: string; bgSelected: string; border: string }> = {
      default: {
        bg: 'transparent',
        bgHover: 'var(--rell-surface-hover)',
        bgSelected: 'var(--rell-surface-active)',
        border: 'transparent',
      },
      outlined: {
        bg: 'transparent',
        bgHover: 'var(--rell-surface-hover)',
        bgSelected: 'var(--rell-surface-active)',
        border: 'var(--rell-border-default)',
      },
      filled: {
        bg: 'var(--rell-surface-base)',
        bgHover: 'var(--rell-surface-hover)',
        bgSelected: 'var(--rell-interactive-primary)',
        border: 'transparent',
      },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: block;
        width: 100%;
      }

      .item {
        display: flex;
        align-items: center;
        gap: ${spacing[3]};
        padding: ${style.padding};
        font-size: ${style.fontSize};
        min-height: ${style.minHeight};
        font-family: var(--rell-font-sans);
        color: var(--rell-text-primary);
        background-color: ${selected ? variantStyle.bgSelected : variantStyle.bg};
        border: ${variantStyle.border === 'transparent' ? 'none' : `1px solid ${variantStyle.border}`};
        border-radius: ${radius.md};
        cursor: ${disabled ? 'not-allowed' : (clickable ? 'pointer' : 'default')};
        transition: all 0.2s ease;
        outline: none;
        opacity: ${disabled ? '0.5' : '1'};
        pointer-events: ${disabled ? 'none' : 'auto'};
        text-decoration: none;
        box-sizing: border-box;
        position: relative;
      }

      ${this.isDraggable() ? `
      .item {
        cursor: grab;
      }

      .item:active {
        cursor: grabbing;
      }

      .item.dragging {
        opacity: 0.5;
        transform: scale(0.95);
      }

      .item.drag-over {
        border-top: 2px solid var(--rell-interactive-primary);
      }

      .drag-handle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        color: var(--rell-text-tertiary);
        cursor: grab;
        margin-right: ${spacing[2]};
        flex-shrink: 0;
      }

      .drag-handle:active {
        cursor: grabbing;
      }

      .drag-handle::before {
        content: '⋮⋮';
        font-size: 12px;
        letter-spacing: -2px;
        line-height: 1;
      }
      ` : ''}

      ${clickable && !disabled ? `
      .item:hover {
        background-color: ${variantStyle.bgHover};
      }
      ` : ''}

      .item:focus-visible {
        outline: 2px solid var(--rell-border-focus);
        outline-offset: 2px;
      }

      .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        color: var(--rell-text-secondary);
      }

      .item-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${spacing[1]};
        min-width: 0;
      }

      .item-title {
        font-weight: 500;
        color: var(--rell-text-primary);
        line-height: 1.4;
      }

      .item-description {
        font-size: 0.875em;
        color: var(--rell-text-secondary);
        line-height: 1.4;
      }

      .item-action {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: auto;
      }

      ::slotted([slot="icon"]) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        color: var(--rell-text-secondary);
      }

      ::slotted([slot="action"]) {
        display: flex;
        align-items: center;
        margin-left: auto;
      }
    `;
  }

  protected render(): void {
    const disabled = this.isDisabled();
    const clickable = this.isClickable();
    const draggable = this.isDraggable();
    const href = this.getHref();
    const tag = href ? 'a' : (clickable ? 'div' : 'div');
    const hrefAttr = href ? `href="${href}"` : '';
    const role = clickable && !href ? 'button' : undefined;
    const tabIndex = clickable && !disabled ? '0' : '-1';
    const draggableAttr = draggable ? 'draggable="true"' : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <${tag} class="item" ${hrefAttr} ${role ? `role="${role}"` : ''} ${tabIndex !== '-1' ? `tabindex="${tabIndex}"` : ''} ${draggableAttr}>
        ${draggable ? '<div class="drag-handle"></div>' : ''}
        <slot name="icon"></slot>
        <div class="item-content">
          <div class="item-title">
            <slot name="title"></slot>
            <slot></slot>
          </div>
          <slot name="description"></slot>
        </div>
        <slot name="action"></slot>
      </${tag}>
    `;

    const item = this.shadow.querySelector('.item') as HTMLElement;
    if (!item) return;

    if (clickable && !disabled) {
      item.addEventListener('click', (e) => {
        if (!this.isDisabled() && !this.isDragging) {
          this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
        }
      });

      item.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !this.isDisabled()) {
          e.preventDefault();
          this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
        }
      });
    }

    if (draggable) {
      this.attachDragListeners(item);
    }
  }

  private attachDragListeners(item: HTMLElement): void {
    item.addEventListener('dragstart', (e: DragEvent) => {
      if (!e.dataTransfer) return;
      
      this.isDragging = true;
      this.dragStartY = e.clientY;
      item.classList.add('dragging');
      
      const itemId = this.getAttribute('data-id') || `item-${Date.now()}-${Math.random()}`;
      if (!this.getAttribute('data-id')) {
        this.setAttribute('data-id', itemId);
      }
      
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
      e.dataTransfer.setData('text/plain', itemId);
      
      this.dispatchEvent(new CustomEvent('drag-start', { 
        bubbles: true, 
        composed: true,
        detail: { element: this }
      }));
    });

    item.addEventListener('dragend', (e: DragEvent) => {
      this.isDragging = false;
      item.classList.remove('dragging');
      
      // Remove all drag-over classes from siblings
      const parent = this.parentElement;
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('rell-item'));
        siblings.forEach(sibling => {
          if (sibling !== this) {
            const siblingItem = sibling.shadowRoot?.querySelector('.item');
            if (siblingItem) {
              siblingItem.classList.remove('drag-over');
            }
          }
        });
      }
      
      this.dispatchEvent(new CustomEvent('drag-end', { 
        bubbles: true, 
        composed: true,
        detail: { element: this }
      }));
    });

    item.addEventListener('dragenter', (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      
      // Find the dragging element
      const draggingElement = Array.from(this.parentElement?.querySelectorAll('rell-item') || [])
        .find(el => el.shadowRoot?.querySelector('.item.dragging'));
      
      // Don't allow dropping on itself
      if (draggingElement === this) {
        e.dataTransfer.dropEffect = 'none';
        return;
      }
      
      e.dataTransfer.dropEffect = 'move';
    });

    item.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.dataTransfer) return;
      
      // Find the dragging element
      const draggingElement = Array.from(this.parentElement?.querySelectorAll('rell-item') || [])
        .find(el => el.shadowRoot?.querySelector('.item.dragging'));
      
      // Don't allow dropping on itself
      if (draggingElement === this) {
        e.dataTransfer.dropEffect = 'none';
        item.classList.remove('drag-over');
        return;
      }
      
      e.dataTransfer.dropEffect = 'move';
      
      const rect = item.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      
      // Remove drag-over from all siblings first
      const parent = this.parentElement;
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('rell-item'));
        siblings.forEach(sibling => {
          if (sibling !== this && sibling !== draggingElement) {
            const siblingItem = sibling.shadowRoot?.querySelector('.item');
            if (siblingItem) {
              siblingItem.classList.remove('drag-over');
            }
          }
        });
      }
      
      // Add drag-over to current item if mouse is in upper half
      if (e.clientY < midpoint) {
        item.classList.add('drag-over');
      } else {
        item.classList.remove('drag-over');
      }
    });

    item.addEventListener('dragleave', (e: DragEvent) => {
      // Only remove drag-over if we're actually leaving the element
      const rect = item.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || 
          e.clientY < rect.top || e.clientY > rect.bottom) {
        item.classList.remove('drag-over');
      }
    });

    item.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      item.classList.remove('drag-over');
      
      // Find the dragging element - prioritize by dragging class
      let draggedElement: RellItem | null = null;
      
      // First, try to find by dragging class (most reliable)
      const draggingByClass = Array.from(this.parentElement?.querySelectorAll('rell-item') || [])
        .find(el => el.shadowRoot?.querySelector('.item.dragging')) as RellItem | undefined;
      
      if (draggingByClass) {
        draggedElement = draggingByClass;
      } else {
        // Fallback to dataTransfer
        const draggedId = e.dataTransfer?.getData('text/plain');
        if (draggedId) {
          draggedElement = Array.from(this.parentElement?.querySelectorAll('rell-item') || [])
            .find(el => el.getAttribute('data-id') === draggedId) as RellItem || null;
        }
      }
      
      if (!draggedElement || draggedElement === this) return;
      
      const rect = item.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const parent = this.parentElement;
      
      if (!parent) return;
      
      // Get current positions
      const allItems = Array.from(parent.querySelectorAll('rell-item'));
      const draggedIndex = allItems.indexOf(draggedElement);
      const targetIndex = allItems.indexOf(this);
      
      // Determine insert position based on mouse Y position
      if (e.clientY < midpoint) {
        // Insert before current element
        if (draggedIndex < targetIndex) {
          // Moving down: insert before target, but dragged element is already before
          // Need to insert before the element that will be after dragged element is removed
          parent.insertBefore(draggedElement, this);
        } else {
          // Moving up: insert before target
          parent.insertBefore(draggedElement, this);
        }
      } else {
        // Insert after current element
        const nextSibling = this.nextSibling;
        if (nextSibling && nextSibling !== draggedElement) {
          parent.insertBefore(draggedElement, nextSibling);
        } else if (nextSibling !== draggedElement) {
          parent.appendChild(draggedElement);
        }
      }
      
      // Dispatch reorder event
      const list = this.closest('rell-item-list');
      if (list) {
        list.dispatchEvent(new CustomEvent('order-changed', {
          bubbles: true,
          composed: true,
          detail: {
            order: (list as any).getOrder(),
            draggedElement,
            targetElement: this
          }
        }));
      }
    });
  }

  private getOrder(): number {
    const parent = this.parentElement;
    if (!parent) return -1;
    
    const items = Array.from(parent.querySelectorAll('rell-item'));
    return items.indexOf(this);
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-item', RellItem);

