import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTabs extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'variant', 'size'];
  }

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  private getTabs(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-tab'));
  }

  private getPanels(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-tab-panel'));
  }

  private activateTab(tabValue: string): void {
    const tabs = this.getTabs();
    const panels = this.getPanels();

    tabs.forEach(tab => {
      const value = tab.getAttribute('value') || '';
      if (value === tabValue) {
        tab.setAttribute('active', '');
      } else {
        tab.removeAttribute('active');
      }
    });

    panels.forEach(panel => {
      const value = panel.getAttribute('value') || '';
      if (value === tabValue) {
        panel.setAttribute('active', '');
      } else {
        panel.removeAttribute('active');
      }
    });

    this.setAttribute('value', tabValue);
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: tabValue },
      bubbles: true,
      composed: true,
    }));
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();

    const sizeStyles: Record<string, { fontSize: string; padding: string }> = {
      sm: { fontSize: '0.875rem', padding: `${spacing[2]} ${spacing[3]}` },
      md: { fontSize: '1rem', padding: `${spacing[3]} ${spacing[4]}` },
      lg: { fontSize: '1.125rem', padding: `${spacing[4]} ${spacing[5]}` },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    const variantStyles: Record<string, string> = {
      default: `
        border-bottom: 2px solid var(--rell-border-default);
      `,
      pills: `
        gap: ${spacing[2]};
      `,
      underline: `
        border-bottom: 2px solid var(--rell-border-default);
      `,
    };

    return `
      :host {
        display: block;
        width: 100%;
      }

      .tabs-container {
        display: flex;
        flex-direction: column;
      }

      .tabs-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        ${variantStyles[variant] || variantStyles.default}
      }

      .tabs-content {
        margin-top: ${spacing[4]};
      }

      ::slotted(rell-tab) {
        font-size: ${style.fontSize};
        padding: ${style.padding};
      }
    `;
  }

  protected render(): void {
    const tabs = this.getTabs();
    const panels = this.getPanels();
    const currentValue = this.getValue();

    if (tabs.length > 0 && !currentValue) {
      const firstTab = tabs[0];
      const firstValue = firstTab.getAttribute('value') || '';
      if (firstValue) {
        this.activateTab(firstValue);
      }
    } else if (currentValue) {
      this.activateTab(currentValue);
    }

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="tabs-container">
        <ul class="tabs-list" role="tablist">
          <slot name="tabs"></slot>
        </ul>
        <div class="tabs-content">
          <slot name="panels"></slot>
        </div>
      </div>
    `;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const value = tab.getAttribute('value') || '';
        if (value) {
          this.activateTab(value);
        }
      });
    });
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      const value = this.getValue();
      if (value) {
        this.activateTab(value);
      }
    } else {
      this.render();
    }
  }
}

customElements.define('rell-tabs', RellTabs);

