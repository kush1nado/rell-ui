import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellStepper extends BaseComponent {
  static get observedAttributes() {
    return ['current', 'orientation', 'variant'];
  }

  private getCurrent(): number {
    const current = this.getAttribute('current');
    return current ? parseInt(current) : 0;
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'horizontal';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getSteps(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-step'));
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const isVertical = orientation === 'vertical';

    return `
      :host {
        display: block;
        width: 100%;
      }

      .stepper {
        display: flex;
        flex-direction: ${isVertical ? 'column' : 'row'};
        gap: ${isVertical ? spacing[4] : spacing[6]};
        position: relative;
      }

      ${isVertical ? `
        .stepper::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: var(--rell-border-default);
          z-index: 0;
        }
      ` : `
        .stepper::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--rell-border-default);
          z-index: 0;
        }
      `}
    `;
  }

  protected render(): void {
    const current = this.getCurrent();
    const steps = this.getSteps();

    setTimeout(() => {
      steps.forEach((step, index) => {
        step.setAttribute('number', String(index + 1));
        if (index < current) {
          step.setAttribute('status', 'completed');
        } else if (index === current) {
          step.setAttribute('status', 'active');
        } else {
          step.setAttribute('status', 'pending');
        }
      });
    }, 0);

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="stepper">
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(name: string): void {
    if (name === 'current') {
      this.render();
    }
  }
}

customElements.define('rell-stepper', RellStepper);

