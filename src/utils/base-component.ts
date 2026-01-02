export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  protected createStyles(): string {
    return `
      <style>
        :host {
          display: block;
        }
        ${this.getComponentStyles()}
      </style>
    `;
  }

  protected abstract getComponentStyles(): string;

  protected injectThemeStyles(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/tokens/theme.css';
    this.shadow.appendChild(link);
  }

  protected static get observedAttributes(): string[] {
    return [];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.onAttributeChange(name, oldValue, newValue);
    }
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
  }

  connectedCallback(): void {
    this.render();
  }

  protected abstract render(): void;
}
