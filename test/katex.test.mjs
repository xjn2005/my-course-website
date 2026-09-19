import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('uses the KaTeX version expected by rehype-katex', () => {
  const katex = JSON.parse(readFileSync(new URL('../node_modules/katex/package.json', import.meta.url)));

  assert.equal(katex.version, '0.16.47');
});
