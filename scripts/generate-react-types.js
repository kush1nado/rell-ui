#!/usr/bin/env node

/**
 * Script to automatically generate react.d.ts from component observedAttributes
 * 
 * Uses only built-in Node.js modules - no external dependencies
 * Run: node scripts/generate-react-types.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const componentsDir = path.join(rootDir, 'src/components');

/**
 * Extract component tag name from customElements.define call
 */
function extractTagName(fileContent) {
  const defineMatch = fileContent.match(/customElements\.define\(['"]([^'"]+)['"]/);
  return defineMatch ? defineMatch[1] : null;
}

/**
 * Extract observedAttributes from static get observedAttributes()
 */
function extractObservedAttributes(fileContent) {
  const attrMatch = fileContent.match(/static\s+get\s+observedAttributes\(\)\s*\{?\s*return\s+\[([^\]]+)\]/s);
  if (!attrMatch) return [];
  
  const attrsString = attrMatch[1];
  // Extract attribute names from array, handling both 'attr' and "attr" formats
  const attrs = attrsString
    .split(',')
    .map(attr => attr.trim().replace(/['"]/g, ''))
    .filter(attr => attr.length > 0);
  
  return attrs;
}

/**
 * Generate TypeScript type for an attribute
 */
function generateAttributeType(attr) {
  // Common boolean attributes
  const booleanAttrs = [
    'disabled', 'checked', 'required', 'multiple', 'readonly', 'open', 'closable',
    'fluid', 'centered', 'sticky', 'transparent', 'hover', 'striped', 'bordered',
    'clickable', 'selected', 'active', 'indeterminate', 'clearable', 'loading',
    'show-label', 'show-dots', 'show-arrows', 'show-total', 'show-size-changer',
    'show-today', 'show-other-months', 'show-alpha', 'show-value', 'allow-half',
    'full-width', 'backdrop-blur', 'close-on-backdrop', 'animated', 'loop',
    'autoplay', 'draggable', 'dividers', 'arrow', 'dot', 'outlined', 'lazy',
    'underline', 'alternate'
  ];
  
  // Common size attributes
  const sizeAttrs = ['size'];
  
  // Common position attributes
  const positionAttrs = ['position'];
  
  // Common orientation attributes
  const orientationAttrs = ['orientation'];
  
  // Common number/string attributes
  const numberAttrs = [
    'min', 'max', 'step', 'value', 'width', 'height', 'z-index', 'opacity',
    'font-size', 'letter-spacing', 'rotate', 'gap', 'spacing', 'thickness',
    'margin', 'padding', 'min-width', 'min-height', 'max-width', 'max-height',
    'row-height', 'buffer', 'interval', 'current', 'total', 'page-size',
    'min-length', 'max-size', 'min-date', 'max-date', 'first-day-of-week',
    'error-correction', 'split', 'default-size', 'max-width'
  ];
  
  if (booleanAttrs.includes(attr)) {
    return 'boolean';
  }
  
  if (sizeAttrs.includes(attr)) {
    return "'sm' | 'md' | 'lg'";
  }
  
  if (positionAttrs.includes(attr)) {
    return "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'";
  }
  
  if (orientationAttrs.includes(attr)) {
    return "'horizontal' | 'vertical'";
  }
  
  if (numberAttrs.includes(attr) || attr.includes('-size') || attr.includes('-width') || attr.includes('-height')) {
    return 'string | number';
  }
  
  // Default to string for unknown attributes
  return 'string';
}

/**
 * Generate React JSX type definition for a component
 */
function generateComponentType(tagName, attributes) {
  if (attributes.length === 0) {
    return `      '${tagName}': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;`;
  }
  
  const props = attributes.map(attr => {
    const type = generateAttributeType(attr);
    return `          '${attr}'?: ${type};`;
  }).join('\n');
  
  return `      '${tagName}': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
${props}
        },
        HTMLElement
      >;`;
}

/**
 * Scan component files and extract information
 */
function scanComponents() {
  const components = [];
  
  function scanDirectory(dir) {
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
              
              // Only process files that define custom elements
              if (content.includes('customElements.define')) {
                const tagName = extractTagName(content);
                const attributes = extractObservedAttributes(content);
                
                if (tagName) {
                  components.push({ tagName, attributes });
                }
              }
            } catch (error) {
              console.warn(`Error reading ${fullPath}:`, error.message);
            }
          }
        } catch (error) {
          // Skip directories/files we can't access
          console.warn(`Skipping ${fullPath}:`, error.message);
        }
      }
    } catch (error) {
      console.warn(`Cannot read directory ${dir}:`, error.message);
    }
  }
  
  scanDirectory(componentsDir);
  
  // Sort by tag name for consistent output
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

/**
 * Generate the complete react.d.ts file
 */
function generateReactTypesFile(components) {
  const header = `/**
 * React JSX type definitions for Rell UI Web Components
 * 
 * This file is AUTO-GENERATED. Do not edit manually.
 * Run: npm run generate:react-types
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

  // Group components by category for better organization
  const categorized = {
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

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning components...');
  const components = scanComponents();
  console.log(`✅ Found ${components.length} components`);
  
  console.log('📝 Generating react.d.ts...');
  const content = generateReactTypesFile(components);
  
  const outputPath = path.join(rootDir, 'src/react.d.ts');
  fs.writeFileSync(outputPath, content, 'utf-8');
  
  console.log(`✅ Generated ${outputPath}`);
  console.log(`   ${components.length} components with types`);
}

main();

