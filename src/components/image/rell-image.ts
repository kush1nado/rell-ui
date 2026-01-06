import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellImage extends BaseComponent {
  static get observedAttributes() {
    return ['src', 'alt', 'width', 'height', 'fit', 'lazy', 'fallback', 'placeholder', 'radius'];
  }

  private imageElement?: HTMLImageElement;
  private isLoading: boolean = true;
  private hasError: boolean = false;

  private getSrc(): string {
    return this.getAttribute('src') || '';
  }

  private getAlt(): string {
    return this.getAttribute('alt') || '';
  }

  private getWidth(): string {
    return this.getAttribute('width') || 'auto';
  }

  private getHeight(): string {
    return this.getAttribute('height') || 'auto';
  }

  private getFit(): string {
    return this.getAttribute('fit') || 'cover';
  }

  private isLazy(): boolean {
    return this.hasAttribute('lazy');
  }

  private getFallback(): string {
    return this.getAttribute('fallback') || '';
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || '';
  }

  private getRadius(): string {
    return this.getAttribute('radius') || '0';
  }

  protected getComponentStyles(): string {
    const width = this.getWidth();
    const height = this.getHeight();
    const fit = this.getFit();
    const radius = this.getRadius();

    return `
      :host {
        display: inline-block;
        position: relative;
        width: ${width === 'auto' ? '100%' : width};
        height: ${height === 'auto' ? 'auto' : height};
        overflow: hidden;
        border-radius: ${radius};
      }

      .image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: var(--rell-surface-base);
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: ${fit};
        display: ${this.isLoading ? 'none' : 'block'};
        border-radius: ${radius};
        transition: opacity 0.3s ease;
      }

      .image.loaded {
        opacity: 1;
      }

      .image-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: ${this.isLoading ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        background-color: var(--rell-surface-base);
        color: var(--rell-text-tertiary);
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
      }

      .image-error {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: ${this.hasError ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        background-color: var(--rell-surface-base);
        color: var(--rell-text-tertiary);
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        flex-direction: column;
        gap: ${spacing[2]};
      }

      .image-error-icon {
        font-size: 2rem;
        opacity: 0.5;
      }
    `;
  }

  protected render(): void {
    const src = this.getSrc();
    const alt = this.getAlt();
    const lazy = this.isLazy();
    const fallback = this.getFallback();
    const placeholder = this.getPlaceholder();

    const placeholderText = placeholder || 'Loading...';
    const errorText = fallback ? '' : 'Failed to load image';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="image-wrapper">
        ${src ? `
          <img 
            class="image"
            src="${src}"
            alt="${alt}"
            ${lazy ? 'loading="lazy"' : ''}
          />
        ` : ''}
        <div class="image-placeholder">
          ${placeholderText}
        </div>
        <div class="image-error">
          <div class="image-error-icon">🖼️</div>
          <div>${errorText}</div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const img = this.shadow.querySelector('.image') as HTMLImageElement;
    this.imageElement = img;

    if (img) {
      // Check if image is already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        this.isLoading = false;
        this.hasError = false;
        img.classList.add('loaded');
        this.render();
      }

      img.addEventListener('load', () => {
        this.isLoading = false;
        this.hasError = false;
        img.classList.add('loaded');
        this.render();

        this.dispatchEvent(new CustomEvent('load', {
          bubbles: true,
          composed: true,
        }));
      });

      img.addEventListener('error', () => {
        this.isLoading = false;
        this.hasError = true;
        
        const fallback = this.getFallback();
        if (fallback && img.src !== fallback) {
          img.src = fallback;
          this.hasError = false;
        } else {
          this.render();
        }

        this.dispatchEvent(new CustomEvent('error', {
          bubbles: true,
          composed: true,
        }));
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'src' && this.imageElement) {
      this.isLoading = true;
      this.hasError = false;
      this.imageElement.src = this.getSrc();
      this.render();
    } else if (name === 'fallback' && this.hasError && this.imageElement) {
      const fallback = this.getFallback();
      if (fallback) {
        this.imageElement.src = fallback;
        this.hasError = false;
      }
    } else {
      this.render();
    }
  }
}

customElements.define('rell-image', RellImage);

