import { useEffect, useMemo, useRef, useState } from 'react';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import PropertyDetail from '../components/PropertyDetail';
import { useProjects } from '../hooks/useProjects';
import { introDone } from '../lib/intro';
import { useBackgroundVideo } from '../lib/backgroundVideo';
import './Shortlist.css';

/**
 * The homepage shortlist as one full-screen page, the fourth and last of the
 * pages that slide one gesture at a time (see lib/heroScroll).
 *
 * Same content as before — the first four projects that have a photograph,
 * with the way through to the full catalogue — pared back to a name, a place
 * and a price where one is recorded. Everything else lives on /projects.html.
 *
 * The footage behind is stock (Coverr, free licence): a generic skyline, not
 * any project on this list.
 */
export default function Shortlist() {
  const { projects } = useProjects();
  const SHORTLIST = useMemo(() => projects.filter((p) => p.image).slice(0, 4), [projects]);

  const root = useRef(null);
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => useBackgroundVideo(root, videoRef, introDone), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="short on-dark"
      id="listings"
      ref={root}
      data-inview={entered ? 'true' : undefined}
    >
      <div className="short__stage" aria-hidden="true">
        <div className="short__shell">
          <video
            ref={videoRef}
            className="short__video"
            muted loop playsInline
            preload="none"
            poster="/videos/projects-bg-poster.jpg"
            tabIndex={-1}
          >
            <source src="/videos/projects-bg-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="short__wash" />
      </div>

      <div className="short__inner">
        <header className="short__head">
          <div>
            <Label>Projects</Label>
            <SplitReveal as="h2" className="short__title">
              A shortlist worth seeing
            </SplitReveal>
          </div>
          <div className="short__aside">
            <p className="short__count">
              {String(SHORTLIST.length).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}{' '}
              projects
            </p>
            <Pill tone="white" size="sm" href="/projects.html">
              Explore all projects
            </Pill>
          </div>
        </header>

        <ul className="short__grid">
          {SHORTLIST.map((p, i) => (
            <li className="short__flap" key={p.id} style={{ '--i': i }}>
              <button
                type="button"
                className="short__card"
                onClick={() => setSelected(p)}
                data-tilt="7"
                aria-label={`View details for ${p.name}`}
              >
                <img className="short__img" src={p.image} alt={p.imageAlt} loading="lazy" />
                <span className="short__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="short__go" aria-hidden="true">View details &rarr;</span>
                <span className="short__body">
                  <span className="short__name">{p.name}</span>
                  <span className="short__meta">
                    {[p.area, p.priceFrom && `From ${p.priceFrom}`].filter(Boolean).join(' · ')}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && <PropertyDetail project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
