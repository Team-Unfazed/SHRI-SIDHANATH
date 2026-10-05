/**
 * Build-time SEO content, generated from the same data the React app renders.
 *
 * Both pages mount into an empty #root, so a crawler that reads the HTML before
 * running JavaScript (Bing, social previews, AI search, and Google's first pass)
 * would see almost nothing. This plugin fills the markers in index.html and
 * projects.html with plain, semantic HTML — headings, services, localities,
 * FAQs, projects — plus matching JSON-LD. React replaces the fallback on mount,
 * so visitors never see it; it is the same content, never a keyword-stuffed
 * variant (that is cloaking, and Google penalises it).
 *
 * Because it is generated from src/data, the fallback cannot drift from the
 * page. Edit the data, not this file.
 */
import { services, locations, faqs } from '../src/data/content.js';
import { projects } from '../src/data/projects.js';
import { site } from '../src/data/site.js';

const ORIGIN = 'https://www.shrisidhanath.com';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const jsonld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function homeFallback() {
  const svc = services
    .map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p></li>`)
    .join('');
  const loc = locations
    .map((l) => `<li><h3>Real estate agent in ${esc(l.name)}</h3><p>${esc(l.note)}</p></li>`)
    .join('');
  const faq = faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('');
  const proj = projects
    .map((p) => `<li>${esc(p.name)}, ${esc(p.area)}${p.config ? ` (${esc(p.config)})` : ''}</li>`)
    .join('');

  return `
        <section><h2>Real estate services in Panvel and Navi Mumbai</h2><ul>${svc}</ul></section>
        <section><h2>Areas we serve</h2><ul>${loc}</ul></section>
        <section><h2>Projects we market</h2><ul>${proj}</ul><p><a href="/projects.html">See all projects in Panvel and Navi Mumbai</a></p></section>
        <section><h2>Frequently asked questions</h2>${faq}</section>`;
}

function faqSchema() {
  return jsonld({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

function projectsFallback() {
  const items = projects
    .map(
      (p) =>
        `<li><h2>${esc(p.name)}</h2><p>${esc([p.location || p.area, p.category, p.config].filter(Boolean).join(' · '))}</p>` +
        `${p.priceFrom ? `<p>From ${esc(p.priceFrom)}</p>` : ''}${p.detail ? `<p>${esc(p.detail)}</p>` : ''}` +
        `${p.reraNumber ? `<p>Promoter: ${esc(p.developer)}. MahaRERA: ${esc(p.reraNumber)}</p><a href="${esc(p.sourceUrl)}">View on MahaRERA</a>` : ''}</li>`
    )
    .join('');
  return `
      <main data-fallback>
        <h1>New projects and properties in Panvel, Kharghar and Navi Mumbai</h1>
        <p>Residential and land projects marketed by ${esc(site.fullName)}, a MahaRERA-registered
        (${esc(site.rera)}) real estate consultant in New Panvel. Call <a href="tel:${esc(site.phoneIntl)}">${esc(site.phoneDisplay)}</a>.</p>
        <ul>${items}</ul>
        <p><a href="/">Shri Sidhanath, real estate agent in Panvel</a></p>
      </main>`;
}

function projectsSchema() {
  return jsonld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects marketed by Shri Sidhanath in Panvel and Navi Mumbai',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': p.source === 'MahaRERA' && !p.projectType ? 'Place' : 'Residence',
        name: p.name,
        ...(p.detail ? { description: p.detail } : {}),
        ...(p.reraNumber ? { identifier: p.reraNumber, sameAs: p.sourceUrl } : {}),
        address: { '@type': 'PostalAddress', addressLocality: p.area, addressRegion: 'Maharashtra', addressCountry: 'IN' },
        ...(p.image ? { image: ORIGIN + p.image } : {}),
      },
    })),
  });
}

export default function seoFallback() {
  return {
    name: 'seo-fallback',
    transformIndexHtml(html) {
      return html
        .replace('<!--seo:home-->', homeFallback())
        .replace('<!--seo:faq-schema-->', faqSchema())
        .replace('<!--seo:projects-->', projectsFallback())
        .replace('<!--seo:projects-schema-->', projectsSchema());
    },
  };
}
