import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Vite plugin to automatically generate react.d.ts from component observedAttributes
 * Runs during build process
 */
export function reactTypesPlugin(): Plugin {
  return {
    name: 'react-types-generator',
    buildStart() {
      generateReactTypes();
    },
  };
}

function extractTagName(fileContent: string): string | null {
  const defineMatch = fileContent.match(/customElements\.define\(['"]([^'"]+)['"]/);
  return defineMatch ? defineMatch[1] : null;
}

function extractObservedAttributes(fileContent: string): string[] {
  const attrMatch = fileContent.match(/static\s+get\s+observedAttributes\(\)\s*\{?\s*return\s+\[([^\]]+)\]/s);
  if (!attrMatch) return [];
  
  const attrsString = attrMatch[1];
  const attrs = attrsString
    .split(',')
    .map(attr => attr.trim().replace(/['"]/g, ''))
    .filter(attr => attr.length > 0);
  
  return attrs;
}

function generateAttributeType(tagName: string, attr: string): string {
  // Component-specific attribute types
  const componentSpecificTypes: Record<string, Record<string, string>> = {
    'rell-button': {
      'variant': "'primary' | 'secondary' | 'outline' | 'ghost'",
    },
    'rell-typography': {
      'variant': "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small'",
      'color': "'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'disabled'",
      'weight': "'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'",
      'align': "'left' | 'center' | 'right' | 'justify'",
      'font-family': "'sans' | 'mono'",
      'gradient': "'cyan-magenta' | 'cyan-magenta-pink' | 'magenta-pink' | 'cyan-green' | 'pink-yellow' | string",
      'accent-color': "'cyan' | 'magenta' | 'pink' | 'yellow' | 'green' | 'blue' | string",
      'letter-spacing': "'wide' | 'wider' | 'widest' | string",
      'transform': "'uppercase' | 'lowercase' | 'capitalize'",
    },
    'rell-card': {
      'variant': "'elevated' | 'outlined' | 'flat'",
      'border-color': "'cyan' | 'magenta' | 'pink' | 'yellow' | 'green' | 'blue' | string",
      'align': "'left' | 'center' | 'right'",
    },
    'rell-input': {
      'type': "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'",
      'validate-on': "'blur' | 'change' | 'submit'",
    },
    'rell-color-picker': {
      'format': "'hex' | 'rgb' | 'hsl'",
    },
    'rell-qrcode': {
      'error-correction': "'L' | 'M' | 'Q' | 'H'",
    },
    'rell-watermark': {
      'mode': "'text' | 'pattern' | 'grid'",
    },
    'rell-link': {
      'target': "'_self' | '_blank' | '_parent' | '_top'",
    },
    'rell-tooltip': {
      'position': "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
    },
    'rell-popover': {
      'position': "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
      'trigger': "'click' | 'hover' | 'focus' | 'manual'",
    },
    'rell-dropdown': {
      'position': "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
      'trigger': "'click' | 'hover' | 'focus' | 'manual'",
    },
    'rell-popconfirm': {
      'position': "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
    },
    'rell-dialog': {
      'size': "'sm' | 'md' | 'lg' | 'xl' | 'full'",
    },
    'rell-modal': {
      'size': "'sm' | 'md' | 'lg' | 'xl' | 'full'",
    },
    'rell-image': {
      'fit': "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'",
    },
    'rell-avatar': {
      'variant': "'circle' | 'square' | 'rounded' | string",
    },
    'rell-divider': {
      'variant': "'solid' | 'dashed' | 'dotted' | string",
    },
  };
  
  // Check component-specific types first
  if (componentSpecificTypes[tagName]?.[attr]) {
    return componentSpecificTypes[tagName][attr];
  }
  
  // Generic attribute types
  const booleanAttrs = [
    'disabled', 'checked', 'required', 'multiple', 'readonly', 'open', 'closable',
    'fluid', 'centered', 'sticky', 'transparent', 'hover', 'striped', 'bordered',
    'clickable', 'selected', 'active', 'indeterminate', 'clearable', 'loading',
    'show-label', 'show-dots', 'show-arrows', 'show-total', 'show-size-changer',
    'show-today', 'show-other-months', 'show-alpha', 'show-value', 'allow-half',
    'full-width', 'backdrop-blur', 'close-on-backdrop', 'animated', 'loop',
    'autoplay', 'draggable', 'dividers', 'arrow', 'dot', 'outlined', 'lazy',
    'underline', 'alternate', 'error'
  ];
  
  const sizeAttrs = ['size'];
  const positionAttrs = ['position'];
  const orientationAttrs = ['orientation'];
  const numberAttrs = [
    'min', 'max', 'step', 'value', 'width', 'height', 'z-index', 'opacity',
    'font-size', 'letter-spacing', 'rotate', 'gap', 'spacing', 'thickness',
    'margin', 'padding', 'min-width', 'min-height', 'max-width', 'max-height',
    'row-height', 'buffer', 'interval', 'current', 'total', 'page-size',
    'min-length', 'max-size', 'min-date', 'max-date', 'first-day-of-week',
    'error-correction', 'split', 'default-size', 'max-width'
  ];
  
  if (booleanAttrs.includes(attr)) return 'boolean';
  if (sizeAttrs.includes(attr)) return "'sm' | 'md' | 'lg'";
  if (positionAttrs.includes(attr)) return "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'";
  if (orientationAttrs.includes(attr)) return "'horizontal' | 'vertical'";
  if (numberAttrs.includes(attr) || attr.includes('-size') || attr.includes('-width') || attr.includes('-height')) {
    return 'string | number';
  }
  return 'string';
}

function generateComponentType(tagName: string, attributes: string[]): string {
  if (attributes.length === 0) {
    return `      '${tagName}': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;`;
  }
  
  const props = attributes.map(attr => {
    const type = generateAttributeType(tagName, attr);
    return `          '${attr}'?: ${type};`;
  }).join('\n');
  
  return `      '${tagName}': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
${props}
        },
        HTMLElement
      >;`;
}

function scanComponents(componentsDir: string): Array<{ tagName: string; attributes: string[] }> {
  const components: Array<{ tagName: string; attributes: string[] }> = [];
  
  function scanDirectory(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        try {
          if (entry.isDirectory()) {
            scanDirectory(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.includes('.stories.') && !entry.name.includes('.test.')) {
            try {
              const content = fs.readFileSync(fullPath, 'utf-8');
              
              if (content.includes('customElements.define')) {
                const tagName = extractTagName(content);
                const attributes = extractObservedAttributes(content);
                
                if (tagName) {
                  components.push({ tagName, attributes });
                }
              }
            } catch (error) {
              // Skip files we can't read
            }
          }
        } catch (error) {
          // Skip directories/files we can't access
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }
  
  scanDirectory(componentsDir);
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

function generateReactTypesFile(components: Array<{ tagName: string; attributes: string[] }>): string {
  const header = `/**
 * React JSX type definitions for Rell UI Web Components
 * 
 * This file is AUTO-GENERATED during build. Do not edit manually.
 * 
 * This file extends React's JSX.IntrinsicElements to include all Rell UI custom elements
 * with their complete attribute definitions, allowing TypeScript to recognize them as
 * valid JSX elements in React applications with full autocomplete support.
 * 
 * To use these types in your React project, ensure @types/react is installed:
 * npm install --save-dev @types/react
 */

/// <reference types="react" />

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
`;

  const footer = `    }
  }
}
`;

  const categorized: Record<string, Array<{ tagName: string; attributes: string[] }>> = {
    'Layout': [],
    'Typography': [],
    'Buttons': [],
    'Form': [],
    'Navigation': [],
    'Data Display': [],
    'Feedback': [],
    'Overlay': [],
    'Other': []
  };
  
  components.forEach(comp => {
    const tag = comp.tagName;
    if (tag.includes('container') || tag.includes('row') || tag.includes('col') || tag.includes('box') || tag.includes('stack') || tag.includes('grid') || tag.includes('section') || tag.includes('background') || tag.includes('header') || tag.includes('body') || tag.includes('footer')) {
      categorized['Layout'].push(comp);
    } else if (tag.includes('typography')) {
      categorized['Typography'].push(comp);
    } else if (tag.includes('button')) {
      categorized['Buttons'].push(comp);
    } else if (tag.includes('input') || tag.includes('select') || tag.includes('checkbox') || tag.includes('radio') || tag.includes('switch') || tag.includes('slider') || tag.includes('form') || tag.includes('date') || tag.includes('search') || tag.includes('autocomplete') || tag.includes('rating') || tag.includes('file-upload') || tag.includes('calendar')) {
      categorized['Form'].push(comp);
    } else if (tag.includes('breadcrumbs') || tag.includes('navbar') || tag.includes('menu') || tag.includes('pagination') || tag.includes('segmented-control')) {
      categorized['Navigation'].push(comp);
    } else if (tag.includes('card') || tag.includes('badge') || tag.includes('chip') || tag.includes('avatar') || tag.includes('image') || tag.includes('svg') || tag.includes('table') || tag.includes('item') || tag.includes('tree') || tag.includes('timeline') || tag.includes('empty-state') || tag.includes('qrcode') || tag.includes('watermark')) {
      categorized['Data Display'].push(comp);
    } else if (tag.includes('alert') || tag.includes('notification') || tag.includes('progress') || tag.includes('skeleton') || tag.includes('backdrop')) {
      categorized['Feedback'].push(comp);
    } else if (tag.includes('dialog') || tag.includes('modal') || tag.includes('tooltip') || tag.includes('popover') || tag.includes('dropdown') || tag.includes('popconfirm') || tag.includes('context-menu')) {
      categorized['Overlay'].push(comp);
    } else {
      categorized['Other'].push(comp);
    }
  });
  
  let body = '';
  
  Object.entries(categorized).forEach(([category, comps]) => {
    if (comps.length > 0) {
      body += `      // ${category}\n`;
      comps.forEach(comp => {
        body += generateComponentType(comp.tagName, comp.attributes) + '\n';
      });
      body += '\n';
    }
  });
  
  return header + body + footer;
}

function generateReactTypes() {
  // Get root directory from process.cwd() or vite config
  const rootDir = process.cwd();
  const componentsDir = path.join(rootDir, 'src/components');
  const outputPath = path.join(rootDir, 'src/react.d.ts');
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const components = scanComponents(componentsDir);
  const content = generateReactTypesFile(components);
  
  fs.writeFileSync(outputPath, content, 'utf-8');
}

