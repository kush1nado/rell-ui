import { BaseComponent } from '../../utils/base-component';
import { spacing } from '../../tokens';

export class RellCheckboxGroup extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'orientation', 'gap'];
  }

  private getValue(): string[] {
    const value = this.getAttribute('value');
    if (!value) return [];
    
    try {
      return JSON.parse(value);
    } catch {
      return value.split(',').filter(Boolean);
    }
  }

  private getOrientation(): string {
    return this.getAttribute('orientation') || 'vertical';
  }

  private getGap(): string {
    return this.getAttribute('gap') || spacing[3];
  }

  private getCheckboxes(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-checkbox'));
  }

  private updateCheckboxes(): void {
    const values = this.getValue();
    const checkboxes = this.getCheckboxes();

    checkboxes.forEach(checkbox => {
      const value = checkbox.getAttribute('value') || '';
      if (values.includes(value)) {
        checkbox.setAttribute('checked', '');
      } else {
        checkbox.removeAttribute('checked');
      }
    });
  }

  private updateValue(): void {
    const checkboxes = this.getCheckboxes();
    const checkedValues = checkboxes
      .filter(cb => cb.hasAttribute('checked'))
      .map(cb => cb.getAttribute('value') || '')
      .filter(Boolean);

    const valueStr = JSON.stringify(checkedValues);
    this.setAttribute('value', valueStr);
  }

  protected getComponentStyles(): string {
    const orientation = this.getOrientation();
    const gap = this.getGap();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .checkbox-group {
        display: flex;
        flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
        gap: ${gap};
        flex-wrap: ${orientation === 'horizontal' ? 'wrap' : 'nowrap'};
      }
    `;
  }

  protected render(): void {
    this.updateCheckboxes();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="checkbox-group" role="group">
        <slot></slot>
      </div>
    `;

    setTimeout(() => {
      const checkboxes = this.getCheckboxes();
      checkboxes.forEach(checkbox => {
        const existingHandler = (checkbox as any).__changeHandler;
        if (existingHandler) {
          checkbox.removeEventListener('change', existingHandler);
        }
        
        const handler = () => {
          this.updateValue();
          const values = this.getValue();
          this.dispatchEvent(new CustomEvent('change', {
            detail: { value: values },
            bubbles: true,
            composed: true,
          }));
        };
        
        (checkbox as any).__changeHandler = handler;
        checkbox.addEventListener('change', handler);
      });
    }, 0);
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      this.updateCheckboxes();
    } else {
      this.render();
    }
  }
}

customElements.define('rell-checkbox-group', RellCheckboxGroup);

