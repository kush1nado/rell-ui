import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellRating extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'max', 'size', 'readonly', 'allow-half', 'disabled'];
  }

  private rating: number = 0;
  private hoverRating: number = 0;

  private getValue(): number {
    const value = this.getAttribute('value');
    return value ? parseFloat(value) : 0;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.rating = this.getValue();
  }

  private getMax(): number {
    const max = this.getAttribute('max');
    return max ? parseInt(max) : 5;
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private isReadonly(): boolean {
    return this.hasAttribute('readonly');
  }

  private allowHalf(): boolean {
    return this.hasAttribute('allow-half');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  protected getComponentStyles(): string {
    const size = this.getSize();

    const sizeStyles: Record<string, { fontSize: string; gap: string }> = {
      sm: { fontSize: '1rem', gap: spacing[1] },
      md: { fontSize: '1.5rem', gap: spacing[2] },
      lg: { fontSize: '2rem', gap: spacing[3] },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${style.gap};
      }

      .rating-wrapper {
        display: inline-flex;
        align-items: center;
        gap: ${style.gap};
      }

      .rating-star {
        font-size: ${style.fontSize};
        color: var(--rell-text-tertiary);
        cursor: ${this.isReadonly() || this.isDisabled() ? 'default' : 'pointer'};
        transition: color 0.2s, transform 0.1s;
        user-select: none;
        position: relative;
        line-height: 1;
      }

      .rating-star.active {
        color: var(--rell-status-warning);
      }

      .rating-star:hover:not(.readonly):not(.disabled) {
        transform: scale(1.1);
      }

      .rating-star.readonly,
      .rating-star.disabled {
        cursor: not-allowed;
        opacity: ${this.isDisabled() ? '0.5' : '1'};
      }

      .rating-star.half {
        position: relative;
      }

      .rating-star.half::before {
        content: '★';
        position: absolute;
        left: 0;
        width: 50%;
        overflow: hidden;
        color: var(--rell-status-warning);
      }
    `;
  }

  protected render(): void {
    const max = this.getMax();
    const readonly = this.isReadonly();
    const disabled = this.isDisabled();
    const allowHalf = this.allowHalf();
    const currentRating = this.hoverRating || this.rating;

    const stars = Array.from({ length: max }, (_, i) => {
      const index = i + 1;
      const isActive = index <= currentRating;
      const isHalf = allowHalf && currentRating >= index - 0.5 && currentRating < index;

      return `
        <span 
          class="rating-star ${isActive ? 'active' : ''} ${isHalf ? 'half' : ''} ${readonly ? 'readonly' : ''} ${disabled ? 'disabled' : ''}"
          data-rating="${index}"
          data-half="${index - 0.5}"
        >
          ★
        </span>
      `;
    }).join('');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="rating-wrapper">
        ${stars}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const stars = this.shadow.querySelectorAll('.rating-star');

    if (!this.isReadonly() && !this.isDisabled()) {
      stars.forEach(star => {
        star.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const rating = target.getAttribute('data-rating');
          if (rating) {
            this.rating = parseFloat(rating);
            this.setAttribute('value', String(this.rating));
            this.hoverRating = 0;
            this.render();

            this.dispatchEvent(new CustomEvent('change', {
              detail: { value: this.rating },
              bubbles: true,
              composed: true,
            }));
          }
        });

        if (this.allowHalf()) {
          star.addEventListener('mousemove', (e) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const half = x < rect.width / 2;
            const rating = half 
              ? parseFloat(target.getAttribute('data-half') || '0')
              : parseFloat(target.getAttribute('data-rating') || '0');
            
            this.hoverRating = rating;
            this.render();
          });

          star.addEventListener('click', (e) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const half = x < rect.width / 2;
            const rating = half 
              ? parseFloat(target.getAttribute('data-half') || '0')
              : parseFloat(target.getAttribute('data-rating') || '0');
            
            this.rating = rating;
            this.setAttribute('value', String(this.rating));
            this.hoverRating = 0;
            this.render();

            this.dispatchEvent(new CustomEvent('change', {
              detail: { value: this.rating },
              bubbles: true,
              composed: true,
            }));
          });
        } else {
          star.addEventListener('mouseenter', () => {
            const rating = parseFloat(star.getAttribute('data-rating') || '0');
            this.hoverRating = rating;
            this.render();
          });
        }
      });

      this.shadow.addEventListener('mouseleave', () => {
        this.hoverRating = 0;
        this.render();
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      this.rating = this.getValue();
    }
    this.render();
  }
}

customElements.define('rell-rating', RellRating);

