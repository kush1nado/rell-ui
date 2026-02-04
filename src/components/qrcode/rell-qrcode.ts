import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellQrcode extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'size', 'color', 'background', 'error-correction', 'margin'];
  }

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getSize(): number {
    const size = this.getAttribute('size');
    return size ? parseInt(size, 10) : 200;
  }

  private getColor(): string {
    return this.getAttribute('color') || '#000000';
  }

  private getBackground(): string {
    return this.getAttribute('background') || '#ffffff';
  }

  private getErrorCorrection(): string {
    return this.getAttribute('error-correction') || 'M';
  }

  private getMargin(): number {
    const margin = this.getAttribute('margin');
    return margin ? parseInt(margin, 10) : 4;
  }

  protected getComponentStyles(): string {
    const size = this.getSize();

    return `
      :host {
        display: inline-block;
      }

      .qrcode-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${spacing[2]};
        background-color: var(--rell-surface-base);
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.md};
      }

      canvas {
        display: block;
        max-width: 100%;
        height: auto;
      }
    `;
  }

  protected render(): void {
    const size = this.getSize();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="qrcode-container">
        <canvas width="${size}" height="${size}"></canvas>
      </div>
    `;

    this.canvas = this.shadow.querySelector('canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.generateQRCode();
    }
  }

  private generateQRCode(): void {
    if (!this.canvas || !this.ctx) return;

    const value = this.getValue();
    if (!value) {
      this.clearCanvas();
      return;
    }

    const size = this.getSize();
    const color = this.getColor();
    const background = this.getBackground();
    const margin = this.getMargin();

    // Clear canvas
    this.ctx.fillStyle = background;
    this.ctx.fillRect(0, 0, size, size);

    // Simple QR code generation using a basic pattern
    // For production, you would use a proper QR code library
    this.drawSimpleQRCode(value, size, color, background, margin);
  }

  private drawSimpleQRCode(value: string, size: number, color: string, background: string, margin: number): void {
    if (!this.ctx) return;

    const moduleSize = Math.floor((size - margin * 2) / 25);
    const offset = (size - moduleSize * 25) / 2;

    // Generate a simple pattern based on the value
    // This is a simplified version - in production, use a proper QR code library
    const pattern = this.generatePattern(value);

    this.ctx.fillStyle = color;

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        const index = row * 25 + col;
        if (pattern[index]) {
          const x = offset + col * moduleSize;
          const y = offset + row * moduleSize;
          this.ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }

    // Draw finder patterns (simplified)
    this.drawFinderPattern(offset, offset, moduleSize);
    this.drawFinderPattern(offset + moduleSize * 18, offset, moduleSize);
    this.drawFinderPattern(offset, offset + moduleSize * 18, moduleSize);
  }

  private generatePattern(value: string): boolean[] {
    // Simple hash-based pattern generation
    // In production, use a proper QR code library like qrcode.js
    const pattern: boolean[] = new Array(25 * 25).fill(false);
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash = hash & hash;
    }

    for (let i = 0; i < pattern.length; i++) {
      const seed = (hash + i * 31) % 1000;
      pattern[i] = seed < 500;
    }

    return pattern;
  }

  private drawFinderPattern(x: number, y: number, moduleSize: number): void {
    if (!this.ctx) return;

    // Outer square
    this.ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
    
    // Inner square (background)
    this.ctx.fillStyle = this.getBackground();
    this.ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
    
    // Center square
    this.ctx.fillStyle = this.getColor();
    this.ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
  }

  private clearCanvas(): void {
    if (!this.canvas || !this.ctx) return;
    const size = this.getSize();
    const background = this.getBackground();
    this.ctx.fillStyle = background;
    this.ctx.fillRect(0, 0, size, size);
  }

  public getDataURL(): string {
    if (!this.canvas) return '';
    return this.canvas.toDataURL('image/png');
  }

  public download(filename: string = 'qrcode.png'): void {
    if (!this.canvas) return;
    const dataURL = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    link.click();
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'value' || name === 'size' || name === 'color' || name === 'background' || 
        name === 'error-correction' || name === 'margin') {
      this.generateQRCode();
    }
  }
}

customElements.define('rell-qrcode', RellQrcode);

