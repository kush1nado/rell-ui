import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTimeline extends BaseComponent {
  static get observedAttributes() {
    return ['orientation', 'variant', 'alternate'];
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private isAlternate(): boolean {
    return this.hasAttribute('alternate');
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const isVertical = orientation === 'vertical';
    const alternate = this.isAlternate();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .timeline {
        display: flex;
        flex-direction: ${isVertical ? 'column' : 'row'};
        position: relative;
        padding: ${spacing[4]} 0;
        --timeline-orientation: ${orientation};
      }

      ${isVertical ? `
        .timeline::before {
          content: '';
          position: absolute;
          left: ${alternate ? '50%' : '20px'};
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: var(--rell-border-default);
          transform: ${alternate ? 'translateX(-50%)' : 'none'};
          z-index: 0;
        }
      ` : `
        .timeline::before {
          content: '';
          position: absolute;
          top: ${alternate ? '50%' : '20px'};
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--rell-border-default);
          transform: ${alternate ? 'translateY(-50%)' : 'none'};
          z-index: 0;
        }
      `}

      ::slotted(rell-timeline-item) {
        position: relative;
        z-index: 1;
        ${isVertical ? 'margin-bottom: ' + spacing[6] + ';' : 'margin-right: ' + spacing[6] + '; flex-shrink: 0;'}
        ${!isVertical ? '--timeline-item-direction: column; align-items: center;' : ''}
      }

      ::slotted(rell-timeline-item:last-child) {
        ${isVertical ? 'margin-bottom: 0;' : 'margin-right: 0;'}
      }

      ${!isVertical ? `
        .timeline {
          overflow-x: auto;
        }
        ::slotted(rell-timeline-item) {
          min-width: 200px;
          margin-top: ${spacing[6]};
        }
      ` : ''}
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="timeline">
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-timeline', RellTimeline);

