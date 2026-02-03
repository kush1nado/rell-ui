import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellEmptyState extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'size'];
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  private getSize(): string {
    return this.getAttribute('size') || 'md';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const size = this.getSize();

    const sizeStyles: Record<string, { padding: string; iconSize: string; titleSize: string }> = {
      sm: { padding: spacing[6], iconSize: '48px', titleSize: '1.25rem' },
      md: { padding: spacing[8], iconSize: '64px', titleSize: '1.5rem' },
      lg: { padding: spacing[12], iconSize: '80px', titleSize: '2rem' },
    };

    const style = sizeStyles[size] || sizeStyles.md;

    return `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: ${style.padding};
        width: 100%;
      }

      .empty-state-icon {
        width: ${style.iconSize};
        height: ${style.iconSize};
        margin-bottom: ${spacing[4]};
        opacity: 0.5;
        color: var(--rell-text-tertiary);
      }

      .empty-state-title {
        font-family: var(--rell-font-sans);
        font-size: ${style.titleSize};
        font-weight: 600;
        color: var(--rell-text-primary);
        margin-bottom: ${spacing[2]};
      }

      .empty-state-description {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-secondary);
        max-width: 400px;
        line-height: 1.6;
      }

      ::slotted([slot="icon"]) {
        width: ${style.iconSize};
        height: ${style.iconSize};
        margin-bottom: ${spacing[4]};
        opacity: 0.5;
        color: var(--rell-text-tertiary);
      }

      ::slotted([slot="title"]) {
        font-family: var(--rell-font-sans);
        font-size: ${style.titleSize};
        font-weight: 600;
        color: var(--rell-text-primary);
        margin-bottom: ${spacing[2]};
      }

      ::slotted([slot="description"]) {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        color: var(--rell-text-secondary);
        max-width: 400px;
        line-height: 1.6;
      }

      ::slotted([slot="action"]) {
        margin-top: ${spacing[4]};
      }
    `;
  }

  protected render(): void {
    this.shadow.innerHTML = `
      ${this.createStyles()}
      <slot name="icon"></slot>
      <slot name="title"></slot>
      <slot name="description"></slot>
      <slot name="action"></slot>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-empty-state', RellEmptyState);

