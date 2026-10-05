import { useState } from 'react';
import Label from '../components/Label';
import Pill from '../components/Pill';
import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';
import { locationPages } from '../data/content';
import { site, tel } from '../data/site';
import './LocationPage.css';

/**
 * Shared layout for the three location landing pages (Panvel, Raigad, Navi
 * Mumbai — src/pages/PanvelPage.jsx etc. each pass their own entry from
 * src/data/content.js's `locationPages`). Not wired into the primary nav:
 * these are reached from the Locations and Footer sections on the homepage,
 * from each other, and from search/AI-answer results.
 *
 * Deliberately plainer than the homepage — one scroll-length page with a
 * hero, the micro-market breakdown, an FAQ accordion and a close, built from
 * the same Label/Pill/SplitReveal/Reveal primitives as the rest of the site
 * so it does not look like a bolted-on page.
 */
export default function LocationPage({ data }) {
  const [open, setOpen] = useState(0);
  const others = locationPages.filter((l) => l.id !== data.id);

  return (
    <>
      <a className="skip-link" href="#faq">
        Skip to frequently asked questions
      </a>

      <header className="locp__bar">
        <a className="locp__brand" href="/">
          <img src="/images/branding/logo-mark-trimmed.png" alt="" width="36" height="20" />
          <span>{site.name}</span>
        </a>
        <nav className="locp__nav mono-sm" aria-label="Location page">
          <a href="/">&larr; Home</a>
          <Pill href={tel} size="sm">
            {site.phoneDisplay}
          </Pill>
        </nav>
      </header>

      <main id="main">
        <section className="locp__hero band">
          <div className="wrap locp__hero-inner">
            <div className="locp__hero-copy">
              <nav aria-label="Breadcrumb" className="locp__crumb mono-sm">
                <ol>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li aria-current="page">{data.breadcrumbLabel}</li>
                </ol>
              </nav>
              <Label>{data.kicker}</Label>
              <SplitReveal as="h1" className="h1 locp__title" autoplay delay={0.1}>
                {data.h1}
              </SplitReveal>
              <p className="lede locp__lede">{data.lede}</p>
              <div className="locp__hero-actions">
                <Pill href={tel}>{site.phoneDisplay}</Pill>
                <Pill as="a" href={site.whatsapp} target="_blank" rel="noreferrer" tone="ghost">
                  WhatsApp the desk
                </Pill>
              </div>
            </div>
            <Reveal className="locp__hero-media" depth={18}>
              <img
                className="locp__hero-img"
                src={data.heroImage}
                srcSet={data.heroImageSmall ? `${data.heroImageSmall} 800w, ${data.heroImage} 1200w` : undefined}
                sizes="(max-width: 980px) 100vw, 46vw"
                alt={data.heroImageAlt}
                width="1200"
                height="662"
                loading="eager"
              />
            </Reveal>
          </div>
        </section>

        <section className="locp__intro band">
          <div className="wrap locp__intro-inner">
            {data.intro.map((paragraph) => (
              <p className="lede" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
            <address className="locp__address mono-sm">
              {site.address.line1}, {site.address.line2}, {site.address.line3},{' '}
              {site.address.city} {site.address.pincode} &middot; Open {site.google.hoursLabel} &middot;{' '}
              {site.reraAuthority} {site.rera}
            </address>
          </div>
        </section>

        <section className="locp__markets band" id="markets">
          <div className="wrap">
            <Reveal className="locp__markets-head">
              <Label>Micro-markets</Label>
              <h2 className="h2 locp__markets-title">Where in {data.navLabel}, exactly</h2>
            </Reveal>
            <ul className="locp__markets-grid">
              {data.submarkets.map((m, i) => (
                <Reveal as="li" className="locp__market" key={m.name} delay={(i % 3) * 0.05}>
                  <h3 className="h5">{m.name}</h3>
                  <p>{m.note}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="locp__faq band" id="faq">
          <div className="wrap">
            <Reveal className="locp__faq-head">
              <Label>Frequently asked questions</Label>
              <h2 className="h2 locp__faq-title">{data.navLabel}, answered</h2>
            </Reveal>

            <ul className="locp__faq-list">
              {data.faqs.map((f, i) => (
                <li className="locp__faq-item" key={f.q}>
                  <h3>
                    <button
                      type="button"
                      className="locp__faq-q"
                      aria-expanded={open === i}
                      onClick={() => setOpen(open === i ? -1 : i)}
                    >
                      <span className="h5">{f.q}</span>
                      <span className="locp__faq-mark" data-open={open === i || undefined} aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </button>
                  </h3>
                  <div className="locp__faq-a" data-open={open === i || undefined}>
                    <p>{f.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="locp__cta band on-dark">
          <div className="wrap locp__cta-inner">
            <h2 className="h2">Looking for something in {data.navLabel}?</h2>
            <p className="lede">Tell the desk what you need and we will come back with a shortlist.</p>
            <div className="locp__cta-actions">
              <Pill href={site.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp the desk
              </Pill>
              <Pill href={tel} tone="ghost">
                {site.phoneDisplay}
              </Pill>
            </div>
            <nav className="locp__other-areas mono-sm" aria-label="Other areas we serve">
              <span>Also serving:</span>
              {others.map((o) => (
                <a key={o.id} href={o.path}>
                  {o.navLabel}
                </a>
              ))}
              <a href="/#locations">Mumbai, Thane &amp; Pune</a>
              <a href="/projects.html">All projects</a>
            </nav>
          </div>
        </section>
      </main>

      <footer className="locp__foot mono-sm">
        <div className="wrap locp__foot-inner">
          <span>{site.fullName}</span>
          <span>
            {site.reraAuthority} {site.rera}
          </span>
          <a href="/">Back to home</a>
        </div>
      </footer>
    </>
  );
}
