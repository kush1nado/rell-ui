const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'dist', 'index.d.ts');
if (fs.existsSync(p)) {
  const content = fs.readFileSync(p, 'utf-8');
  if (!content.includes('react.d.ts')) {
    fs.writeFileSync(p, '/// <reference path="./react.d.ts" />\n' + content);
  }
}
