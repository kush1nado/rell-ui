import { BaseComponent } from '../../utils/base-component';

export class RellSvg extends BaseComponent {
  static get observedAttributes() {
    return ['name', 'size', 'color', 'viewBox', 'width', 'height'];
  }

  private getName(): string {
    return this.getAttribute('name') || '';
  }

  private getSize(): string {
    return this.getAttribute('size') || '24px';
  }

  private getColor(): string {
    return this.getAttribute('color') || 'currentColor';
  }

  private getViewBox(): string {
    return this.getAttribute('viewBox') || '0 0 24 24';
  }

  private getWidth(): string {
    return this.getAttribute('width') || this.getSize();
  }

  private getHeight(): string {
    return this.getAttribute('height') || this.getSize();
  }

  private getSvgContent(): string {
    const name = this.getName();
    const slot = this.querySelector('[slot="content"]');
    
    if (slot) {
      return slot.innerHTML;
    }

    // Built-in icons
    const icons: Record<string, string> = {
      'search': '<path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"/>',
      'close': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
      'chevron-up': '<polyline points="18 15 12 9 6 15"/>',
      'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
      'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
      'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
      'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
      'check': '<polyline points="20 6 9 17 4 12"/>',
      'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      'minus': '<line x1="5" y1="12" x2="19" y2="12"/>',
      'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
      'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>',
      'menu': '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
      'bell': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
      'info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
      'alert': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
      'success': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    };

    return icons[name] || '';
  }

  protected getComponentStyles(): string {
    const width = this.getWidth();
    const height = this.getHeight();
    const color = this.getColor();

    return `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${width};
        height: ${height};
        flex-shrink: 0;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: ${color};
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      svg[fill="true"] {
        fill: ${color};
        stroke: none;
      }
    `;
  }

  protected render(): void {
    const viewBox = this.getViewBox();
    const content = this.getSvgContent();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="${viewBox}"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        ${content}
      </svg>
      <slot name="content"></slot>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-svg', RellSvg);

