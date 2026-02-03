import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellColorPicker extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'format', 'show-alpha', 'presets'];
  }

  private colorInput: HTMLInputElement | null = null;
  private isOpen = false;

  private getValue(): string {
    return this.getAttribute('value') || '#00ffff';
  }

  private getFormat(): string {
    return this.getAttribute('format') || 'hex';
  }

  private showAlpha(): boolean {
    return this.hasAttribute('show-alpha');
  }

  private getPresets(): string[] {
    const presets = this.getAttribute('presets');
    if (!presets) {
      return [
        '#00ffff', '#ff00ff', '#ffff00', '#00ff00',
        '#ff0000', '#0000ff', '#ffffff', '#000000',
        '#ffa500', '#800080', '#ffc0cb', '#a52a2a'
      ];
    }
    return presets.split(',').map(c => c.trim());
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  protected getComponentStyles(): string {
    return `
      :host {
        display: inline-block;
        position: relative;
      }

      .color-picker-trigger {
        width: 40px;
        height: 40px;
        border-radius: ${radius.md};
        border: 2px solid var(--rell-border-default);
        cursor: pointer;
        background-color: ${this.getValue()};
        transition: all 0.2s ease;
        box-shadow: ${shadows.sm};
      }

      .color-picker-trigger:hover {
        border-color: var(--rell-accent-cyan);
        transform: scale(1.05);
        box-shadow: ${shadows.md};
      }

      .color-picker-popup {
        position: absolute;
        top: calc(100% + ${spacing[2]});
        left: 0;
        z-index: 10000;
        background-color: var(--rell-surface-elevated);
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.lg};
        padding: ${spacing[4]};
        box-shadow: ${shadows.xl};
        min-width: 280px;
        max-width: 320px;
        box-sizing: border-box;
        opacity: 0;
        transform: scale(0.95);
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .color-picker-popup.open {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }

      .color-picker-presets {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: ${spacing[2]};
        margin-bottom: ${spacing[4]};
        width: 100%;
        box-sizing: border-box;
      }

      .color-picker-preset {
        width: 100%;
        aspect-ratio: 1;
        border-radius: ${radius.sm};
        border: 2px solid var(--rell-border-default);
        cursor: pointer;
        transition: all 0.2s ease;
        box-sizing: border-box;
        min-width: 0;
      }

      .color-picker-preset:hover {
        transform: scale(1.1);
        border-color: var(--rell-accent-cyan);
        box-shadow: ${shadows.md};
      }

      .color-picker-inputs {
        display: flex;
        flex-direction: column;
        gap: ${spacing[3]};
      }

      .color-picker-input-group {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .color-picker-input-group label {
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        min-width: 40px;
        font-family: var(--rell-font-sans);
      }

      .color-picker-input-group input {
        flex: 1;
        padding: ${spacing[2]} ${spacing[3]};
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        background-color: var(--rell-surface-base);
        color: var(--rell-text-primary);
        font-family: var(--rell-font-mono);
        font-size: 0.875rem;
        transition: border-color 0.2s ease;
      }

      .color-picker-input-group input:focus {
        outline: none;
        border-color: var(--rell-accent-cyan);
      }

      .color-picker-preview {
        width: 100%;
        height: 60px;
        border-radius: ${radius.md};
        border: 2px solid var(--rell-border-default);
        margin-bottom: ${spacing[4]};
        background-color: ${this.getValue()};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="color-picker-trigger" role="button" tabindex="0" aria-label="Color picker"></div>
      <div class="color-picker-popup">
        <div class="color-picker-preview"></div>
        <div class="color-picker-presets"></div>
        <div class="color-picker-inputs">
          <div class="color-picker-input-group">
            <label>HEX</label>
            <input type="text" class="color-input-hex" value="${this.getValue()}" />
          </div>
          <div class="color-picker-input-group">
            <label>R</label>
            <input type="number" class="color-input-r" min="0" max="255" value="0" />
          </div>
          <div class="color-picker-input-group">
            <label>G</label>
            <input type="number" class="color-input-g" min="0" max="255" value="255" />
          </div>
          <div class="color-picker-input-group">
            <label>B</label>
            <input type="number" class="color-input-b" min="0" max="255" value="255" />
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.updateFromValue(this.getValue());
  }

  private setupEventListeners(): void {
    const trigger = this.shadow.querySelector('.color-picker-trigger') as HTMLElement;
    const popup = this.shadow.querySelector('.color-picker-popup') as HTMLElement;
    const hexInput = this.shadow.querySelector('.color-input-hex') as HTMLInputElement;
    const rInput = this.shadow.querySelector('.color-input-r') as HTMLInputElement;
    const gInput = this.shadow.querySelector('.color-input-g') as HTMLInputElement;
    const bInput = this.shadow.querySelector('.color-input-b') as HTMLInputElement;
    const presetsContainer = this.shadow.querySelector('.color-picker-presets') as HTMLElement;
    const preview = this.shadow.querySelector('.color-picker-preview') as HTMLElement;

    // Toggle popup
    trigger.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      popup.classList.toggle('open', this.isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.contains(e.target as Node) && !this.shadow.contains(e.target as Node)) {
        this.isOpen = false;
        popup.classList.remove('open');
      }
    });

    // Presets
    const presets = this.getPresets();
    presets.forEach(preset => {
      const presetEl = document.createElement('div');
      presetEl.className = 'color-picker-preset';
      presetEl.style.backgroundColor = preset;
      presetEl.addEventListener('click', () => {
        this.setValue(preset);
      });
      presetsContainer.appendChild(presetEl);
    });

    // Hex input
    hexInput.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        this.setValue(value);
      }
    });

    // RGB inputs
    [rInput, gInput, bInput].forEach((input, index) => {
      input.addEventListener('input', () => {
        const r = parseInt(rInput.value) || 0;
        const g = parseInt(gInput.value) || 0;
        const b = parseInt(bInput.value) || 0;
        const hex = this.rgbToHex(r, g, b);
        this.setValue(hex);
      });
    });

    // Update preview
    const updatePreview = () => {
      const value = this.getValue();
      preview.style.backgroundColor = value;
      trigger.style.backgroundColor = value;
    };

    this.addEventListener('value-change', updatePreview);
  }

  private updateFromValue(value: string): void {
    const rgb = this.hexToRgb(value);
    const hexInput = this.shadow.querySelector('.color-input-hex') as HTMLInputElement;
    const rInput = this.shadow.querySelector('.color-input-r') as HTMLInputElement;
    const gInput = this.shadow.querySelector('.color-input-g') as HTMLInputElement;
    const bInput = this.shadow.querySelector('.color-input-b') as HTMLInputElement;
    const preview = this.shadow.querySelector('.color-picker-preview') as HTMLElement;
    const trigger = this.shadow.querySelector('.color-picker-trigger') as HTMLElement;

    if (rgb) {
      hexInput.value = value;
      rInput.value = String(rgb.r);
      gInput.value = String(rgb.g);
      bInput.value = String(rgb.b);
      preview.style.backgroundColor = value;
      trigger.style.backgroundColor = value;
    }
  }

  private setValue(value: string): void {
    this.setAttribute('value', value);
    this.updateFromValue(value);
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value }
    }));
    this.dispatchEvent(new CustomEvent('value-change', {
      bubbles: true,
      composed: true,
      detail: { value }
    }));
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'value' && oldValue !== newValue) {
      this.updateFromValue(newValue);
    }
  }
}

customElements.define('rell-color-picker', RellColorPicker);

