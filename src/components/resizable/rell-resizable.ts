import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellResizable extends BaseComponent {
  static get observedAttributes() {
    return ['direction', 'min-width', 'min-height', 'max-width', 'max-height', 'disabled'];
  }

  private isResizing = false;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private resizeHandle: HTMLElement | null = null;

  private getDirection(): string {
    return this.getAttribute('direction') || 'both';
  }

  private getMinWidth(): number {
    const min = this.getAttribute('min-width');
    return min ? parseFloat(min) : 100;
  }

  private getMinHeight(): number {
    const min = this.getAttribute('min-height');
    return min ? parseFloat(min) : 100;
  }

  private getMaxWidth(): number {
    const max = this.getAttribute('max-width');
    return max ? parseFloat(max) : Infinity;
  }

  private getMaxHeight(): number {
    const max = this.getAttribute('max-height');
    return max ? parseFloat(max) : Infinity;
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const direction = this.getDirection();
    const disabled = this.isDisabled();

    const isHorizontal = direction === 'horizontal' || direction === 'both';
    const isVertical = direction === 'vertical' || direction === 'both';

    return `
      :host {
        display: inline-block;
        position: relative;
        ${disabled ? '' : 'resize: ' + direction + ';'}
        overflow: auto;
      }

      .resizable-content {
        width: 100%;
        height: 100%;
        min-width: ${this.getMinWidth()}px;
        min-height: ${this.getMinHeight()}px;
        ${this.getMaxWidth() !== Infinity ? `max-width: ${this.getMaxWidth()}px;` : ''}
        ${this.getMaxHeight() !== Infinity ? `max-height: ${this.getMaxHeight()}px;` : ''}
      }

      ${!disabled ? `
      .resizable-handle {
        position: absolute;
        background-color: transparent;
        z-index: 10;
      }

      ${isHorizontal ? `
      .resizable-handle-right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 8px;
        cursor: ew-resize;
      }

      .resizable-handle-right:hover {
        background-color: var(--rell-accent-cyan);
        opacity: 0.3;
      }
      ` : ''}

      ${isVertical ? `
      .resizable-handle-bottom {
        bottom: 0;
        left: 0;
        right: 0;
        height: 8px;
        cursor: ns-resize;
      }

      .resizable-handle-bottom:hover {
        background-color: var(--rell-accent-cyan);
        opacity: 0.3;
      }
      ` : ''}

      ${direction === 'both' ? `
      .resizable-handle-corner {
        right: 0;
        bottom: 0;
        width: 16px;
        height: 16px;
        cursor: nwse-resize;
      }

      .resizable-handle-corner:hover {
        background-color: var(--rell-accent-cyan);
        opacity: 0.3;
      }
      ` : ''}
      ` : ''}
    `;
  }

  protected render(): void {
    const direction = this.getDirection();
    const disabled = this.isDisabled();
    const isHorizontal = direction === 'horizontal' || direction === 'both';
    const isVertical = direction === 'vertical' || direction === 'both';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="resizable-content">
        <slot></slot>
      </div>
      ${!disabled ? `
        ${isHorizontal ? '<div class="resizable-handle resizable-handle-right"></div>' : ''}
        ${isVertical ? '<div class="resizable-handle resizable-handle-bottom"></div>' : ''}
        ${direction === 'both' ? '<div class="resizable-handle resizable-handle-corner"></div>' : ''}
      ` : ''}
    `;

    if (!disabled) {
      this.setupResize();
    }
  }

  private setupResize(): void {
    const direction = this.getDirection();
    const isHorizontal = direction === 'horizontal' || direction === 'both';
    const isVertical = direction === 'vertical' || direction === 'both';

    const handleMouseDown = (e: MouseEvent, handleType: string) => {
      e.preventDefault();
      e.stopPropagation();
      
      this.isResizing = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startWidth = this.offsetWidth;
      this.startHeight = this.offsetHeight;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      this.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isResizing) return;

      const deltaX = e.clientX - this.startX;
      const deltaY = e.clientY - this.startY;

      let newWidth = this.startWidth;
      let newHeight = this.startHeight;

      if (isHorizontal) {
        newWidth = this.startWidth + deltaX;
        newWidth = Math.max(this.getMinWidth(), Math.min(this.getMaxWidth(), newWidth));
        this.style.width = `${newWidth}px`;
      }

      if (isVertical) {
        newHeight = this.startHeight + deltaY;
        newHeight = Math.max(this.getMinHeight(), Math.min(this.getMaxHeight(), newHeight));
        this.style.height = `${newHeight}px`;
      }

      this.dispatchEvent(new CustomEvent('resize', {
        bubbles: true,
        composed: true,
        detail: { width: newWidth, height: newHeight }
      }));
    };

    const handleMouseUp = () => {
      this.isResizing = false;
      this.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (isHorizontal) {
      const rightHandle = this.shadow.querySelector('.resizable-handle-right') as HTMLElement;
      if (rightHandle) {
        rightHandle.addEventListener('mousedown', (e) => handleMouseDown(e, 'right'));
      }
    }

    if (isVertical) {
      const bottomHandle = this.shadow.querySelector('.resizable-handle-bottom') as HTMLElement;
      if (bottomHandle) {
        bottomHandle.addEventListener('mousedown', (e) => handleMouseDown(e, 'bottom'));
      }
    }

    if (direction === 'both') {
      const cornerHandle = this.shadow.querySelector('.resizable-handle-corner') as HTMLElement;
      if (cornerHandle) {
        cornerHandle.addEventListener('mousedown', (e) => handleMouseDown(e, 'corner'));
      }
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'disabled' || name === 'direction') {
      this.render();
    }
  }
}

customElements.define('rell-resizable', RellResizable);

