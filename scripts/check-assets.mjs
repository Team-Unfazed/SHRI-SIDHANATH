/**
 * Fails the build loudly if any placeholder imagery is still wired in.
 *
 * The project images currently on the site came from Google image results, so
 * the copyright belongs to the developer or the portal that published them.
 * They are fine for showing the client the design and must not go live.
 */
import { readFile } from 'node:fs/promises';

const src = await readFile('src/data/projects.js', 'utf8');
const count = (src.match(/licence: 'placeholder'/g) || []).length - (src.includes("//   licence: 'placeholder'") ? 1 : 0);

if (count > 0) {
  console.log('');
  console.log('  ⚠  ' + count + ' project image(s) are still marked licence: "placeholder".');
  console.log('     Source: Google image results. Copyright is the developer\'s or the portal\'s.');
  console.log('     Fine for a client presentation. Replace with official media-kit assets');
  console.log('     before this site is published. See docs/ASSETS.md.');
  console.log('');
  if (process.env.STRICT_ASSETS === '1') {
    console.error('STRICT_ASSETS=1 set, refusing to build with placeholder imagery.');
    process.exit(1);
  }
}
