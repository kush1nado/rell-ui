import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellPagination extends BaseComponent {
  static get observedAttributes() {
    return ['current', 'total', 'page-size', 'show-size-changer', 'show-total', 'mode', 'disabled'];
  }

  private getCurrent(): number {
    const current = this.getAttribute('current');
    return current ? parseInt(current) : 1;
  }

  private getTotal(): number {
    const total = this.getAttribute('total');
    return total ? parseInt(total) : 0;
  }

  private getPageSize(): number {
    const pageSize = this.getAttribute('page-size');
    return pageSize ? parseInt(pageSize) : 10;
  }

  private showSizeChanger(): boolean {
    return this.hasAttribute('show-size-changer');
  }

  private showTotal(): boolean {
    return this.hasAttribute('show-total');
  }

  private getMode(): string {
    return this.getAttribute('mode') || 'client';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getTotalPages(): number {
    const total = this.getTotal();
    const pageSize = this.getPageSize();
    return Math.ceil(total / pageSize);
  }

  private getPageNumbers(): number[] {
    const current = this.getCurrent();
    const totalPages = this.getTotalPages();
    const pages: number[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      }
    }

    return pages;
  }

  private goToPage(page: number): void {
    if (this.isDisabled() || page < 1 || page > this.getTotalPages() || page === this.getCurrent()) {
      return;
    }

    this.setAttribute('current', String(page));

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        current: page,
        pageSize: this.getPageSize(),
        total: this.getTotal(),
      },
      bubbles: true,
      composed: true,
    }));
  }

  private changePageSize(size: number): void {
    if (this.isDisabled()) {
      return;
    }

    this.setAttribute('page-size', String(size));
    this.setAttribute('current', '1');

    this.dispatchEvent(new CustomEvent('page-size-change', {
      detail: {
        current: 1,
        pageSize: size,
        total: this.getTotal(),
      },
      bubbles: true,
      composed: true,
    }));
  }

  protected getComponentStyles(): string {
    const disabled = this.isDisabled();

    return `
      :host {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        flex-wrap: wrap;
      }

      .pagination-info {
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        margin-right: ${spacing[2]};
      }

      .pagination-controls {
        display: flex;
        align-items: center;
        gap: ${spacing[1]};
      }

      .pagination-button {
        min-width: 32px;
        height: 32px;
        padding: 0 ${spacing[2]};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
        background-color: var(--rell-surface-base);
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
      }

      .pagination-button:hover:not(:disabled):not(.active):not(.disabled) {
        background-color: var(--rell-surface-hover);
        border-color: var(--rell-border-hover);
      }

      .pagination-button:focus {
        box-shadow: 0 0 0 3px var(--rell-interactive-primary)40;
      }

      .pagination-button.active {
        background-color: var(--rell-interactive-primary);
        border-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        font-weight: 600;
      }

      .pagination-button.disabled,
      .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .pagination-ellipsis {
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--rell-text-tertiary);
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
      }

      .pagination-size-changer {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        margin-left: ${spacing[4]};
      }

      .pagination-size-label {
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
      }

      .pagination-size-select {
        padding: ${spacing[1]} ${spacing[2]};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
        background-color: var(--rell-surface-base);
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        outline: none;
      }

      .pagination-size-select:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      .pagination-size-select:focus {
        border-color: var(--rell-border-focus);
        box-shadow: 0 0 0 3px var(--rell-border-focus)40;
      }

      .pagination-size-select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
  }

  protected render(): void {
    const current = this.getCurrent();
    const total = this.getTotal();
    const pageSize = this.getPageSize();
    const totalPages = this.getTotalPages();
    const disabled = this.isDisabled();
    const showTotal = this.showTotal();
    const showSizeChanger = this.showSizeChanger();
    const pages = this.getPageNumbers();

    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);

    const totalInfo = showTotal ? `
      <div class="pagination-info">
        Showing ${start}-${end} of ${total}
      </div>
    ` : '';

    const pageButtons = pages.map(page => {
      if (page === -1) {
        return `<div class="pagination-ellipsis">...</div>`;
      }
      const isActive = page === current;
      return `
        <button 
          class="pagination-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}"
          ${disabled ? 'disabled' : ''}
          data-page="${page}"
        >
          ${page}
        </button>
      `;
    }).join('');

    const sizeChanger = showSizeChanger ? `
      <div class="pagination-size-changer">
        <span class="pagination-size-label">Per page:</span>
        <select class="pagination-size-select" ${disabled ? 'disabled' : ''}>
          <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
          <option value="20" ${pageSize === 20 ? 'selected' : ''}>20</option>
          <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
          <option value="100" ${pageSize === 100 ? 'selected' : ''}>100</option>
        </select>
      </div>
    ` : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      ${totalInfo}
      <div class="pagination-controls">
        <button 
          class="pagination-button ${disabled || current === 1 ? 'disabled' : ''}"
          ${disabled || current === 1 ? 'disabled' : ''}
          data-action="first"
          aria-label="First page"
        >
          ««
        </button>
        <button 
          class="pagination-button ${disabled || current === 1 ? 'disabled' : ''}"
          ${disabled || current === 1 ? 'disabled' : ''}
          data-action="prev"
          aria-label="Previous page"
        >
          ‹
        </button>
        ${pageButtons}
        <button 
          class="pagination-button ${disabled || current === totalPages ? 'disabled' : ''}"
          ${disabled || current === totalPages ? 'disabled' : ''}
          data-action="next"
          aria-label="Next page"
        >
          ›
        </button>
        <button 
          class="pagination-button ${disabled || current === totalPages ? 'disabled' : ''}"
          ${disabled || current === totalPages ? 'disabled' : ''}
          data-action="last"
          aria-label="Last page"
        >
          »»
        </button>
      </div>
      ${sizeChanger}
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const buttons = this.shadow.querySelectorAll('.pagination-button[data-page]');
    const firstBtn = this.shadow.querySelector('[data-action="first"]');
    const prevBtn = this.shadow.querySelector('[data-action="prev"]');
    const nextBtn = this.shadow.querySelector('[data-action="next"]');
    const lastBtn = this.shadow.querySelector('[data-action="last"]');
    const sizeSelect = this.shadow.querySelector('.pagination-size-select') as HTMLSelectElement;

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const page = parseInt(button.getAttribute('data-page') || '1');
        this.goToPage(page);
      });
    });

    if (firstBtn) {
      firstBtn.addEventListener('click', () => {
        this.goToPage(1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.goToPage(this.getCurrent() - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.goToPage(this.getCurrent() + 1);
      });
    }

    if (lastBtn) {
      lastBtn.addEventListener('click', () => {
        this.goToPage(this.getTotalPages());
      });
    }

    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.changePageSize(parseInt(target.value));
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'current' || name === 'total' || name === 'page-size') {
      this.render();
    }
  }
}

customElements.define('rell-pagination', RellPagination);

