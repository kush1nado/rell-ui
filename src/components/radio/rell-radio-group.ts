import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellRadioGroup extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'name', 'orientation', 'gap'];
  }

  private getName(): string {
    const name = this.getAttribute('name');
    if (name) return name;
    
    const generatedName = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
    this.setAttribute('name', generatedName);
    return generatedName;
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  private getGap(): string {
    return this.getAttribute('gap') || spacing[3];
  }

  private getRadios(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-radio'));
  }

  private updateRadios(): void {
    const name = this.getName();
    const value = this.getValue();
    const radios = this.getRadios();

    radios.forEach(radio => {
      radio.setAttribute('name', name);
      const radioValue = radio.getAttribute('value') || '';
      if (radioValue === value) {
        radio.setAttribute('checked', '');
      } else {
        radio.removeAttribute('checked');
      }
    });
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const gap = this.getGap();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .radio-group {
        display: flex;
        flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
        gap: ${gap};
        flex-wrap: ${orientation === 'horizontal' ? 'wrap' : 'nowrap'};
      }
    `;
  }

  protected render(): void {
    this.updateRadios();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="radio-group" role="radiogroup">
        <slot></slot>
      </div>
    `;

    setTimeout(() => {
      const radios = this.getRadios();
      radios.forEach(radio => {
        const existingHandler = (radio as any).__changeHandler;
        if (existingHandler) {
          radio.removeEventListener('change', existingHandler);
        }
        
        const handler = (e: Event) => {
          const customEvent = e as CustomEvent;
          const value = customEvent.detail?.value || radio.getAttribute('value') || '';
          this.setAttribute('value', value);
          this.updateRadios();
          this.dispatchEvent(new CustomEvent('change', {
            detail: { value },
            bubbles: true,
            composed: true,
          }));
        };
        
        (radio as any).__changeHandler = handler;
        radio.addEventListener('change', handler);
      });
    }, 0);
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value' || name === 'name') {
      this.updateRadios();
    } else {
      this.render();
    }
  }
}

customElements.define('rell-radio-group', RellRadioGroup);

