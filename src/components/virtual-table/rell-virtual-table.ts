import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

interface VirtualTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any, index: number) => string;
}

export class RellVirtualTable extends BaseComponent {
  static get observedAttributes() {
    return ['height', 'row-height', 'buffer', 'striped', 'bordered', 'hover'];
  }

  private data: any[] = [];
  private columns: VirtualTableColumn[] = [];
  private container: HTMLElement | null = null;
  private scrollContainer: HTMLElement | null = null;
  private headerContainer: HTMLElement | null = null;
  private bodyContainer: HTMLElement | null = null;
  private spacerTop: HTMLElement | null = null;
  private spacerBottom: HTMLElement | null = null;
  private visibleStart = 0;
  private visibleEnd = 0;
  private totalHeight = 0;
  private scrollPosition = 0;
  private lastVisibleStart = -1;
  private lastVisibleEnd = -1;

  private getHeight(): string {
    return this.getAttribute('height') || '400px';
  }

  private getRowHeight(): number {
    const rowHeight = this.getAttribute('row-height');
    return rowHeight ? parseInt(rowHeight, 10) : 48;
  }

  private getBuffer(): number {
    const buffer = this.getAttribute('buffer');
    return buffer ? parseInt(buffer, 10) : 5;
  }

  private isStriped(): boolean {
    return this.hasAttribute('striped');
  }

  private isBordered(): boolean {
    return this.hasAttribute('bordered');
  }

  private hasHover(): boolean {
    return this.hasAttribute('hover');
  }

  public setData(data: any[]): void {
    this.data = data;
    if (this.scrollContainer && this.bodyContainer && this.spacerTop && this.spacerBottom) {
      this.updateVirtualization();
    } else {
      // If not rendered yet, wait for render
      this.requestUpdate();
    }
  }

  public setColumns(columns: VirtualTableColumn[]): void {
    this.columns = columns;
    this.render();
    // If data already set, update virtualization after render
    if (this.data.length > 0) {
      setTimeout(() => {
        this.updateVirtualization();
      }, 0);
    }
  }
  
  private requestUpdate(): void {
    if (this.scrollContainer && this.bodyContainer && this.spacerTop && this.spacerBottom) {
      this.updateVirtualization();
    } else {
      setTimeout(() => this.requestUpdate(), 10);
    }
  }

  private calculateVisibleRange(): void {
    const rowHeight = this.getRowHeight();
    const buffer = this.getBuffer();
    const containerHeight = this.scrollContainer?.clientHeight || 0;
    
    const start = Math.max(0, Math.floor(this.scrollPosition / rowHeight) - buffer);
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const end = Math.min(this.data.length, start + visibleCount + buffer * 2);
    
    this.visibleStart = start;
    this.visibleEnd = end;
    this.totalHeight = this.data.length * rowHeight;
  }

  private updateVirtualization(): void {
    if (!this.scrollContainer || !this.bodyContainer || !this.spacerTop || !this.spacerBottom) {
      return;
    }

    if (this.data.length === 0 || this.columns.length === 0) {
      this.bodyContainer.innerHTML = '';
      this.spacerTop.style.height = '0px';
      this.spacerBottom.style.height = '0px';
      this.lastVisibleStart = -1;
      this.lastVisibleEnd = -1;
      return;
    }

    // Save current scroll position
    const savedScrollTop = this.scrollContainer.scrollTop;

    this.calculateVisibleRange();

    // Only update if visible range changed
    if (this.visibleStart === this.lastVisibleStart && this.visibleEnd === this.lastVisibleEnd) {
      return;
    }

    const rowHeight = this.getRowHeight();
    const topSpacerHeight = this.visibleStart * rowHeight;
    const bottomSpacerHeight = Math.max(0, (this.data.length - this.visibleEnd) * rowHeight);

    // Update spacers first
    this.spacerTop.style.height = `${topSpacerHeight}px`;
    this.spacerBottom.style.height = `${bottomSpacerHeight}px`;

    // Render rows using DocumentFragment for smoother updates
    const visibleData = this.data.slice(this.visibleStart, this.visibleEnd);
    this.renderRows(visibleData, this.visibleStart);

    // Restore scroll position after DOM update to prevent infinite scroll
    this.isRestoringScroll = true;
    requestAnimationFrame(() => {
      if (this.scrollContainer) {
        const currentScroll = this.scrollContainer.scrollTop;
        // Only restore if scroll position changed significantly (more than 5px)
        // This prevents infinite scroll loops
        if (Math.abs(currentScroll - savedScrollTop) > 5) {
          this.scrollContainer.scrollTop = savedScrollTop;
          this.scrollPosition = savedScrollTop;
        } else {
          // Update scrollPosition to current if it's close
          this.scrollPosition = currentScroll;
        }
      }
      // Reset flag after a short delay to allow scroll events to settle
      setTimeout(() => {
        this.isRestoringScroll = false;
      }, 10);
    });

    this.lastVisibleStart = this.visibleStart;
    this.lastVisibleEnd = this.visibleEnd;
  }

