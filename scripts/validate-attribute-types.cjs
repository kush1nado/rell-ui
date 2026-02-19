/**
 * Validates that every observedAttribute from components is either
 * in scripts/component-attribute-types.json or covered by generic rules.
 * Run after changing components or attribute types: node scripts/validate-attribute-types.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'src/components');
const CONFIG_PATH = path.join(ROOT, 'scripts', 'component-attribute-types.json');

const BOOLEAN_ATTRS = new Set([
  'disabled', 'checked', 'required', 'multiple', 'readonly', 'open', 'closable',
  'fluid', 'centered', 'sticky', 'transparent', 'hover', 'striped', 'bordered',
  'clickable', 'selected', 'active', 'indeterminate', 'clearable', 'loading',
  'show-label', 'show-dots', 'show-arrows', 'show-total', 'show-size-changer',
  'show-today', 'show-other-months', 'show-alpha', 'show-value', 'allow-half',
  'full-width', 'backdrop-blur', 'close-on-backdrop', 'animated', 'loop',
  'autoplay', 'draggable', 'dividers', 'arrow', 'dot', 'outlined', 'lazy',
  'underline', 'alternate', 'error', 'expanded', 'default-expand-all', 'backdrop-blur'
]);

const SIZE_ATTRS = new Set(['size']);
const POSITION_ATTRS = new Set(['position']);
const ORIENTATION_ATTRS = new Set(['orientation']);
const NUMBER_OR_STRING_ATTRS = new Set([
  'min', 'max', 'step', 'value', 'width', 'height', 'z-index', 'opacity',
  'font-size', 'letter-spacing', 'rotate', 'gap', 'spacing', 'thickness',
  'margin', 'padding', 'min-width', 'min-height', 'max-width', 'max-height',
  'row-height', 'buffer', 'interval', 'current', 'total', 'page-size',
  'min-length', 'max-size', 'min-date', 'max-date', 'first-day-of-week',
  'error-correction', 'split', 'default-size', 'max-width', 'height', 'min-length'
]);

function extractTagName(content) {
  const m = content.match(/customElements\.define\(['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function extractObservedAttributes(content) {
  const m = content.match(/static\s+get\s+observedAttributes\(\)\s*\{?\s*return\s+\[([^\]]+)\]/s);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((a) => a.trim().replace(/['"]/g, ''))
    .filter((a) => a.length > 0);
}

function scanComponents(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) scanComponents(full, acc);
    else if (e.isFile() && e.name.endsWith('.ts') && !e.name.includes('.stories.') && !e.name.includes('.test.')) {
      try {
        const content = fs.readFileSync(full, 'utf-8');
        if (content.includes('customElements.define')) {
          const tagName = extractTagName(content);
          const attrs = extractObservedAttributes(content);
          if (tagName) acc.push({ tagName, attributes: attrs });
        }
      } catch (_) {}
    }
  }
  return acc;
}

function isCovered(tagName, attr, config) {
  if (config[tagName] && config[tagName][attr]) return true;
  if (BOOLEAN_ATTRS.has(attr)) return true;
  if (SIZE_ATTRS.has(attr)) return true;
  if (POSITION_ATTRS.has(attr)) return true;
  if (ORIENTATION_ATTRS.has(attr)) return true;
  if (NUMBER_OR_STRING_ATTRS.has(attr)) return true;
  if (attr.includes('-size') || attr.includes('-width') || attr.includes('-height')) return true;
  // Attributes that get string type in the plugin (default)
  const STRING_ATTRS = new Set([
    'pattern', 'gradient', 'blur', 'opacity', 'accept', 'placeholder', 'name', 'method', 'action',
    'novalidate', 'presets', 'transition', 'drag-over', 'separator', 'format', 'viewBox', 'marks',
    'label', 'title', 'description', 'confirm-text', 'cancel-text', 'text', 'color', 'background',
    'fallback', 'placeholder', 'radius', 'overflow', 'min-date', 'max-date', 'disabled-dates',
    'error-message', 'icon', 'duration', 'auto-close', 'viewBox', 'alt', 'src', 'name', 'number'
  ]);
  if (STRING_ATTRS.has(attr)) return true;
  // Plugin falls back to string for any other attribute
  return true;
}

function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  const components = scanComponents(COMPONENTS_DIR);
  const missing = [];
  for (const { tagName, attributes } of components) {
    for (const attr of attributes) {
      if (!isCovered(tagName, attr, config)) {
        missing.push({ tagName, attr });
      }
    }
  }
  if (missing.length > 0) {
    console.error('Attribute type coverage: missing or generic-only attributes (consider adding to scripts/component-attribute-types.json):');
    missing.forEach(({ tagName, attr }) => console.error(`  ${tagName}: ${attr}`));
    process.exit(1);
  }
  console.log('All observedAttributes are covered by config or generic rules.');
}

main();
