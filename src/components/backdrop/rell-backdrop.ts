import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellBackdrop extends BaseComponent {
  static get observedAttributes() {
    return ['open', 'blur', 'z-index'];
  }

  private isOpen(): boolean {
    return this.hasAttribute('open');
  }

  private getBlur(): string {
    return this.getAttribute('blur') || '0px';
  }

  private getZIndex(): string {
    return this.getAttribute('z-index') || '1000';
  }

  protected getComponentStyles(): string {
    const open = this.isOpen();
    const blur = this.getBlur();
    const zIndex = this.getZIndex();

    return `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 10, 15, 0.7);
        backdrop-filter: blur(${blur});
        -webkit-backdrop-filter: blur(${blur});
        z-index: ${zIndex};
        display: ${open ? 'block' : 'none'};
        opacity: ${open ? '1' : '0'};
        transition: opacity 0.3s ease;
        pointer-events: ${open ? 'auto' : 'none'};
      }

      .backdrop-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  protected render(): void {
    const open = this.isOpen();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="backdrop-content">
        <slot></slot>
      </div>
    `;

    if (open) {
      const backdrop = this.shadow.querySelector('.backdrop-content');
      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) {
            this.dispatchEvent(new CustomEvent('backdrop-click', {
              bubbles: true,
              composed: true
            }));
          }
        });
      }
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-backdrop', RellBackdrop);

