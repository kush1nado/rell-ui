import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export class RellBreadcrumbs extends BaseComponent {
  static get observedAttributes() {
    return ['separator', 'size'];
  }

  private getSeparator(): string {
    return this.getAttribute('separator') || '/';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getItems(): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [];
    const slot = this.querySelector('slot');
    
    if (slot) {
      const assignedNodes = slot.assignedNodes();
      const breadcrumbElements = Array.from(this.querySelectorAll('rell-breadcrumb-item'));
      
      if (breadcrumbElements.length > 0) {
        breadcrumbElements.forEach((el) => {
          const label = el.getAttribute('label') || el.textContent || '';
          const href = el.getAttribute('href') || undefined;
          const active = el.hasAttribute('active');
          items.push({ label, href, active });
        });
      } else {
        const links = Array.from(this.querySelectorAll('a'));
        links.forEach((link, index) => {
          items.push({
            label: link.textContent || '',
            href: link.getAttribute('href') || undefined,
            active: index === links.length - 1,
          });
        });
      }
    }

    if (items.length === 0) {
      const defaultItems = Array.from(this.children);
      defaultItems.forEach((child, index) => {
        if (child.tagName === 'A') {
          items.push({
            label: child.textContent || '',
            href: (child as HTMLAnchorElement).href || undefined,
            active: index === defaultItems.length - 1,
          });
        }
      });
    }

    return items;
  }

  protected getComponentStyles(): string {
    const size = this.getSize();

    const sizeStyles: Record<string, { fontSize: string; gap: string }> = {
      sm: { fontSize: '0.875rem', gap: spacing[2] },
      md: { fontSize: '1rem', gap: spacing[3] },
      lg: { fontSize: '1.125rem', gap: spacing[4] },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${style.gap};
        font-size: ${style.fontSize};
        font-family: var(--rell-font-sans);
      }

      ol li {
        display: inline-flex;
        align-items: center;
      }

      ol li:not(:last-child)::after {
        content: '';
        width: 0;
      }

      .breadcrumb-item {
        display: inline-flex;
        align-items: center;
        color: var(--rell-text-secondary);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .breadcrumb-item:hover {
        color: var(--rell-text-primary);
      }

      .breadcrumb-item.active {
        color: var(--rell-text-primary);
        font-weight: 500;
        pointer-events: none;
      }

      .breadcrumb-separator {
        color: var(--rell-text-tertiary);
        user-select: none;
        display: inline-flex;
        align-items: center;
        margin-left: ${style.gap};
        margin-right: ${style.gap};
      }

      .breadcrumb-link {
        color: var(--rell-interactive-primary);
        text-decoration: none;
      }

      .breadcrumb-link:hover {
        color: var(--rell-interactive-primary-hover);
        text-decoration: underline;
      }
    `;
  }

  protected render(): void {
    const items = this.getItems();
    const separator = this.getSeparator();

    if (items.length === 0) {
      this.shadow.innerHTML = `
        ${this.createStyles()}
        <nav aria-label="Breadcrumb">
          <slot></slot>
        </nav>
      `;
      return;
    }

    const itemsHTML = items.map((item, index) => {
      const isLast = index === items.length - 1;
      const isActive = item.active !== undefined ? item.active : isLast;

      let itemContent = '';
      if (item.href && !isActive) {
        itemContent = `<a href="${item.href}" class="breadcrumb-link">${item.label}</a>`;
      } else {
        itemContent = `<span class="breadcrumb-item ${isActive ? 'active' : ''}">${item.label}</span>`;
      }

      const separatorHTML = !isLast
        ? `<span class="breadcrumb-separator" aria-hidden="true">${separator}</span>`
        : '';

      return `${itemContent}${separatorHTML}`;
    }).join('');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <nav aria-label="Breadcrumb">
        <ol style="display: flex; align-items: center; flex-wrap: wrap; list-style: none; margin: 0; padding: 0;">
          ${items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isActive = item.active !== undefined ? item.active : isLast;
            return `
              <li style="display: inline-flex; align-items: center;">
                ${item.href && !isActive
                  ? `<a href="${item.href}" class="breadcrumb-link">${item.label}</a>`
                  : `<span class="breadcrumb-item ${isActive ? 'active' : ''}">${item.label}</span>`
                }
                ${!isLast ? `<span class="breadcrumb-separator" aria-hidden="true">${separator}</span>` : ''}
              </li>
            `;
          }).join('')}
        </ol>
      </nav>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-breadcrumbs', RellBreadcrumbs);

