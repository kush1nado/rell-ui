import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellCarousel extends BaseComponent {
  static get observedAttributes() {
    return ['autoplay', 'interval', 'loop', 'show-dots', 'show-arrows', 'transition'];
  }

  private currentIndex = 0;
  private items: HTMLElement[] = [];
  private autoplayInterval: number | null = null;
  private touchStartX = 0;
  private touchEndX = 0;

  private isAutoplay(): boolean {
    return this.hasAttribute('autoplay');
  }

  private getInterval(): number {
    const interval = this.getAttribute('interval');
    return interval ? parseInt(interval, 10) : 3000;
  }

  private isLoop(): boolean {
    return this.hasAttribute('loop');
  }

  private showDots(): boolean {
    return this.hasAttribute('show-dots');
  }

  private showArrows(): boolean {
    const showArrows = this.getAttribute('show-arrows');
    return showArrows !== 'false';
  }

  private getTransition(): string {
    return this.getAttribute('transition') || 'slide';
  }

  protected getComponentStyles(): string {
    const showDots = this.showDots();
    const showArrows = this.showArrows();

    return `
      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .carousel-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        border-radius: ${radius.md};
      }

      .carousel-track {
        display: flex;
        transition: transform 0.5s ease;
        will-change: transform;
      }

      .carousel-item {
        flex: 0 0 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      .carousel-item.active {
        opacity: 1;
      }

      .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--rell-surface-elevated);
        border: 2px solid var(--rell-border-default);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.2s ease;
        color: var(--rell-text-primary);
        font-size: 1.2rem;
        user-select: none;
      }

      .carousel-arrow:hover {
        background-color: var(--rell-surface-hover);
        border-color: var(--rell-accent-cyan);
        transform: translateY(-50%) scale(1.1);
      }

      .carousel-arrow.prev {
        left: ${spacing[4]};
      }

      .carousel-arrow.next {
        right: ${spacing[4]};
      }

      .carousel-arrow:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .carousel-arrow:disabled:hover {
        transform: translateY(-50%);
      }

      ${showArrows ? '' : `
        .carousel-arrow {
          display: none;
        }
      `}

      .carousel-dots {
        display: flex;
        justify-content: center;
        gap: ${spacing[2]};
        margin-top: ${spacing[4]};
        padding: ${spacing[2]};
      }

      ${showDots ? '' : `
        .carousel-dots {
          display: none;
        }
      `}

      .carousel-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--rell-border-default);
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        padding: 0;
      }

      .carousel-dot.active {
        background-color: var(--rell-accent-cyan);
        transform: scale(1.2);
      }

      .carousel-dot:hover {
        background-color: var(--rell-accent-cyan);
        opacity: 0.7;
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="carousel-container">
        ${this.showArrows() ? `
          <button class="carousel-arrow prev" aria-label="Previous">‹</button>
          <button class="carousel-arrow next" aria-label="Next">›</button>
        ` : ''}
        <div class="carousel-track">
          <slot></slot>
        </div>
        ${this.showDots() ? '<div class="carousel-dots"></div>' : ''}
      </div>
    `;

    this.setupCarousel();
  }

  private setupCarousel(): void {
    const slot = this.shadow.querySelector('slot') as HTMLSlotElement;
    const track = this.shadow.querySelector('.carousel-track') as HTMLElement;
    const dotsContainer = this.shadow.querySelector('.carousel-dots') as HTMLElement;
    const prevArrow = this.shadow.querySelector('.carousel-arrow.prev') as HTMLElement;
    const nextArrow = this.shadow.querySelector('.carousel-arrow.next') as HTMLElement;

    const updateItems = () => {
      const assignedNodes = slot.assignedNodes();
      this.items = assignedNodes.filter(
        (node): node is HTMLElement => node instanceof HTMLElement && node.tagName === 'RELL-CAROUSEL-ITEM'
      );

      this.items.forEach((item, index) => {
        item.classList.toggle('active', index === this.currentIndex);
      });

      this.updateDots();
      this.updateArrows();
    };

    slot.addEventListener('slotchange', updateItems);
    updateItems();

    if (prevArrow) {
      prevArrow.addEventListener('click', () => this.prev());
    }

    if (nextArrow) {
      nextArrow.addEventListener('click', () => this.next());
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        const dot = (e.target as HTMLElement).closest('.carousel-dot');
        if (dot) {
          const index = Array.from(dotsContainer.children).indexOf(dot);
          this.goTo(index);
        }
      });
    }

    // Touch support
    track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    // Keyboard support
    this.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    this.setAttribute('tabindex', '0');

    if (this.isAutoplay()) {
      this.startAutoplay();
    }
  }

  private updateDots(): void {
    const dotsContainer = this.shadow.querySelector('.carousel-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === this.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dotsContainer.appendChild(dot);
    });
  }

  private updateArrows(): void {
    const prevArrow = this.shadow.querySelector('.carousel-arrow.prev') as HTMLElement;
    const nextArrow = this.shadow.querySelector('.carousel-arrow.next') as HTMLElement;

    if (!this.isLoop()) {
      if (prevArrow && 'disabled' in prevArrow) {
        (prevArrow as HTMLButtonElement).disabled = this.currentIndex === 0;
      }
      if (nextArrow && 'disabled' in nextArrow) {
        (nextArrow as HTMLButtonElement).disabled = this.currentIndex === this.items.length - 1;
      }
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  public next(): void {
    if (this.items.length === 0) return;

    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else if (this.isLoop()) {
      this.currentIndex = 0;
    } else {
      return;
    }

    this.updateSlide();
  }

  public prev(): void {
    if (this.items.length === 0) return;

    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.isLoop()) {
      this.currentIndex = this.items.length - 1;
    } else {
      return;
    }

    this.updateSlide();
  }

  public goTo(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.updateSlide();
    }
  }

  private updateSlide(): void {
    this.items.forEach((item, index) => {
      item.classList.toggle('active', index === this.currentIndex);
    });

    this.updateDots();
    this.updateArrows();

    this.dispatchEvent(new CustomEvent('slide-change', {
      bubbles: true,
      composed: true,
      detail: { index: this.currentIndex }
    }));
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayInterval = window.setInterval(() => {
      this.next();
    }, this.getInterval());
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'autoplay') {
      if (this.isAutoplay()) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    } else if (name === 'interval' && this.isAutoplay()) {
      this.startAutoplay();
    }
  }

  disconnectedCallback(): void {
    this.stopAutoplay();
  }
}

customElements.define('rell-carousel', RellCarousel);

