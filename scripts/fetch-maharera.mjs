// One-time, explicit import research; never called by the public website.
// Uses the official public search form with a separate cookie session per number.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const requested = `PR1271012600320 P52000078843 P52000054611 P52000055992 PR1270002502927 PR1270002502892 PR1270002502891 PR1270002502890 PR1270002502889 P52000055578 P52000050193 P52000050194 P52000055662 P52000055661 PR1270002501603 PR1270002501610 PR1270002501589 P52000055578 P52000050193 P52000050194 P52000055662 P52000055661 PR1270002501603 PR1270002501610 PR1270002501589`.split(' ');
const root = 'docs/maharera';
mkdirSync(root, { recursive: true });
const temp = mkdtempSync(join(tmpdir(), 'maharera-'));
const url = 'https://www.maharera.maharashtra.gov.in/projects-search-result';
const curl = (args) => execFileSync('curl.exe', ['-sS', '-L', '--max-time', '60', ...args], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const decodePipes = (html) => html.replace(/<script type="application\/vnd.drupal-ajax"[^>]*>([\s\S]*?)<\/script>/g, (_, json) => {
  try { return JSON.parse(json).map(x => x.data || '').join('\n'); } catch { return ''; }
});
for (const rera of new Set(requested)) {
  const target = `${root}/${rera}.html`;
  if (existsSync(target) && readFileSync(target, 'utf8').includes(`# ${rera}</p>`)) continue;
  try {
    const cookie = join(temp, `${rera}.cookies`);
    const first = decodePipes(curl(['-c', cookie, url]));
    const form = first.match(/<form class="projects-search-page-form"[\s\S]*?<\/form>/)?.[0];
    const build = form?.match(/name="form_build_id" value="([^"]+)"/)?.[1];
    if (!build) throw new Error('Official search form unavailable');
    let result = '';
    let currentBuild = build;
    for (let attempt = 0; attempt < 3; attempt++) {
      result = decodePipes(curl(['-b', cookie, '-c', cookie, url, '--data-urlencode', `project_name=${rera}`, '--data', `project_type=0&project_location=&project_completion_date=&project_state=27&project_district=&form_build_id=${currentBuild}&form_id=projects_search_page_form&op=Search`]));
      if (result.includes(`# ${rera}</p>`)) break;
      const nextForm = result.match(/<form class="projects-search-page-form"[\s\S]*?<\/form>/)?.[0];
      currentBuild = nextForm?.match(/name="form_build_id" value="([^"]+)"/)?.[1] || currentBuild;
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    const card = result.match(/<div class="row shadow p-3 mb-5 bg-body rounded">[\s\S]*?(?=\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>)/)?.[0];
    if (!card || !card.includes(`# ${rera}</p>`)) {
      writeFileSync(target, result);
      console.log(rera, 'NO MATCH');
      continue;
    }
    writeFileSync(target, `<!-- Official search result retrieved ${new Date().toISOString()} from ${url} -->\n${card}`);
    const detail = card.match(/href="([^"]+)" title="View Details"/)?.[1];
    // Open the corresponding application, but do not retain duplicate JS shells.
    // Full public view currently requires a human CAPTCHA; do not bypass it.
    if (detail) curl([detail]);
    console.log(rera, card.match(/<strong>(.*?)<\/strong>/)?.[1], detail);
  } catch (error) { console.log(rera, 'ERROR', error.message); }
}
writeFileSync(`${root}/requested.json`, JSON.stringify(requested, null, 2) + '\n');
