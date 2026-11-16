import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Use one page heading');
assert.equal((html.match(/<main\b/g) || []).length, 1, 'Use one main landmark');
assert.match(html, /<html lang="en">/);
assert.match(html, /<link rel="canonical" href="https:\/\/lloydkwak.github.io\/">/);

let checked = 0;
for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(value)) continue;
  const [relative, fragment] = value.split('#');
  if (fragment && !relative) assert(ids.includes(fragment), `Missing anchor: ${value}`);
  if (relative) {
    const segments = decodeURIComponent(relative.split('?')[0]).split('/');
    let parent = root;
    for (const segment of segments) {
      assert(fs.readdirSync(parent).includes(segment), `Missing or incorrectly cased asset: ${relative}`);
      parent = path.join(parent, segment);
    }
    assert(fs.statSync(parent).isFile(), `Not a file: ${relative}`);
    checked++;
  }
}
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
  assert.match(tag, /alt="[^"]+"/, 'Images need descriptions');
  assert.match(tag, /width="\d+"/);
  assert.match(tag, /height="\d+"/);
}
for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
for (const name of ['CV', 'Career_Description', 'Research_Portfolio']) {
  const pdf = fs.readFileSync(path.join(root, 'data', `DongGeon_Kwak_${name}.pdf`));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', `Invalid PDF: ${name}`);
}
assert(fs.existsSync(path.join(root, '.nojekyll')));
console.log(`Validated page landmarks, metadata, images, anchors, ${checked} local links and all 3 PDFs.`);
