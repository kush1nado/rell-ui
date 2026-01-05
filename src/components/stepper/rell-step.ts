import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellStep extends BaseComponent {
  static get observedAttributes() {
    return ['status', 'title', 'description', 'number'];
  }

  private getStatus(): string {
    return this.getAttribute('status') || 'pending';
  }

  private getTitle(): string {
    return this.getAttribute('title') || '';
  }

  private getDescription(): string {
    return this.getAttribute('description') || '';
  }

  private getNumber(): number {
    const number = this.getAttribute('number');
    return number ? parseInt(number) : 0;
  }

  protected getComponentStyles(): string {
    const status = this.getStatus();
    const isActive = status === 'active';
    const isCompleted = status === 'completed';

    const statusColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      pending: {
        bg: 'var(--rell-surface-base)',
        border: 'var(--rell-border-default)',
        text: 'var(--rell-text-tertiary)',
        icon: '',
      },
      active: {
        bg: 'var(--rell-interactive-primary)',
        border: 'var(--rell-interactive-primary)',
        text: 'var(--rell-text-inverse)',
        icon: '',
      },
      completed: {
        bg: 'var(--rell-status-success)',
        border: 'var(--rell-status-success)',
        text: 'var(--rell-text-inverse)',
        icon: '✓',
      },
    };

    const colors = statusColors[status] || statusColors.pending;

    return `
      :host {
        display: flex;
        align-items: flex-start;
        gap: ${spacing[3]};
        position: relative;
        z-index: 1;
        flex-direction: column;
      }

      .step-icon {
        width: 40px;
        height: 40px;
        min-width: 40px;
        border-radius: ${radius.full};
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${colors.bg};
        border: 2px solid ${colors.border};
        color: ${colors.text};
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;
        padding-top: 0;
        margin-top: ${spacing[4]};
      }

      .step-title {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: ${isActive ? '600' : '500'};
        color: ${isActive ? 'var(--rell-text-primary)' : 'var(--rell-text-secondary)'};
        margin: 0 0 ${spacing[1]} 0;
        transition: color 0.3s ease;
      }

      .step-description {
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-tertiary);
        margin: 0;
      }

      ::slotted([slot="title"]) {
        font-family: var(--rell-font-sans);
        font-size: 1rem;
        font-weight: ${isActive ? '600' : '500'};
        color: ${isActive ? 'var(--rell-text-primary)' : 'var(--rell-text-secondary)'};
        margin: 0 0 ${spacing[1]} 0;
        display: block;
      }

      ::slotted([slot="description"]) {
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-tertiary);
        margin: 0;
        display: block;
      }
    `;
  }

  protected render(): void {
    const status = this.getStatus();
    const title = this.getTitle();
    const description = this.getDescription();
    const number = this.getNumber();
    const isCompleted = status === 'completed';
    const icon = isCompleted ? '✓' : (number > 0 ? String(number) : '');

    const hasTitleSlot = this.querySelector('[slot="title"]') !== null;
    const hasDescriptionSlot = this.querySelector('[slot="description"]') !== null;

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="step-icon">${icon}</div>
      <div class="step-content">
        ${hasTitleSlot ? '<slot name="title"></slot>' : (title ? `<div class="step-title">${title}</div>` : '')}
        ${hasDescriptionSlot ? '<slot name="description"></slot>' : (description ? `<div class="step-description">${description}</div>` : '')}
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-step', RellStep);

