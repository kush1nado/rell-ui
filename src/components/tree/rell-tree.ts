import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellTree extends BaseComponent {
  static get observedAttributes() {
    return ['expanded', 'default-expand-all'];
  }

  private isExpanded(): boolean {
    return this.hasAttribute('expanded');
  }

  private shouldExpandAll(): boolean {
    return this.hasAttribute('default-expand-all');
  }

  private getTreeNodes(): HTMLElement[] {
    return Array.from(this.querySelectorAll('rell-tree-node'));
  }

  protected getComponentStyles(): string {
    return `
      :host {
        display: block;
        width: 100%;
      }

      .tree {
        display: flex;
        flex-direction: column;
        gap: ${spacing[1]};
      }
    `;
  }

  protected render(): void {
    const expandAll = this.shouldExpandAll();
    const nodes = this.getTreeNodes();

    if (expandAll) {
      nodes.forEach(node => {
        node.setAttribute('expanded', '');
      });
    }

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="tree">
        <slot></slot>
      </div>
    `;
  }

  protected onAttributeChange(): void {
    this.render();
  }
}

customElements.define('rell-tree', RellTree);

