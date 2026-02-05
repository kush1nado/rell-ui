import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellAvatar extends BaseComponent {
  static get observedAttributes() {
    return ['src', 'alt', 'size', 'variant', 'fallback', 'gradient'];
  }

  private getSrc(): string {
    return this.getAttribute('src') || '';
  }

  private getAlt(): string {
    return this.getAttribute('alt') || '';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'circle';
  }

  private getFallback(): string {
    return this.getAttribute('fallback') || '';
  }

  private getGradient(): string {
    return this.getAttribute('gradient') || '';
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const variant = this.getVariant();
    const gradient = this.getGradient();

    const sizeStyles: Record<string, { size: string; fontSize: string }> = {
      sm: { size: '32px', fontSize: '0.875rem' },
      md: { size: '40px', fontSize: '1rem' },
      lg: { size: '56px', fontSize: '1.5rem' },
      xl: { size: '80px', fontSize: '2rem' },
    };

    const gradientMap: Record<string, string> = {
      'cyan-magenta': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta))',
      'cyan-magenta-pink': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta), var(--rell-accent-pink))',
      'magenta-pink': 'linear-gradient(135deg, var(--rell-accent-magenta), var(--rell-accent-pink))',
      'cyan-green': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-green))',
      'pink-yellow': 'linear-gradient(135deg, var(--rell-accent-pink), var(--rell-accent-yellow))',
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const borderRadius = variant === 'circle' ? radius.full : radius.md;
    const fallbackGradient = gradient ? (gradientMap[gradient] || gradient) : 'linear-gradient(135deg, var(--rell-interactive-primary), var(--rell-interactive-secondary))';

    return `
      :host {
        display: inline-block;
      }

      .avatar {
        width: ${style.size};
        height: ${style.size};
        border-radius: ${borderRadius};
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        overflow: visible;
        flex-shrink: 0;
        position: relative;
      }
      
      .avatar-inner {
        width: 100%;
        height: 100%;
        border-radius: ${borderRadius};
        overflow: hidden;
        position: relative;
      }

      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${borderRadius};
        display: block;
      }

      .avatar-fallback {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--rell-font-sans);
        font-size: ${style.fontSize};
        font-weight: 600;
        color: var(--rell-text-primary);
        background: ${fallbackGradient};
        border-radius: ${borderRadius};
      }

      ::slotted([slot="badge"]) {
        position: absolute;
        bottom: -2px;
        right: -2px;
        z-index: 1;
        transform: scale(0.7);
        transform-origin: bottom right;
      }
      
      ::slotted([slot="badge"] rell-badge) {
        font-size: 0.625rem;
        padding: 2px 4px;
        min-width: 12px;
        height: 12px;
        line-height: 1;
      }
      
      ::slotted([slot="badge"] rell-badge[dot]) {
        width: 8px;
        height: 8px;
        min-width: 8px;
        padding: 0;
      }
    `;
  }

  protected render(): void {
    const src = this.getSrc();
    const alt = this.getAlt();
    const fallback = this.getFallback();

    const fallbackText = fallback || (alt ? alt.charAt(0).toUpperCase() : '?');

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="avatar">
        <div class="avatar-inner">
          ${src ? `<img class="avatar-image" src="${src}" alt="${alt}" />` : ''}
          <div class="avatar-fallback" ${src ? 'style="display: none;"' : ''}>${fallbackText}</div>
        </div>
        <slot name="badge"></slot>
      </div>
    `;

    if (src) {
      const img = this.shadow.querySelector('.avatar-image') as HTMLImageElement;
      const fallbackEl = this.shadow.querySelector('.avatar-fallback') as HTMLElement;
      
      if (img && fallbackEl) {
        img.addEventListener('error', () => {
          img.style.display = 'none';
          fallbackEl.style.display = 'flex';
        });
        
        img.addEventListener('load', () => {
          img.style.display = 'block';
          fallbackEl.style.display = 'none';
        });
      }
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-avatar', RellAvatar);

