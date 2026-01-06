import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellSlider extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'step', 'disabled', 'show-value', 'marks'];
  }

  private sliderElement?: HTMLInputElement;
  private valueDisplay?: HTMLElement;

  private getValue(): number {
    const value = this.getAttribute('value');
    return value ? parseFloat(value) : this.getMin();
  }

  private getMin(): number {
    const min = this.getAttribute('min');
    return min ? parseFloat(min) : 0;
  }

  private getMax(): number {
    const max = this.getAttribute('max');
    return max ? parseFloat(max) : 100;
  }

  private getStep(): number {
    const step = this.getAttribute('step');
    return step ? parseFloat(step) : 1;
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private showValue(): boolean {
    return this.hasAttribute('show-value');
  }

  private hasMarks(): boolean {
    return this.hasAttribute('marks');
  }

  protected getComponentStyles(): string {
    const value = this.getValue();
    const min = this.getMin();
    const max = this.getMax();
    const percentage = ((value - min) / (max - min)) * 100;

    return `
      :host {
        display: block;
        width: 100%;
        padding: ${spacing[4]} 0;
      }

      .slider-wrapper {
        position: relative;
        width: 100%;
      }

      .slider-track {
        width: 100%;
        height: 4px;
        background-color: var(--rell-surface-base);
        border-radius: ${radius.full};
        position: relative;
        margin: ${spacing[4]} 0;
      }

      .slider-fill {
        height: 100%;
        background-color: var(--rell-interactive-primary);
        border-radius: ${radius.full};
        width: ${percentage}%;
        transition: width 0.2s ease;
      }

      .slider-input {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 4px;
        margin: 0;
        opacity: 0;
        cursor: ${this.isDisabled() ? 'not-allowed' : 'pointer'};
        z-index: 1;
        transform: translateY(-50%);
      }

      .slider-thumb {
        position: absolute;
        top: 50%;
        left: ${percentage}%;
        width: 20px;
        height: 20px;
        background-color: var(--rell-interactive-primary);
        border: 3px solid var(--rell-surface-base);
        border-radius: ${radius.full};
        transform: translate(-50%, -50%);
        transition: all 0.2s ease;
        pointer-events: none;
        box-shadow: var(--rell-shadow-sm);
      }

      .slider-input:hover:not(:disabled) ~ .slider-thumb {
        transform: translate(-50%, -50%) scale(1.1);
      }

      .slider-input:focus ~ .slider-thumb {
        box-shadow: 0 0 0 3px var(--rell-interactive-primary)40, 0 0 12px var(--rell-interactive-primary)20;
      }

      .slider-input:disabled ~ .slider-thumb {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .slider-value {
        position: absolute;
        top: -2rem;
        left: ${percentage}%;
        transform: translateX(-50%);
        background-color: var(--rell-surface-base);
        color: var(--rell-text-primary);
        padding: ${spacing[1]} ${spacing[2]};
        border-radius: ${radius.sm};
        font-size: 0.875rem;
        font-family: var(--rell-font-sans);
        white-space: nowrap;
        box-shadow: var(--rell-shadow-sm);
        pointer-events: none;
      }

      .slider-marks {
        display: flex;
        justify-content: space-between;
        margin-top: ${spacing[2]};
        padding: 0 ${spacing[2]};
      }

      .slider-mark {
        font-size: 0.75rem;
        color: var(--rell-text-tertiary);
        font-family: var(--rell-font-sans);
      }
    `;
  }

  protected render(): void {
    const value = this.getValue();
    const min = this.getMin();
    const max = this.getMax();
    const step = this.getStep();
    const disabled = this.isDisabled();
    const showValue = this.showValue();
    const marks = this.hasMarks();

    const marksHTML = marks ? `
      <div class="slider-marks">
        <span class="slider-mark">${min}</span>
        <span class="slider-mark">${(min + max) / 2}</span>
        <span class="slider-mark">${max}</span>
      </div>
    ` : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="slider-wrapper">
        <div class="slider-track">
          <div class="slider-fill"></div>
          <input 
            type="range"
            class="slider-input"
            min="${min}"
            max="${max}"
            step="${step}"
            value="${value}"
            ${disabled ? 'disabled' : ''}
          />
          <div class="slider-thumb"></div>
          ${showValue ? `<div class="slider-value">${value}</div>` : ''}
        </div>
        ${marksHTML}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const input = this.shadow.querySelector('.slider-input') as HTMLInputElement;
    this.sliderElement = input;

    if (input) {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const newValue = parseFloat(target.value);
        this.setAttribute('value', String(newValue));
        this.render();

        this.dispatchEvent(new CustomEvent('change', {
          detail: { value: newValue },
          bubbles: true,
          composed: true,
        }));
      });
    }
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value' && this.sliderElement) {
      this.sliderElement.value = String(this.getValue());
    }
    this.render();
  }
}

customElements.define('rell-slider', RellSlider);

