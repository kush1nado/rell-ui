import { BaseComponent } from '../../utils/base-component';
import { spacing, radius, shadows } from '../../tokens';

export class RellFileUpload extends BaseComponent {
  static get observedAttributes() {
    return ['accept', 'multiple', 'disabled', 'max-size', 'variant', 'drag-over'];
  }

  private fileInput: HTMLInputElement | null = null;
  private files: File[] = [];
  private isDragOver = false;

  private getAccept(): string {
    return this.getAttribute('accept') || '*';
  }

  private isMultiple(): boolean {
    return this.hasAttribute('multiple');
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private getMaxSize(): number {
    const maxSize = this.getAttribute('max-size');
    return maxSize ? parseInt(maxSize, 10) : 0;
  }

  private getVariant(): string {
    return this.getAttribute('variant') || 'default';
  }

  protected getComponentStyles(): string {
    const variant = this.getVariant();
    const disabled = this.isDisabled();
    const dragOver = this.isDragOver;

    const variantStyles: Record<string, { border: string; bg: string; borderHover: string; bgHover: string }> = {
      default: {
        border: 'var(--rell-border-default)',
        bg: 'var(--rell-surface-base)',
        borderHover: 'var(--rell-interactive-primary)',
        bgHover: 'var(--rell-surface-hover)',
      },
      outlined: {
        border: '2px dashed var(--rell-border-default)',
        bg: 'transparent',
        borderHover: '2px dashed var(--rell-interactive-primary)',
        bgHover: 'var(--rell-surface-hover)',
      },
    };

    const style = variantStyles[variant] || variantStyles.default;

    return `
      :host {
        display: block;
        position: relative;
      }

      .file-upload-container {
        position: relative;
        width: 100%;
        min-height: 200px;
        border: ${style.border};
        border-radius: ${radius.md};
        background-color: ${style.bg};
        transition: all 0.2s ease;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        opacity: ${disabled ? '0.5' : '1'};
        pointer-events: ${disabled ? 'none' : 'auto'};
      }

      .file-upload-container:hover:not(:disabled) {
        border-color: ${style.borderHover};
        background-color: ${style.bgHover};
      }

      .file-upload-container.drag-over {
        border-color: var(--rell-interactive-primary);
        background-color: var(--rell-surface-hover);
        box-shadow: 0 0 0 4px var(--rell-interactive-primary)20;
      }

      .file-upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${spacing[8]};
        gap: ${spacing[4]};
        text-align: center;
        min-height: 200px;
      }

      .file-upload-icon {
        width: 64px;
        height: 64px;
        color: var(--rell-text-secondary);
        margin-bottom: ${spacing[2]};
      }

      .file-upload-text {
        display: flex;
        flex-direction: column;
        gap: ${spacing[2]};
      }

      .file-upload-title {
        font-family: var(--rell-font-sans);
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--rell-text-primary);
        margin: 0;
      }

      .file-upload-description {
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        margin: 0;
      }

      .file-upload-button {
        margin-top: ${spacing[2]};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
        color: var(--rell-interactive-primary);
        text-decoration: underline;
        cursor: pointer;
      }

      .file-upload-button:hover {
        color: var(--rell-interactive-primary-hover);
      }

      .file-input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }

      .file-list {
        display: flex;
        flex-direction: column;
        gap: ${spacing[2]};
        padding: ${spacing[4]};
        max-height: 300px;
        overflow-y: auto;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: ${spacing[3]};
        padding: ${spacing[3]};
        background-color: var(--rell-surface-hover);
        border: 1px solid var(--rell-border-default);
        border-radius: ${radius.sm};
        font-family: var(--rell-font-sans);
        font-size: 0.875rem;
      }

      .file-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${spacing[1]};
        min-width: 0;
      }

      .file-item-name {
        color: var(--rell-text-primary);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-item-size {
        color: var(--rell-text-secondary);
        font-size: 0.75rem;
      }

      .file-item-error {
        color: var(--rell-error);
        font-size: 0.75rem;
        margin-top: ${spacing[1]};
      }

      .file-item-remove {
        background: none;
        border: none;
        color: var(--rell-text-secondary);
        cursor: pointer;
        padding: ${spacing[1]};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${radius.sm};
        transition: all 0.2s ease;
      }

      .file-item-remove:hover {
        color: var(--rell-error);
        background-color: var(--rell-surface-active);
      }

      .file-upload-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${spacing[8]};
        gap: ${spacing[4]};
        min-height: 200px;
      }
    `;
  }

  protected render(): void {
    const accept = this.getAccept();
    const multiple = this.isMultiple();
    const disabled = this.isDisabled();

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="file-upload-container ${this.isDragOver ? 'drag-over' : ''}">
        <input 
          type="file" 
          class="file-input" 
          ${accept !== '*' ? `accept="${accept}"` : ''}
          ${multiple ? 'multiple' : ''}
          ${disabled ? 'disabled' : ''}
        />
        ${this.files.length === 0 ? this.renderEmptyState() : this.renderFileList()}
      </div>
    `;

    this.fileInput = this.shadow.querySelector('.file-input') as HTMLInputElement;
    this.setupEventListeners();
  }

  private renderEmptyState(): string {
    return `
      <div class="file-upload-empty">
        <svg class="file-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div class="file-upload-text">
          <p class="file-upload-title">Перетащите файлы сюда</p>
          <p class="file-upload-description">или нажмите для выбора файлов</p>
        </div>
        <span class="file-upload-button">Выбрать файлы</span>
      </div>
    `;
  }

  private renderFileList(): string {
    return `
      <div class="file-list">
        ${this.files.map((file, index) => this.renderFileItem(file, index)).join('')}
      </div>
      <div class="file-upload-content">
        <span class="file-upload-button">Добавить еще файлы</span>
      </div>
    `;
  }

  private renderFileItem(file: File, index: number): string {
    const size = this.formatFileSize(file.size);
    const error = (file as any).error;
    
    return `
      <div class="file-item">
        <div class="file-item-info">
          <div class="file-item-name">${file.name}</div>
          <div class="file-item-size">${size}</div>
          ${error ? `<div class="file-item-error">${error}</div>` : ''}
        </div>
        <button class="file-item-remove" data-index="${index}" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  }

  private setupEventListeners(): void {
    if (!this.fileInput) return;

    this.fileInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        this.handleFiles(Array.from(target.files));
      }
    });

    const container = this.shadow.querySelector('.file-upload-container');
    if (container) {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isDisabled()) {
          this.isDragOver = true;
          this.updateDragOverState();
        }
      });

      container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.isDragOver = false;
        this.updateDragOverState();
      });

      container.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.isDragOver = false;
        this.updateDragOverState();

        if (!this.isDisabled()) {
          const dragEvent = e as DragEvent;
          if (dragEvent.dataTransfer?.files) {
            this.handleFiles(Array.from(dragEvent.dataTransfer.files));
          }
        }
      });
    }

    this.shadow.querySelectorAll('.file-item-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt((e.target as HTMLElement).closest('[data-index]')?.getAttribute('data-index') || '0', 10);
        this.removeFile(index);
      });
    });
  }

  private updateDragOverState(): void {
    const container = this.shadow.querySelector('.file-upload-container');
    if (container) {
      if (this.isDragOver) {
        container.classList.add('drag-over');
      } else {
        container.classList.remove('drag-over');
      }
    }
  }

  private handleFiles(newFiles: File[]): void {
    const maxSize = this.getMaxSize();
    const multiple = this.isMultiple();

    let filesToAdd = newFiles;

    if (!multiple && this.files.length > 0) {
      this.files = [];
    }

    filesToAdd.forEach(file => {
      if (maxSize > 0 && file.size > maxSize) {
        (file as any).error = `Файл слишком большой. Максимальный размер: ${this.formatFileSize(maxSize)}`;
      }
      this.files.push(file);
    });

    this.dispatchEvent(new CustomEvent('files-changed', {
      detail: { files: this.files },
      bubbles: true,
      composed: true,
    }));

    this.render();
  }

  private removeFile(index: number): void {
    this.files.splice(index, 1);
    this.dispatchEvent(new CustomEvent('files-changed', {
      detail: { files: this.files },
      bubbles: true,
      composed: true,
    }));
    if (this.files.length === 0 && this.fileInput) {
      this.fileInput.value = '';
    }
    this.render();
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  public getFiles(): File[] {
    return [...this.files];
  }

  public clearFiles(): void {
    this.files = [];
    if (this.fileInput) {
      this.fileInput.value = '';
    }
    this.render();
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'accept' || name === 'multiple' || name === 'disabled') {
      this.render();
    }
  }
}

customElements.define('rell-file-upload', RellFileUpload);

