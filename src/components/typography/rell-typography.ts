import { BaseComponent } from '../../utils/base-component';
import { typography } from '../../tokens';

export class RellTypography extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'color', 'weight', 'align', 'font-family', 'gradient', 'font-size', 'accent-color', 'letter-spacing', 'transform'];
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

  private getGradient(): string {
    return this.getAttribute('gradient') || '';
  }

  private getFontSize(): string {
    return this.getAttribute('font-size') || '';
  }

  private getAccentColor(): string {
    return this.getAttribute('accent-color') || '';
  }

  private getLetterSpacing(): string {
    return this.getAttribute('letter-spacing') || '';
  }

  private getTransform(): string {
    return this.getAttribute('transform') || '';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const color = this.getColor();
    const weight = this.getWeight();
    const align = this.getAlign();
    const fontFamily = this.getFontFamily();
    const gradient = this.getGradient();
    const fontSize = this.getFontSize();
    const accentColor = this.getAccentColor();
    const letterSpacing = this.getLetterSpacing();
    const transform = this.getTransform();

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

    const accentColorMap: Record<string, string> = {
      cyan: 'var(--rell-accent-cyan)',
      magenta: 'var(--rell-accent-magenta)',
      pink: 'var(--rell-accent-pink)',
      yellow: 'var(--rell-accent-yellow)',
      green: 'var(--rell-accent-green)',
      blue: 'var(--rell-accent-blue)',
    };

    const gradientMap: Record<string, string> = {
      'cyan-magenta': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta))',
      'cyan-magenta-pink': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-magenta), var(--rell-accent-pink))',
      'magenta-pink': 'linear-gradient(135deg, var(--rell-accent-magenta), var(--rell-accent-pink))',
      'cyan-green': 'linear-gradient(135deg, var(--rell-accent-cyan), var(--rell-accent-green))',
      'pink-yellow': 'linear-gradient(135deg, var(--rell-accent-pink), var(--rell-accent-yellow))',
    };

    const letterSpacingMap: Record<string, string> = {
      wide: '0.1em',
      wider: '0.15em',
      widest: '0.2em',
    };

    const transformMap: Record<string, string> = {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
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
    let textColor = colorMap[color] || colorMap.primary;
    
    if (accentColor && accentColorMap[accentColor]) {
      textColor = accentColorMap[accentColor];
    }

    const fontWeight = weightMap[weight] || weightMap.normal;
    const fontFamilyValue = fontFamilyMap[fontFamily] || fontFamilyMap.sans;
    const finalFontSize = fontSize || style.fontSize;
    const finalLetterSpacing = letterSpacing ? (letterSpacingMap[letterSpacing] || letterSpacing) : '';
    const finalTransform = transform ? transformMap[transform] : '';

    const gradientValue = gradient ? gradientMap[gradient] : '';
    const hasGradient = !!gradientValue;

    const tagName = variant.startsWith('h') ? variant : 'p';

    return `
      ${tagName} {
        margin: 0;
        padding: 0;
        font-size: ${finalFontSize};
        line-height: ${style.lineHeight};
        font-weight: ${fontWeight};
        ${hasGradient ? `
          background: ${gradientValue};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        ` : `
          color: ${textColor};
        `}
        text-align: ${align};
        font-family: ${fontFamilyValue};
        ${finalLetterSpacing ? `letter-spacing: ${finalLetterSpacing};` : ''}
        ${finalTransform ? `text-transform: ${finalTransform};` : ''}
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

