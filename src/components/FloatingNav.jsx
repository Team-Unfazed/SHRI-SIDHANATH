import { useEffect, useRef, useState } from 'react';
import { site, tel } from '../data/site';
import './FloatingNav.css';

const LINKS = [
  { label: 'Home', href: '#top', note: 'Start here', img: '/images/hero/arch-900.webp' },
  { label: 'About', href: '#about', note: 'Who we are', img: '/images/office/office-interior-desk-900.webp' },
  { label: 'Services', href: '#services', note: 'What we do', img: '/images/office/office-interior-signage-900.webp' },
  { label: 'Projects', href: '#listings', note: 'On the shelf', img: '/images/portfolio/residential/delta-prestige-courtyard-900.webp' },
  { label: 'Locations', href: '#locations', note: 'Where we work', img: '/images/locations/thane-hoabl-800.webp' },
  { label: 'FAQ', href: '#faq', note: 'Straight answers', img: '/images/scenes/estate-villa-900.webp' },
  { label: 'Contact', href: '#contact', note: 'Visit the office', img: '/images/office/office-shopfront-night-900.webp' },
];

/* Long enough for the fold-away to read, short enough that a link click never
   feels held up. Matches the `fmenu-out` keyframes in the stylesheet. */
const CLOSE_MS = 300;

/**
 * The navigation is a single black pill fixed to the bottom of the viewport —
 * the one piece of chrome on the page. It replaces a header entirely, which is
 * what lets the hero word run to the very top edge of the screen.
 *
 * The left slot is a live count of what the consultancy currently markets,
 * standing in for the template's cart badge. It is a real number read from the
 * project list, not decoration.
 */
export default function FloatingNav({ count }) {
  const [open, setOpen] = useState(false);
  /* The overlay stays mounted through its exit animation, then is hidden. */
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }
    const t = setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  /* Pointer position drives the tilt through CSS variables, so moving the mouse
     never re-renders the list. */
  const onPointerMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType === 'touch') return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    el.style.setProperty('--px', x.toFixed(3));
    el.style.setProperty('--py', y.toFixed(3));
  };

  /* Only touch the scroll lock while the menu is actually open. Writing '' on
     every mount clobbered the intro curtain's lock — two components owning one
     global property, with the later mount silently winning. */
  useEffect(() => {
    if (!open) return undefined;
    document.body.dataset.navOpen = 'true';
    document.body.style.overflow = 'hidden';
    return () => {
      delete document.body.dataset.navOpen;
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className="fnav" aria-label="Primary">
        <a className="fnav__count" href="#listings" aria-label={`${count} projects on the shelf`}>
          <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
            <path
              d="M4 7h12l-1 10H5L4 7Zm3 0V5a3 3 0 0 1 6 0v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="fnav__badge">{count}</span>
        </a>

        <a className="fnav__brand" href="#top">
          <img src="/images/branding/logo-mark-trimmed.png" alt="" width="36" height="20" />
          <span>
            <span className="fnav__first">Shri </span>
            <em>Sidhanath</em>
            <sup>&copy;</sup>
          </span>
        </a>

        <button
          type="button"
          className="fnav__burger"
          aria-expanded={open}
          aria-controls="fnav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="fnav__bars" data-open={open || undefined} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>

      <div
        id="fnav-menu"
        ref={stageRef}
        className="fmenu on-dark"
        data-state={open ? 'open' : 'closing'}
        hidden={!mounted}
        onPointerMove={onPointerMove}
      >
        <div className="fmenu__bg" aria-hidden="true">
          <div className="fmenu__glow" />
          <div className="fmenu__floor" />
        </div>

        <div className="fmenu__inner">
          <div className="fmenu__col">
            <p className="fmenu__eyebrow mono-sm">
              <span className="fmenu__dot" /> Menu
            </p>

            <ul className="fmenu__list">
              {LINKS.map((l, i) => (
                <li key={l.href} style={{ '--i': i }}>
                  <a
                    href={l.href}
                    data-active={active === i || undefined}
                    onClick={() => setOpen(false)}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="fmenu__num mono-sm">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fmenu__cube">
                      <span className="fmenu__face fmenu__face--front">{l.label}</span>
                      <span className="fmenu__face fmenu__face--under" aria-hidden="true">
                        {l.label}
                      </span>
                    </span>
                    <svg className="fmenu__arrow" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="fmenu__stage" aria-hidden="true">
            <div className="fmenu__card">
              <div className="fmenu__frame" />
              {LINKS.map((l, i) => (
                <img
                  key={l.href}
                  className="fmenu__shot"
                  src={l.img}
                  alt=""
                  loading="lazy"
                  data-active={active === i || undefined}
                />
              ))}
              <div className="fmenu__chip">
                <span className="mono-sm">{String(active + 1).padStart(2, '0')} / {String(LINKS.length).padStart(2, '0')}</span>
                <strong>{LINKS[active].note}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="fmenu__foot">
          <a className="fmenu__pill mono" href={tel}>
            <span>Call</span> {site.phoneDisplay}
          </a>
          <a className="fmenu__pill mono" href={site.whatsapp} target="_blank" rel="noreferrer">
            <span>Chat</span> WhatsApp
          </a>
          <span className="fmenu__rera mono-sm">MahaRERA {site.rera}</span>
        </div>
      </div>
    </>
  );
}
