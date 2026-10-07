import { useEffect, useMemo, useRef, useState } from 'react';
import Label from '../components/Label';
import Pill from '../components/Pill';
import SplitReveal from '../components/SplitReveal';
import ProjectRing from '../components/ProjectRing';
import ProjectCard from '../components/ProjectCard';
import PropertyDetail from '../components/PropertyDetail';
import EnquiryModal from '../components/EnquiryModal';
import { useProjects } from '../hooks/useProjects';
import { site } from '../data/site';
import { gsap, reducedMotion, initTilt, ScrollTrigger } from '../lib/motion';
import './ProjectsPage.css';

const pad = (n) => String(n).padStart(2, '0');

/* Filters by market. Panvel and New Panvel read as one market to a buyer. */
const marketOf = (p) => (p.area === 'New Panvel' ? 'Panvel' : p.area);

/**
 * /projects.html — the full catalogue.
 *
 * A dark stage with every project on a 3D ring, then the complete list as a
 * filterable grid. The homepage carries only a shortlist and links here.
 */
export default function ProjectsPage() {
  const { projects } = useProjects();
  const [market, setMarket] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const grid = useRef(null);

  const MARKETS = useMemo(
    () => ['All', ...new Set(projects.map(marketOf).filter(Boolean))],
    [projects],
  );

  const shown = useMemo(
    () => projects.filter((p) => (market === 'All' || marketOf(p) === market) &&
      [p.name, p.developer, p.location, p.area, p.district, p.pincode, p.reraNumber, p.status, p.projectType, p.category]
        .filter(Boolean).join(' ').toLowerCase().includes(query.trim().toLowerCase())),
    [projects, market, query]
  );

  /* Each time the filter changes, the cards that are now showing rise out of
     depth in turn, and pick up the pointer tilt. */
  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const cards = el.querySelectorAll('.pp__item');
    let tween = null;
    if (!reducedMotion()) {
      tween = gsap.fromTo(
        cards,
        { opacity: 0, y: 50, rotationX: 18, transformPerspective: 1100, transformOrigin: '50% 100%' },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.06,
          ease: 'expo.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }
    const offTilt = initTilt(el);
    ScrollTrigger.refresh();
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      offTilt();
    };
  }, [shown]);

  return (
    <>
      <a className="skip-link" href="#all">
        Skip to all projects
      </a>

      <header className="pp__bar on-dark">
        <a className="pp__brand" href="/">
          <img src="/images/branding/logo-mark-trimmed.png" alt="" width="36" height="20" />
          <span>{site.name}</span>
        </a>
        <nav className="pp__nav mono-sm" aria-label="Projects page">
          <a href="/">&larr; Home</a>
          <Pill href="/#contact" size="sm">
            Enquire
          </Pill>
        </nav>
      </header>

      <main>
        <section className="pp__stage on-dark">
          <div className="wrap">
            <div className="pp__head">
              <div>
                <Label>Portfolio</Label>
                <SplitReveal as="h1" className="h1 pp__title" autoplay delay={0.1}>
                  Projects we market
                </SplitReveal>
              </div>
              <p className="pp__lede">
                The {pad(projects.length)} projects the desk currently markets. Drag the
                ring, or let it turn.
              </p>
            </div>

            <ProjectRing items={projects} onOpen={setSelected} />
          </div>
        </section>

        <section className="pp__all band" id="all">
          <div className="wrap">
            <div className="pp__all-head">
              <div>
                <Label>All projects</Label>
                <h2 className="h2 pp__all-title">The full list</h2>
              </div>
              <div className="pp__filters" role="group" aria-label="Filter by market">
                {MARKETS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className="pp__filter mono-sm"
                    aria-pressed={market === m}
                    onClick={() => setMarket(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <label className="pp__search mono-sm">
              Search projects
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, promoter, location or RERA number" />
            </label>
            <p className="pp__count mono-sm" aria-live="polite">
              Showing {pad(shown.length)} of {pad(projects.length)}
            </p>

            <ul className="pp__grid" ref={grid}>
              {shown.map((p) => (
                <li className="pp__item" key={p.id}>
                  <ProjectCard project={p} onOpen={setSelected} />
                </li>
              ))}
            </ul>
            {shown.length === 0 && <p>No matching projects. Try another search or market.</p>}
          </div>
        </section>

        <section className="pp__cta on-dark">
          <div className="wrap pp__cta-inner">
            <h2 className="h2">Looking for something specific?</h2>
            <p className="pp__lede">
              Tell the desk what you need and we will come back with a shortlist.
            </p>
            <div className="pp__cta-actions">
              <Pill href={site.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp the desk
              </Pill>
              <Pill href={`tel:${site.phoneIntl}`} tone="ghost">
                {site.phoneDisplay}
              </Pill>
            </div>
          </div>
        </section>
      </main>

      <footer className="pp__foot on-dark mono-sm">
        <div className="wrap pp__foot-inner">
          <span>{site.fullName}</span>
          <span>
            {site.reraAuthority} {site.rera}
          </span>
          <a href="/">Back to home</a>
        </div>
      </footer>

      {selected && <PropertyDetail project={selected} onClose={() => setSelected(null)} />}
      <EnquiryModal />
    </>
  );
}
