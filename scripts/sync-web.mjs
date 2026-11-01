import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const web = process.argv[2] ?? join(root, '..', 'HArabia');
const target = join(root, 'src', 'shared');

const files = [
  'countries.ts',
  'contact.ts',
  'types.ts',
  'stay.ts',
  'money.ts',
  'hotel-cities.ts',
  'hotel-boards.ts',
  'hotel-time.ts',
  'hotel-facilities.ts',
  'hotels/types.ts',
  'hotels-data.ts',
  'tours-data.ts',
  'packages-data.ts',
  'concerts-data.ts',
  'destinations-data.ts',
  'articles-data.ts',
  'qatar-events-data.ts',
  'vip-data.ts',
  'testimonials-data.ts',
  'i18n/config.ts',
  'i18n/dictionaries/en.ts',
  'i18n/dictionaries/hy.ts',
  'i18n/dictionaries/ru.ts',
  'i18n/dictionaries/ar.ts',
];

rmSync(target, { recursive: true, force: true });
for (const file of files) {
  const out = join(target, file);
  const source = readFileSync(join(web, 'lib', file), 'utf8').replace(
    /(from\s+["'])@\/lib\/([^"']+)(["'])/g,
    (_, start, path, end) => {
      let rel = relative(dirname(out), join(target, path));
      if (!rel.startsWith('.')) rel = `./${rel}`;
      return `${start}${rel}${end}`;
    },
  );
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, source);
}
console.log(`Copied ${files.length} files from ${web} to src/shared.`);
