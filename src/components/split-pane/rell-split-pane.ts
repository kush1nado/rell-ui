import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSplitPane extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'split', 'min', 'max', 'default-size'];
  }

  private isDragging = false;
  private startPos = 0;
  private startSize = 0;
  private pane1: HTMLElement | null = null;
  private pane2: HTMLElement | null = null;
  private divider: HTMLElement | null = null;

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'horizontal';
  }

  private getSplit(): number {
    const split = this.getAttribute('split');
    return split ? parseFloat(split) : 50;
  }

  private getMin(): number {
    const min = this.getAttribute('min');
    return min ? parseFloat(min) : 10;
  }

  private getMax(): number {
    const max = this.getAttribute('max');
    return max ? parseFloat(max) : 90;
  }

  private getDefaultSize(): number {
    const defaultSize = this.getAttribute('default-size');
    return defaultSize ? parseFloat(defaultSize) : 50;
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const isVertical = orientation === 'vertical';
    const split = this.getSplit();

    return `
      :host {
        display: flex;
        flex-direction: ${isVertical ? 'column' : 'row'};
        width: 100%;
        height: 100%;
        position: relative;
      }

      .split-pane-container {
        display: flex;
        flex-direction: ${isVertical ? 'column' : 'row'};
        width: 100%;
        height: 100%;
        position: relative;
      }

      .split-pane-pane {
        overflow: auto;
        position: relative;
      }

      .split-pane-pane-1 {
        ${isVertical ? `height: ${split}%;` : `width: ${split}%;`}
        flex-shrink: 0;
      }

      .split-pane-pane-2 {
        ${isVertical ? `height: ${100 - split}%;` : `width: ${100 - split}%;`}
        flex: 1;
      }

      .split-pane-divider {
        background-color: var(--rell-border-default);
        position: relative;
        flex-shrink: 0;
        ${isVertical ? `
          height: 4px;
          width: 100%;
          cursor: row-resize;
        ` : `
          width: 4px;
          height: 100%;
          cursor: col-resize;
        `}
        transition: background-color 0.2s ease;
      }

      .split-pane-divider:hover {
        background-color: var(--rell-accent-cyan);
      }

      .split-pane-divider.dragging {
        background-color: var(--rell-accent-cyan);
      }

      .split-pane-divider-handle {
        position: absolute;
        ${isVertical ? `
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 20px;
        ` : `
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 40px;
        `}
        background-color: var(--rell-surface-elevated);
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        pointer-events: none;
      }

      .split-pane-divider-handle::before,
      .split-pane-divider-handle::after {
        content: '';
        position: absolute;
        background-color: var(--rell-text-secondary);
        ${isVertical ? `
          width: 2px;
          height: 8px;
          left: 50%;
          transform: translateX(-50%);
        ` : `
          height: 2px;
          width: 8px;
          top: 50%;
          transform: translateY(-50%);
        `}
      }

      .split-pane-divider-handle::before {
        ${isVertical ? 'top: 4px;' : 'left: 4px;'}
      }

      .split-pane-divider-handle::after {
        ${isVertical ? 'bottom: 4px;' : 'right: 4px;'}
      }
    `;
  }

  protected render(): void {
    const split = this.getSplit();
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="split-pane-container">
        <div class="split-pane-pane split-pane-pane-1">
          <slot name="pane1"></slot>
        </div>
        <div class="split-pane-divider">
          <div class="split-pane-divider-handle"></div>
        </div>
        <div class="split-pane-pane split-pane-pane-2">
          <slot name="pane2"></slot>
        </div>
      </div>
    `;

    this.setupResize();
  }

  private setupResize(): void {
    this.pane1 = this.shadow.querySelector('.split-pane-pane-1') as HTMLElement;
    this.pane2 = this.shadow.querySelector('.split-pane-pane-2') as HTMLElement;
    this.divider = this.shadow.querySelector('.split-pane-divider') as HTMLElement;

    if (!this.pane1 || !this.pane2 || !this.divider) return;

    const orientation = this.getOrientation();
    const isVertical = orientation === 'vertical';

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      this.isDragging = true;
      this.startPos = isVertical ? e.clientY : e.clientX;
      this.startSize = isVertical 
        ? (this.pane1!.offsetHeight / this.offsetHeight) * 100
        : (this.pane1!.offsetWidth / this.offsetWidth) * 100;

      this.divider!.classList.add('dragging');
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging || !this.pane1 || !this.pane2) return;

      const currentPos = isVertical ? e.clientY : e.clientX;
      const containerSize = isVertical ? this.offsetHeight : this.offsetWidth;
      const delta = isVertical 
        ? ((currentPos - this.startPos) / containerSize) * 100
        : ((currentPos - this.startPos) / containerSize) * 100;

      let newSize = this.startSize + delta;
      const min = this.getMin();
      const max = this.getMax();

      newSize = Math.max(min, Math.min(max, newSize));

      this.setSplit(newSize);
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      this.divider!.classList.remove('dragging');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    this.divider.addEventListener('mousedown', handleMouseDown);
  }

  private setSplit(value: number): void {
    this.setAttribute('split', String(value));
    this.updateSplit(value);
  }

  private updateSplit(value: number): void {
    if (!this.pane1 || !this.pane2) return;

    const orientation = this.getOrientation();
    const isVertical = orientation === 'vertical';

    if (isVertical) {
      this.pane1.style.height = `${value}%`;
      this.pane2.style.height = `${100 - value}%`;
    } else {
      this.pane1.style.width = `${value}%`;
      this.pane2.style.width = `${100 - value}%`;
    }

    this.dispatchEvent(new CustomEvent('split-change', {
      bubbles: true,
      composed: true,
      detail: { split: value }
    }));
  }

  protected onAttributeChange(name: string): void {
    if (name === 'split') {
      const split = this.getSplit();
      this.updateSplit(split);
    } else if (name === 'orientation') {
      this.render();
    }
  }
}

customElements.define('rell-split-pane', RellSplitPane);