  private renderRows(data: any[], startIndex: number): void {
    if (!this.bodyContainer) return;

    const rowHeight = this.getRowHeight();
    const striped = this.isStriped();
    const hover = this.hasHover();

    // Use DocumentFragment for smoother DOM updates
    const fragment = document.createDocumentFragment();
    
    data.forEach((row, index) => {
      const actualIndex = startIndex + index;
      const isEven = actualIndex % 2 === 0;
      
      const rowElement = document.createElement('div');
      rowElement.className = `virtual-table-row ${striped && isEven ? 'striped' : ''} ${hover ? 'hover' : ''}`;
      rowElement.style.height = `${rowHeight}px`;
      rowElement.setAttribute('data-index', String(actualIndex));
      
      this.columns.forEach(col => {
        const value = row[col.key];
        const rendered = col.render ? col.render(value, row, actualIndex) : String(value || '');
        const align = col.align || 'left';
        const width = col.width ? `width: ${col.width};` : '';
        
        const cellElement = document.createElement('div');
        cellElement.className = 'virtual-table-cell';
        cellElement.style.textAlign = align;
        if (col.width) {
          cellElement.style.width = col.width;
        }
        cellElement.innerHTML = rendered;
        
        rowElement.appendChild(cellElement);
      });
      
      fragment.appendChild(rowElement);
    });

    // Clear and append in one operation
    this.bodyContainer.innerHTML = '';
    this.bodyContainer.appendChild(fragment);
  }

  private scrollTimeout: number | null = null;
  private isUpdating = false;
  private isRestoringScroll = false;
  
  private handleScroll = (): void => {
    if (!this.scrollContainer || this.isUpdating || this.isRestoringScroll) return;
    
    // Throttle scroll updates using requestAnimationFrame
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }
    
    this.scrollTimeout = requestAnimationFrame(() => {
      if (!this.scrollContainer || this.isRestoringScroll) return;
      
      const newScrollPosition = this.scrollContainer.scrollTop;
      
      // Only update if scroll position changed significantly
      if (Math.abs(newScrollPosition - this.scrollPosition) > 1) {
        this.scrollPosition = newScrollPosition;
        this.isUpdating = true;
        this.updateVirtualization();
        this.isUpdating = false;
      }
      
      this.scrollTimeout = null;
    });
  };

  protected getComponentStyles(): string {
    const height = this.getHeight();
    const rowHeight = this.getRowHeight();
    const bordered = this.isBordered();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .virtual-table-container {
        display: flex;
        flex-direction: column;
        height: ${height};
        border-radius: ${radius.md};
        ${bordered ? 'border: 1px solid var(--rell-border-default);' : ''}
        overflow: hidden;
        background-color: var(--rell-surface-base);
      }

      .virtual-table-header {
        flex-shrink: 0;
        background-color: var(--rell-surface-elevated);
        border-bottom: 2px solid var(--rell-border-default);
        overflow-x: auto;
        overflow-y: hidden;
      }

      .virtual-table-header-row {
        display: flex;
        min-width: 100%;
      }

      .virtual-table-header-cell {
        padding: ${spacing[3]} ${spacing[4]};
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: 600;
        color: var(--rell-text-primary);
        flex-shrink: 0;
        border-right: 1px solid var(--rell-border-default);
      }

      .virtual-table-header-cell:last-child {
        border-right: none;
      }

      .virtual-table-body {
        flex: 1;
        overflow: auto;
        position: relative;
      }

      .virtual-table-spacer {
        width: 100%;
      }

      .virtual-table-row {
        display: flex;
        min-width: 100%;
        border-bottom: 1px solid var(--rell-border-default);
        transition: background-color 0.2s ease;
      }

      .virtual-table-row.striped {
        background-color: var(--rell-surface-elevated);
      }

      .virtual-table-row.hover:hover {
        background-color: var(--rell-surface-hover);
        cursor: pointer;
      }

      .virtual-table-row:last-child {
        border-bottom: none;
      }

      .virtual-table-cell {
        padding: ${spacing[3]} ${spacing[4]};
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-secondary);
        flex-shrink: 0;
        border-right: 1px solid var(--rell-border-default);
        display: flex;
        align-items: center;
        ${bordered ? '' : 'border-right: none;'}
      }

      .virtual-table-cell:last-child {
        border-right: none;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="virtual-table-container">
        <div class="virtual-table-header">
          <div class="virtual-table-header-row">
            ${this.columns.map(col => {
              const width = col.width ? `width: ${col.width};` : '';
              const align = col.align || 'left';
              return `
                <div class="virtual-table-header-cell" style="text-align: ${align}; ${width}">
                  ${col.label}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="virtual-table-body">
          <div class="virtual-table-spacer virtual-table-spacer-top"></div>
          <div class="virtual-table-rows"></div>
          <div class="virtual-table-spacer virtual-table-spacer-bottom"></div>
        </div>
      </div>
    `;

    this.container = this.shadow.querySelector('.virtual-table-container') as HTMLElement;
    this.scrollContainer = this.shadow.querySelector('.virtual-table-body') as HTMLElement;
    this.headerContainer = this.shadow.querySelector('.virtual-table-header') as HTMLElement;
    this.bodyContainer = this.shadow.querySelector('.virtual-table-rows') as HTMLElement;
    this.spacerTop = this.shadow.querySelector('.virtual-table-spacer-top') as HTMLElement;
    this.spacerBottom = this.shadow.querySelector('.virtual-table-spacer-bottom') as HTMLElement;

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScroll);
      
      // Sync header scroll with body scroll
      this.scrollContainer.addEventListener('scroll', () => {
        if (this.headerContainer) {
          this.headerContainer.scrollLeft = this.scrollContainer!.scrollLeft;
        }
      });
    }

    // Update virtualization after a short delay to ensure DOM is ready
    if (this.data.length > 0) {
      setTimeout(() => {
        this.updateVirtualization();
      }, 0);
    }
  }

  protected onAttributeChange(): void {
    this.render();
    if (this.data.length > 0) {
      this.updateVirtualization();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Wait for DOM to be ready, then update virtualization
    setTimeout(() => {
      if (this.data.length > 0 && this.columns.length > 0) {
        this.updateVirtualization();
      }
    }, 50);
  }

  disconnectedCallback(): void {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }
  }
}

customElements.define('rell-virtual-table', RellVirtualTable);

