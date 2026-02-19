/**
 * Tests for React type generation: all component tags present, no explicit any.
 * Run after build or with generated src/react.d.ts (e.g. npm run build && npm test).
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.join(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'src/components');
const REACT_D_TS_PATH = path.join(ROOT, 'src/react.d.ts');

function extractTagName(fileContent: string): string | null {
  const m = fileContent.match(/customElements\.define\(['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function scanTagNames(dir: string, acc: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanTagNames(full, acc);
    } else if (e.isFile() && e.name.endsWith('.ts') && !e.name.includes('.stories.') && !e.name.includes('.test.')) {
      try {
        const content = fs.readFileSync(full, 'utf-8');
        if (content.includes('customElements.define')) {
          const tag = extractTagName(content);
          if (tag) acc.push(tag);
        }
      } catch {
        // skip
      }
    }
  }
  return acc;
}

describe('React type generation', () => {

  it('generates react.d.ts with all component tags from src/components', () => {
    if (!fs.existsSync(REACT_D_TS_PATH)) {
      throw new Error('src/react.d.ts not found. Run npm run build first.');
    }
    const expectedTags = scanTagNames(COMPONENTS_DIR).sort();
    expect(expectedTags.length).toBeGreaterThan(0);

    const content = fs.readFileSync(REACT_D_TS_PATH, 'utf-8');
    for (const tag of expectedTags) {
      expect(content).toContain(`'${tag}'`);
    }
  });

  it('generated react.d.ts does not contain explicit any type', () => {
    if (!fs.existsSync(REACT_D_TS_PATH)) return;
    const content = fs.readFileSync(REACT_D_TS_PATH, 'utf-8');
    // Allow "composed: true" etc.; disallow ": any" or "?: any"
    expect(content).not.toMatch(/\?\s*:\s*any\b/);
    expect(content).not.toMatch(/:\s*any\s*[;>]/);
  });

  it('generated react.d.ts uses element class as ref type for tags', () => {
    if (!fs.existsSync(REACT_D_TS_PATH)) return;
    const content = fs.readFileSync(REACT_D_TS_PATH, 'utf-8');
    expect(content).toContain('RellButton');
    expect(content).toContain('RellDialog');
    // Second generic of DetailedHTMLProps should be element class, not HTMLElement (e.g. RellButton not HTMLElement)
    expect(content).toMatch(/'rell-button'[\s\S]*?RellButton\s*>/);
  });
});
