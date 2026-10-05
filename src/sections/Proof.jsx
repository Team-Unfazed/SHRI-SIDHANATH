import { useEffect, useRef, useState } from 'react';
import Counter from '../components/Counter';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { locations } from '../data/content';
import { reducedMotion } from '../lib/motion';
import './Proof.css';

/**
 * "On the record" and "Developers" as one full-screen page, directly after
 * About and part of the same one-gesture slide (see lib/heroScroll).
 *
 * The record keeps its rule: six figures, each traceable to Google, the
 * MahaRERA register or the content layer. Nothing invented, nothing rounded up.
 *
 * The ground is a slow carousel of developer campaign artwork — only the three
 * pieces the client supplied at full width (`licence: 'client-supplied'`). The
 * other project images in the content layer are small comps marked
 * `placeholder` and are not used full-bleed. As each one comes up, a plate
 * pops up naming the developer and the project, and labels the image as the
 * developer's artwork, not a site photograph.
 */
const STATS = [
  { caption: 'Google rating', value: site.google.rating, foot: `${site.google.reviews} reviews` },
  { caption: 'Projects marketed', value: String(projects.length), foot: 'From the current list' },
  { caption: 'Markets covered', value: String(locations.length), foot: 'Mumbai to Pune' },
  { caption: 'Open every day', value: '13h', foot: site.google.hoursLabel },
  // Part of a registration number, not a quantity — it decodes, never counts.
  { caption: 'MahaRERA', value: 'A52', foot: site.rera, mode: 'decode' },
  { caption: 'Headquarters', value: '01', foot: site.headquarters },
];

const SLIDES = [
  {
    developer: 'Raheja',
    project: 'Lunaris, Raheja District',
    place: 'Navi Mumbai',
    src: '/images/locations/navi-mumbai-lunaris-1200.webp',
  },
  {
    developer: 'The House of Abhinandan Lodha',
    project: 'The House of Abhinandan Lodha',
    place: 'Maharashtra',
    src: '/images/locations/thane-hoabl-1200.webp',
  },
  {
    developer: 'Siddha',
    project: 'Passcode Great Guarantee',
    place: 'Mumbai',
    src: '/images/locations/mumbai-passcode-mulund-1200.webp',
  },
];

const HOLD = 6500;

export default function Proof() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);
  const [counting, setCounting] = useState(false);
  const grid = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setEntered(true);
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* The figures count once the tiles themselves are on screen — after the
     page has slid in, not while it is still arriving. */
  useEffect(() => {
    const el = grid.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCounting(true);
      observer.disconnect();
    }, { threshold: 0.8 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Advance only while the page is on screen. Keyed on `active` so choosing a
     slide by hand restarts the hold rather than being cut short by it. */
  useEffect(() => {
    if (!inView || reducedMotion()) return undefined;
    const timer = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), HOLD);
    return () => clearTimeout(timer);
  }, [inView, active]);

  const slide = SLIDES[active];

  return (
    <section
      className="proof on-dark"
      id="record"
      ref={root}
      data-inview={entered ? 'true' : undefined}
      data-playing={inView ? 'true' : undefined}
      style={{ '--hold': `${HOLD}ms` }}
    >
      <div className="proof__stage" aria-hidden="true">
        <div className="proof__shell">
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              className="proof__photo"
              src={s.src}
              alt=""
              loading="lazy"
              decoding="async"
              data-active={i === active ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="proof__wash" />
      </div>

      <div className="proof__main">
        {/* ---- on the record ---- */}
        <div className="proof__record">
          <Label>On the record</Label>
          <SplitReveal as="h2" className="proof__title">
            What can be checked, and where to check it
          </SplitReveal>
          <p className="proof__lede">
            Every figure here can be verified by you: on Google, on the MahaRERA register, or at our
            door.
          </p>

          <div className="proof__grid" ref={grid}>
            {STATS.map((s, i) => (
              <div className="proof__flap" key={s.caption} style={{ '--i': i }}>
                <div className="proof__tile" data-tilt="8">
                  <div className="proof__tile-top">
                    <p className="proof__caption">{s.caption}</p>
                    <span className="proof__index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="proof__value">
                    <Counter
                      value={s.value}
                      mode={s.mode}
                      when={counting}
                      duration={s.mode === 'decode' ? 3.4 : 2.6}
                      delay={0.6 + i * 0.12}
                      ease="power2.out"
                    />
                  </p>
                  <p className="proof__foot">{s.foot}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="proof__actions">
            <Pill tone="white" size="sm" href={site.google.url} target="_blank" rel="noreferrer">
              See the reviews
            </Pill>
            <p className="proof__rera">MahaRERA {site.rera}</p>
          </div>
        </div>

        {/* ---- the developer on screen ---- */}
        <div className="proof__now" id="developers">
          {/* Remounted per slide (keyed), so the plate pops up afresh each
              time the photograph changes. */}
          <div className="proof__plate" key={active}>
            <p className="proof__count">
              Projects we market
              <span>
                {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
            </p>
            <p className="proof__name" aria-label={slide.developer}>
              {slide.developer.split(' ').map((word, w, words) => {
                const offset = words.slice(0, w).join('').length;
                return (
                  <span className="proof__word" key={`${word}-${w}`} aria-hidden="true">
                    {[...word].map((char, c) => (
                      <span className="proof__char" key={c} style={{ '--c': offset + c }}>
                        {char}
                      </span>
                    ))}
                  </span>
                );
              })}
            </p>
            <p className="proof__by">
              {slide.developer === slide.project ? slide.place : `${slide.project} · ${slide.place}`}
            </p>
          </div>

          <div className="proof__dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className="proof__dot"
                aria-label={`Show ${s.project}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => setActive(i)}
              >
                <i key={i === active ? `on-${active}` : 'off'} />
              </button>
            ))}
          </div>
          <p className="proof__credit">
            Developer campaign artwork, not a site photograph. A project {site.name} has marketed —
            not a claim of partnership.
          </p>
        </div>
      </div>
    </section>
  );
}
