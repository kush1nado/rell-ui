import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

const COMPONENT_ATTRIBUTE_TYPES_PATH = path.join(process.cwd(), 'scripts', 'component-attribute-types.json');

function loadComponentAttributeTypes(): Record<string, Record<string, string>> {
  try {
    const raw = fs.readFileSync(COMPONENT_ATTRIBUTE_TYPES_PATH, 'utf-8');
    return JSON.parse(raw) as Record<string, Record<string, string>>;
  } catch {
    return {};
  }
}

/**
 * Convert tag name (rell-dialog) to class name (RellDialog) for ref typing.
 */
function tagNameToClassName(tagName: string): string {
  return tagName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

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

function generateAttributeType(
  tagName: string,
  attr: string,
  componentSpecificTypes: Record<string, Record<string, string>>
): string {
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

function generateComponentType(
  tagName: string,
  attributes: string[],
  componentSpecificTypes: Record<string, Record<string, string>>
): string {
  const elementClass = tagNameToClassName(tagName);
  if (attributes.length === 0) {
    return `      '${tagName}': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, ${elementClass}>;`;
  }

  const props = attributes
    .map((attr) => {
      const type = generateAttributeType(tagName, attr, componentSpecificTypes);
      return `          '${attr}'?: ${type};`;
    })
    .join('\n');

  return `      '${tagName}': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
${props}
        },
        ${elementClass}
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

function generateReactTypesFile(
  components: Array<{ tagName: string; attributes: string[] }>,
  componentSpecificTypes: Record<string, Record<string, string>>
): string {
  const header = `/**
 * React JSX type definitions for Rell UI Web Components
 *
 * This file is AUTO-GENERATED during build. Do not edit manually.
 *
 * This file extends React's JSX.IntrinsicElements to include all Rell UI custom elements
 * with their complete attribute definitions and element ref types (e.g. useRef<RellDialog>).
 *
 * To use these types in your React project, ensure @types/react is installed:
 * npm install --save-dev @types/react
 */

/// <reference path="./index.d.ts" />
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
      comps.forEach((comp) => {
        body += generateComponentType(comp.tagName, comp.attributes, componentSpecificTypes) + '\n';
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
  
  const componentSpecificTypes = loadComponentAttributeTypes();
  const components = scanComponents(componentsDir);
  const content = generateReactTypesFile(components, componentSpecificTypes);

  fs.writeFileSync(outputPath, content, 'utf-8');
}

