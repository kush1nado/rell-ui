import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTreeNode extends BaseComponent {
  static get observedAttributes() {
    return ['expanded', 'label', 'icon', 'selectable', 'selected'];
  }

  private isExpanded(): boolean {
    return this.hasAttribute('expanded');
  }

  private getLabel(): string {
    return this.getAttribute('label') || '';
  }

  private getIcon(): string {
    return this.getAttribute('icon') || '';
  }

  private isSelectable(): boolean {
    return this.hasAttribute('selectable');
  }

  private isSelected(): boolean {
    return this.hasAttribute('selected');
  }

  private hasChildren(): boolean {
    return this.querySelector('rell-tree-node') !== null;
  }

  private toggleExpanded(): void {
    if (this.hasChildren()) {
      if (this.isExpanded()) {
        this.removeAttribute('expanded');
      } else {
        this.setAttribute('expanded', '');
      }
      this.render();
    }
  }

  protected getComponentStyles(): string {
    const selected = this.isSelected();
    const selectable = this.isSelectable();

    return `
      :host {
        display: block;
        width: 100%;
      }

      .tree-node {
        display: flex;
        flex-direction: column;
      }

      .tree-node-content {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
        padding: ${spacing[2]} ${spacing[3]};
        border-radius: ${radius.sm};
        cursor: ${selectable ? 'pointer' : 'default'};
        transition: background-color 0.2s;
        user-select: none;
        ${selected ? 'background-color: var(--rell-surface-hover);' : ''}
      }

      .tree-node-content:hover {
        background-color: var(--rell-surface-hover);
      }

      .tree-node-toggle {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        color: var(--rell-text-secondary);
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        transition: transform 0.2s;
      }

      .tree-node-toggle.expanded {
        transform: rotate(90deg);
      }

      .tree-node-icon {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--rell-text-secondary);
        font-size: 0.875rem;
      }

      .tree-node-label {
        flex: 1;
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-primary);
      }

      .tree-node-children {
        margin-left: ${spacing[6]};
        margin-top: ${spacing[1]};
        display: ${this.isExpanded() ? 'block' : 'none'};
        border-left: 1px solid var(--rell-border-default);
        padding-left: ${spacing[3]};
      }
    `;
  }

  protected render(): void {
    const expanded = this.isExpanded();
    const label = this.getLabel();
    const icon = this.getIcon();
    const hasChildren = this.hasChildren();
    const selectable = this.isSelectable();
    const selected = this.isSelected();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="tree-node">
        <div class="tree-node-content" ${selectable ? 'data-selectable="true"' : ''}>
          ${hasChildren ? `
            <button class="tree-node-toggle ${expanded ? 'expanded' : ''}" data-action="toggle">
              ▶
            </button>
          ` : `<span style="width: 16px;"></span>`}
          ${icon ? `<span class="tree-node-icon">${icon}</span>` : ''}
          ${label ? `<span class="tree-node-label">${label}</span>` : '<span class="tree-node-label"><slot name="label"></slot></span>'}
          <slot name="content"></slot>
        </div>
        ${hasChildren ? `
          <div class="tree-node-children">
            <slot></slot>
          </div>
        ` : ''}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const toggle = this.shadow.querySelector('[data-action="toggle"]');
    const content = this.shadow.querySelector('.tree-node-content');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleExpanded();
      });
    }

    if (content && this.isSelectable()) {
      content.addEventListener('click', () => {
        if (!this.isSelected()) {
          this.setAttribute('selected', '');
          this.dispatchEvent(new CustomEvent('select', {
            detail: { label: this.getLabel() },
            bubbles: true,
            composed: true,
          }));
        } else {
          this.removeAttribute('selected');
          this.dispatchEvent(new CustomEvent('deselect', {
            detail: { label: this.getLabel() },
            bubbles: true,
            composed: true,
          }));
        }
        this.render();
      });
    }
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-tree-node', RellTreeNode);

