import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '_site');
fs.mkdirSync(output, { recursive: true });
// Explicitly package public assets; keep LaTeX sources and repository docs out.
for (const file of ['index.html', 'stylesheet.css', 'script.js', '.nojekyll', 'robots.txt', 'sitemap.xml']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
fs.cpSync(path.join(root, 'images'), path.join(output, 'images'), { recursive: true });
fs.mkdirSync(path.join(output, 'data'), { recursive: true });
for (const file of fs.readdirSync(path.join(root, 'data')).filter(file => file.endsWith('.pdf'))) {
  fs.copyFileSync(path.join(root, 'data', file), path.join(output, 'data', file));
}
console.log('Prepared GitHub Pages artifact in _site/.');
