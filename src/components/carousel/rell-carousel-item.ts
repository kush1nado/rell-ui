import { BaseComponent } from '../../utils/base-component';
import { radius } from '../../tokens';

export class RellCarouselItem extends BaseComponent {
  protected getComponentStyles(): string {
    return `
      :host {
        display: block;
        width: 100%;
        flex-shrink: 0;
      }

      .carousel-item-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ::slotted(img) {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: ${radius.md};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="carousel-item-content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('rell-carousel-item', RellCarouselItem);

