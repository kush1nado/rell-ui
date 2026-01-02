import { BaseComponent } from '../../utils/base-component';
import { typography } from '../../tokens';

export class RellTypography extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'color', 'weight', 'align', 'font-family'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'body';
  }

  private getColor(): string {
    return this.getAttribute('color') || 'primary';
  }

  private getWeight(): string {
    return this.getAttribute('weight') || 'normal';
  }

  private getAlign(): string {
    return this.getAttribute('align') || 'left';
  }

  private getFontFamily(): string {
    return this.getAttribute('font-family') || 'sans';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const color = this.getColor();
    const weight = this.getWeight();
    const align = this.getAlign();
    const fontFamily = this.getFontFamily();

    const variantStyles: Record<string, { fontSize: string; lineHeight: string; fontWeight: string }> = {
      h1: { fontSize: typography.fontSize['5xl'], lineHeight: typography.lineHeight.tight, fontWeight: typography.fontWeight.bold },
      h2: { fontSize: typography.fontSize['4xl'], lineHeight: typography.lineHeight.tight, fontWeight: typography.fontWeight.bold },
      h3: { fontSize: typography.fontSize['3xl'], lineHeight: typography.lineHeight.snug, fontWeight: typography.fontWeight.semibold },
      h4: { fontSize: typography.fontSize['2xl'], lineHeight: typography.lineHeight.snug, fontWeight: typography.fontWeight.semibold },
      h5: { fontSize: typography.fontSize.xl, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.medium },
      h6: { fontSize: typography.fontSize.lg, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.medium },
      body: { fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.normal },
      caption: { fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.normal },
      small: { fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.normal },
    };

    const colorMap: Record<string, string> = {
      primary: 'var(--rell-text-primary)',
      secondary: 'var(--rell-text-secondary)',
      tertiary: 'var(--rell-text-tertiary)',
      disabled: 'var(--rell-text-disabled)',
      accent: 'var(--rell-accent-cyan)',
      success: 'var(--rell-status-success)',
      warning: 'var(--rell-status-warning)',
      error: 'var(--rell-status-error)',
      info: 'var(--rell-status-info)',
    };

    const weightMap: Record<string, string> = {
      light: typography.fontWeight.light,
      normal: typography.fontWeight.normal,
      medium: typography.fontWeight.medium,
      semibold: typography.fontWeight.semibold,
      bold: typography.fontWeight.bold,
      extrabold: typography.fontWeight.extrabold,
    };

    const fontFamilyMap: Record<string, string> = {
      sans: typography.fontFamily.sans,
      mono: typography.fontFamily.mono,
    };

    const style = variantStyles[variant] || variantStyles.body;
    const textColor = colorMap[color] || colorMap.primary;
    const fontWeight = weightMap[weight] || weightMap.normal;
    const fontFamilyValue = fontFamilyMap[fontFamily] || fontFamilyMap.sans;

    const tagName = variant.startsWith('h') ? variant : 'p';

    return `
      ${tagName} {
        margin: 0;
        padding: 0;
        font-size: ${style.fontSize};
        line-height: ${style.lineHeight};
        font-weight: ${fontWeight};
        color: ${textColor};
        text-align: ${align};
        font-family: ${fontFamilyValue};
      }
    `;
  }

  protected render(): void {
    const variant = this.getVariant();
    const tagName = variant.startsWith('h') ? variant : 'p';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <${tagName}>
        <slot></slot>
      </${tagName}>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-typography', RellTypography);

