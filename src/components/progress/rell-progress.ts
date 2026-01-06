import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellProgress extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'max', 'size', 'variant', 'show-label', 'indeterminate'];
  }

  private getValue(): number {
    const value = this.getAttribute('value');
    return value ? parseFloat(value) : 0;
  }

  private getMax(): number {
    const max = this.getAttribute('max');
    return max ? parseFloat(max) : 100;
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'primary';
  }

  private showLabel(): boolean {
    return this.hasAttribute('show-label');
  }

  private isIndeterminate(): boolean {
    return this.hasAttribute('indeterminate');
  }

  protected getComponentStyles(): string {
    const size = this.getSize();
    const variant = this.getVariant();
    const showLabel = this.showLabel();
    const indeterminate = this.isIndeterminate();

    const sizeStyles: Record<string, { height: string; fontSize: string }> = {
      sm: { height: '4px', fontSize: '0.75rem' },
      md: { height: '8px', fontSize: '0.875rem' },
      lg: { height: '12px', fontSize: '1rem' },
    };

    const variantStyles: Record<string, { color: string; glow?: string }> = {
      primary: { color: 'var(--rell-interactive-primary)' },
      secondary: { color: 'var(--rell-interactive-secondary)' },
      success: { color: 'var(--rell-status-success)' },
      warning: { color: 'var(--rell-status-warning)' },
      error: { color: 'var(--rell-status-error)' },
      info: { color: 'var(--rell-status-info)' },
      glitch: { color: 'var(--rell-accent-cyan)', glow: 'var(--rell-accent-magenta)' },
      cyberpunk: { color: 'var(--rell-accent-yellow)', glow: 'var(--rell-accent-cyan)' },
      jagged: { color: 'var(--rell-interactive-primary)' },
      scanline: { color: 'var(--rell-accent-cyan)' },
      pulse: { color: 'var(--rell-interactive-primary)' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    return `
      :host {
        display: block;
        width: 100%;
      }

      .progress-wrapper {
        display: flex;
        flex-direction: column;
        gap: ${spacing[2]};
        width: 100%;
      }

      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .progress-label {
        font-size: ${style.fontSize};
        font-family: var(--rell-font-sans);
        color: var(--rell-text-primary);
        font-weight: 500;
      }

      .progress-value {
        font-size: ${style.fontSize};
        font-family: var(--rell-font-sans);
        color: var(--rell-text-secondary);
      }

      .progress-bar {
        width: 100%;
        height: ${style.height};
        background-color: var(--rell-surface-base);
        border-radius: ${radius.full};
        overflow: hidden;
        position: relative;
      }

      ${variant === 'pulse' ? `
      .progress-bar {
        overflow: visible;
      }
      ` : ''}

      .progress-fill {
        height: 100%;
        background-color: ${variantStyle.color};
        border-radius: ${radius.full};
        transition: width 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      ${indeterminate ? `
      .progress-fill {
        width: 30%;
        animation: progress-indeterminate 1.5s ease-in-out infinite;
      }

      @keyframes progress-indeterminate {
        0% {
          transform: translateX(-100%);
        }
        50% {
          transform: translateX(400%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      ` : ''}

      .progress-stripes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.1) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.1) 75%,
          transparent 75%,
          transparent
        );
        background-size: 1rem 1rem;
        animation: progress-stripes 1s linear infinite;
      }

      @keyframes progress-stripes {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 1rem 0;
        }
      }

      ${variant === 'glitch' ? `
      .progress-fill {
        background: linear-gradient(90deg, 
          ${variantStyle.color} 0%, 
          ${variantStyle.glow} 50%, 
          ${variantStyle.color} 100%);
        animation: glitch-progress 0.3s ease-in-out infinite;
        box-shadow: 0 0 10px ${variantStyle.color}, 0 0 20px ${variantStyle.glow};
      }

      @keyframes glitch-progress {
        0%, 100% {
          transform: translateX(0);
          filter: hue-rotate(0deg);
        }
        20% {
          transform: translateX(-2px);
          filter: hue-rotate(90deg);
        }
        40% {
          transform: translateX(2px);
          filter: hue-rotate(-90deg);
        }
        60% {
          transform: translateX(-1px);
          filter: hue-rotate(45deg);
        }
        80% {
          transform: translateX(1px);
          filter: hue-rotate(-45deg);
        }
      }

      .progress-fill::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.3) 50%, 
          transparent 100%);
        animation: glitch-scan 1s linear infinite;
      }

      @keyframes glitch-scan {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(200%);
        }
      }
      ` : ''}

      ${variant === 'cyberpunk' ? `
      .progress-fill {
        background: linear-gradient(90deg, 
          var(--rell-accent-yellow) 0%, 
          var(--rell-accent-cyan) 50%, 
          var(--rell-accent-magenta) 100%);
        box-shadow: 
          0 0 10px var(--rell-accent-yellow),
          0 0 20px var(--rell-accent-cyan),
          0 0 30px var(--rell-accent-magenta),
          inset 0 0 10px rgba(0, 255, 255, 0.3);
        animation: cyberpunk-pulse 2s ease-in-out infinite;
      }

      @keyframes cyberpunk-pulse {
        0%, 100% {
          box-shadow: 
            0 0 10px var(--rell-accent-yellow),
            0 0 20px var(--rell-accent-cyan),
            0 0 30px var(--rell-accent-magenta),
            inset 0 0 10px rgba(0, 255, 255, 0.3);
        }
        50% {
          box-shadow: 
            0 0 20px var(--rell-accent-yellow),
            0 0 40px var(--rell-accent-cyan),
            0 0 60px var(--rell-accent-magenta),
            inset 0 0 20px rgba(0, 255, 255, 0.5);
        }
      }

      .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 255, 0.1) 2px,
          rgba(0, 255, 255, 0.1) 4px
        );
        animation: cyberpunk-scan 0.5s linear infinite;
      }

      @keyframes cyberpunk-scan {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      ` : ''}

      ${variant === 'jagged' ? `
      .progress-fill {
        clip-path: polygon(
          0 0,
          calc(100% - 8px) 0,
          100% 50%,
          calc(100% - 8px) 100%,
          0 100%,
          8px 50%
        );
        background: linear-gradient(90deg, 
          ${variantStyle.color} 0%, 
          ${variantStyle.color} 90%,
          transparent 90%,
          transparent 100%);
        position: relative;
      }

      .progress-fill::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 100%;
        background: ${variantStyle.color};
        clip-path: polygon(0 0, 100% 50%, 0 100%);
      }

      .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 100%;
        background: ${variantStyle.color};
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
      }
      ` : ''}

      ${variant === 'scanline' ? `
      .progress-fill {
        background: ${variantStyle.color};
        box-shadow: 0 0 10px ${variantStyle.color};
        position: relative;
        overflow: hidden;
      }

      .progress-fill::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        background: repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 1px,
          rgba(0, 255, 255, 0.5) 1px,
          rgba(0, 255, 255, 0.5) 2px
        );
        background-size: 100% 4px;
        animation: scanline-move 0.2s linear infinite;
      }

      @keyframes scanline-move {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-4px);
        }
      }

      .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        width: 6px;
        height: 100%;
        background: linear-gradient(180deg, 
          transparent 0%,
          rgba(255, 255, 255, 1) 20%,
          rgba(255, 255, 255, 1) 80%,
          transparent 100%);
        box-shadow: 0 0 12px ${variantStyle.color}, 0 0 24px ${variantStyle.color};
        animation: scanline-sweep 1s linear infinite;
      }

      @keyframes scanline-sweep {
        0% {
          left: -6px;
          opacity: 0;
        }
        2% {
          opacity: 1;
        }
        98% {
          opacity: 1;
        }
        100% {
          left: 100%;
          opacity: 0;
        }
      }
      ` : ''}

      ${variant === 'pulse' ? `
      .progress-fill {
        background: ${variantStyle.color};
        animation: pulse-glow 1.5s ease-in-out infinite;
        box-shadow: 0 0 20px ${variantStyle.color};
        position: relative;
        overflow: visible;
      }

      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 20px ${variantStyle.color}, 0 0 40px ${variantStyle.color};
          filter: brightness(1);
        }
        50% {
          box-shadow: 0 0 35px ${variantStyle.color}, 0 0 70px ${variantStyle.color};
          filter: brightness(1.3);
        }
      }

      .progress-fill::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 1) 20%,
          rgba(255, 255, 255, 1) 80%,
          transparent 100%);
        transform: translateY(-50%);
        animation: pulse-wave 1s ease-in-out infinite;
        transform-origin: left center;
        box-shadow: 0 0 10px rgba(255, 255, 255, 1);
      }

      @keyframes pulse-wave {
        0% {
          transform: translateY(-50%) scaleX(0);
          opacity: 0;
        }
        5% {
          opacity: 1;
        }
        95% {
          opacity: 1;
        }
        100% {
          transform: translateY(-50%) scaleX(1);
          opacity: 0;
        }
      }

      .progress-fill::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 24px;
        height: 24px;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.6) 40%,
          transparent 70%
        );
        border-radius: 50%;
        transform: translateY(-50%);
        animation: pulse-dot 1.2s ease-in-out infinite;
        box-shadow: 0 0 15px ${variantStyle.color}, 0 0 30px ${variantStyle.color};
      }

      @keyframes pulse-dot {
        0% {
          left: -12px;
          opacity: 0;
          transform: translateY(-50%) scale(0.3);
        }
        10% {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        90% {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        100% {
          left: 100%;
          opacity: 0;
          transform: translateY(-50%) scale(0.3);
        }
      }
      ` : ''}
    `;
  }

  protected render(): void {
    const value = this.getValue();
    const max = this.getMax();
    const showLabel = this.showLabel();
    const indeterminate = this.isIndeterminate();
    const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="progress-wrapper">
        ${showLabel ? `
        <div class="progress-header">
          <span class="progress-label">
            <slot name="label"></slot>
            <slot></slot>
          </span>
          ${!indeterminate ? `<span class="progress-value">${Math.round(percentage)}%</span>` : ''}
        </div>
        ` : ''}
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${indeterminate ? '30' : percentage}%">
            <div class="progress-stripes"></div>
          </div>
        </div>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-progress', RellProgress);

