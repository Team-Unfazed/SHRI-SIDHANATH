import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { useShowcaseScroll } from '../lib/useShowcaseScroll';
import './ShowcasePage.css';

const CHAPTERS = [
  {
    id: 'perspective', label: 'A new perspective', category: 'Panvel & Navi Mumbai',
    title: ['Your next chapter.', 'A better address.'],
    description: 'Discover places that move you. Find a property that feels like your own.',
    action: 'Discover our world', next: 1,
    video: '/videos/main-bg-video.mp4', image: '/videos/main-bg-poster.jpg',
    note: 'A new perspective on property',
  },
  {
    id: 'residences', label: 'Places to call home', category: 'The residential collection',
    title: ['Make room', 'for living.'],
    description: 'From your first home to your next move. Explore homes across Panvel and Navi Mumbai.',
    action: 'Explore residences', href: '/projects.html',
    image: '/images/scenes/estate-wide-1600.webp', position: '67% center',
    note: 'Homes. Neighbourhoods. Possibilities.',
  },
  {
    id: 'living', label: 'Life, considered', category: 'Buy / Sell / Rent',
    title: ['A little more space.', 'A lot more life.'],
    description: 'A new outlook, a quieter corner, a place to make your own. Let us help you find it.',
    action: 'Find your next property', href: '/projects.html',
    image: '/images/services/resale-apartment-living-1400.webp', position: 'center',
    note: 'Every move starts with you',
  },
  {
    id: 'advisory', label: 'Your property partners', category: 'Shri Sidhanath / New Panvel',
    title: ['Local knowledge.', 'Personal attention.'],
    description: 'Meet your property partners. From the first conversation to the final handover.',
    action: 'Start a conversation', href: '/#contact',
    image: '/images/office/office-interior-signage-1400.webp', position: '65% center',
    note: `MahaRERA ${site.rera}`,
  },
];

function Arrow({ down = false }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    {down ? <path d="M12 4v16m-6-6 6 6 6-6" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>;
}

function Background({ chapter, active, paused }) {
  const video = useRef(null);
  useEffect(() => {
    const el = video.current;
    if (!el) return undefined;
    const sync = () => {
      if (active && !paused && !document.hidden) el.play().catch(() => {});
      else el.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => { el.pause(); document.removeEventListener('visibilitychange', sync); };
  }, [active, paused]);
  return <div className="showcase__media" aria-hidden="true">
    {chapter.video
      ? <video ref={video} src={chapter.video} poster={chapter.image} muted loop playsInline preload="metadata" tabIndex={-1} />
      : <img src={chapter.image} alt="" decoding="async" style={{ objectPosition: chapter.position }} />}
  </div>;
}

export default function ShowcasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const menu = useRef(null);
  const { active, moving, reduce, goTo } = useShowcaseScroll(CHAPTERS.length, menuOpen);
  const motionPaused = paused || reduce || hidden;

  useEffect(() => {
    const change = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);
  useEffect(() => {
    if (menuOpen) menu.current?.showModal();
    else menu.current?.close();
  }, [menuOpen]);

  const select = index => { setMenuOpen(false); goTo(index); };
  const next = () => goTo(active === CHAPTERS.length - 1 ? 0 : active + 1);

  return <div className={`showcase${motionPaused ? ' showcase--paused' : ''}${reduce ? ' showcase--reduced' : ''}`} data-page={active + 1} data-moving={moving}>
    <a className="showcase__skip" href="/">Go to main website</a>
    <header className="showcase__header">
      <button className="showcase__menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-haspopup="dialog" aria-expanded={menuOpen}>
        <span className="showcase__hamburger" aria-hidden="true"><i /><i /></span><span>Menu</span>
      </button>
      <a className="showcase__brand" href="/" aria-label="Shri Sidhanath main website">SHRI SIDHANATH<span>REAL ESTATE &amp; ADVISORY</span></a>
      <a className="showcase__enquire" href="/#contact">Enquire <Arrow /></a>
    </header>

    <main className="showcase__viewport" tabIndex={-1} aria-label="The Living Collection" aria-roledescription="slideshow">
      <div className="showcase__track" style={{ '--chapter': active }}>
        {CHAPTERS.map((chapter, index) => {
          const Heading = index === 0 ? 'h1' : 'h2';
          return <section className={`showcase__panel showcase__panel--${chapter.id}${index === active ? ' is-active' : ''}`} key={chapter.id} id={chapter.id}
            aria-label={`${index + 1} of ${CHAPTERS.length}: ${chapter.label}`} aria-hidden={index !== active} inert={index !== active}>
            <Background chapter={chapter} active={index === active} paused={motionPaused} />
            <div className="showcase__scrim" aria-hidden="true" />
            <div className="showcase__content">
              <p className="showcase__eyebrow">{chapter.category}</p>
              <Heading className="showcase__title">{chapter.title.map(line => <span key={line}>{line}</span>)}</Heading>
              <p className="showcase__description">{chapter.description}</p>
              {chapter.href
                ? <a className="showcase__action" href={chapter.href}>{chapter.action}<Arrow /></a>
                : <button className="showcase__action" type="button" onClick={() => goTo(chapter.next)}>{chapter.action}<Arrow /></button>}
            </div>
            <p className="showcase__scene-note">{chapter.note}</p>
          </section>;
        })}
      </div>
    </main>

    <nav className="showcase__chapters" aria-label="Explore the collection">
      {CHAPTERS.map((chapter, index) => <button type="button" key={chapter.id} onClick={() => goTo(index)} aria-label={`Go to ${chapter.label}`} aria-current={index === active ? 'step' : undefined}>
        <span className="showcase__chapter-label">{chapter.label}</span><span className="showcase__chapter-line" />
      </button>)}
    </nav>

    <footer className="showcase__footer">
      <div className="showcase__counter" aria-hidden="true"><span>{String(active + 1).padStart(2, '0')}</span><span className="showcase__progress"><i style={{ width: `${(active + 1) / CHAPTERS.length * 100}%` }} /></span><span>04</span></div>
      <button className="showcase__next" type="button" onClick={next}>{active === CHAPTERS.length - 1 ? 'Back to the beginning' : 'Scroll to explore'}<Arrow down /></button>
      <button className="showcase__pause" type="button" onClick={() => setPaused(value => !value)} disabled={reduce} aria-label={reduce ? 'Background motion reduced' : paused ? 'Play backgrounds' : 'Pause backgrounds'} aria-pressed={motionPaused}>
        <span aria-hidden="true">{motionPaused ? '▷' : 'Ⅱ'}</span><span>{reduce ? 'Motion off' : paused ? 'Play' : 'Pause'}</span>
      </button>
    </footer>
    <p className="showcase__sr-only" aria-live="polite" aria-atomic="true">Screen {active + 1} of 4: {CHAPTERS[active].label}</p>

    <dialog className="showcase__menu" ref={menu} aria-labelledby="showcase-menu-title" onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)}>
      <div className="showcase__menu-head"><p id="showcase-menu-title">Explore the collection</p><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Collection chapters">{CHAPTERS.map((chapter, index) => <button type="button" key={chapter.id} onClick={() => select(index)}><span>0{index + 1}</span>{chapter.label}<Arrow /></button>)}</nav>
      <div className="showcase__menu-foot"><a href="/">Main website <Arrow /></a><a href={`tel:${site.phoneIntl}`}>{site.phoneDisplay}</a></div>
    </dialog>
  </div>;
}
