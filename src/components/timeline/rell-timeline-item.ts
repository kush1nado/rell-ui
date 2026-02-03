import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellTimelineItem extends BaseComponent {
  static get observedAttributes() {
    return ['position', 'color', 'size'];
  }

  private getPosition(): string {
    return this.getAttribute('position') || 'left';
  }

  private getColor(): string {
    return this.getAttribute('color') || 'var(--rell-accent-cyan)';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  protected getComponentStyles(): string {
    const position = this.getPosition();
    const color = this.getColor();
    const size = this.getSize();

    const sizeStyles: Record<string, { dot: string; content: string }> = {
      sm: { dot: '12px', content: '0.875rem' },
      md: { dot: '16px', content: '1rem' },
      lg: { dot: '20px', content: '1.125rem' },
    };

    const style = sizeStyles[size] || sizeStyles.md;
    const isLeft = position === 'left';
    const isRight = position === 'right';

    return `
      :host {
        display: flex;
        align-items: flex-start;
        gap: ${spacing[4]};
        position: relative;
        flex-shrink: 0;
        min-width: 0;
      }

      /* Default: vertical timeline with left/right positioning */
      :host {
        ${isLeft ? 'flex-direction: row;' : ''}
        ${isRight ? 'flex-direction: row-reverse;' : ''}
        ${!isLeft && !isRight ? 'flex-direction: row;' : ''}
      }

      .timeline-dot {
        width: ${style.dot};
        height: ${style.dot};
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid var(--rell-bg-primary);
        flex-shrink: 0;
        position: relative;
        z-index: 2;
        box-shadow: ${shadows.md};
      }

      .timeline-content {
        flex: 1;
        font-size: ${style.content};
        color: var(--rell-text-primary);
        font-family: var(--rell-font-sans);
      }

      .timeline-content-wrapper {
        background-color: var(--rell-surface-elevated);
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.md};
        padding: ${spacing[4]};
        box-shadow: ${shadows.sm};
      }

      ::slotted([slot="title"]) {
        display: block;
        font-weight: 600;
        color: var(--rell-text-primary);
        margin-bottom: ${spacing[2]};
        font-size: 1.125em;
      }

      ::slotted([slot="description"]) {
        display: block;
        color: var(--rell-text-secondary);
        line-height: 1.6;
      }

      ::slotted([slot="time"]) {
        display: block;
        font-size: 0.875em;
        color: var(--rell-text-tertiary);
        margin-top: ${spacing[2]};
      }

      /* For horizontal timeline, always use column (cards below dots) */
      :host {
        flex-direction: var(--timeline-item-direction, row);
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-content-wrapper">
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot name="time"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-timeline-item', RellTimelineItem);

