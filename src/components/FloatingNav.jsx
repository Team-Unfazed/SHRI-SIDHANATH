import { useEffect, useRef, useState } from 'react';
import { site, tel } from '../data/site';
import './FloatingNav.css';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#listings' },
  { label: 'Locations', href: '#locations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

/* Long enough for the fold-away to read, short enough that a link click never
   feels held up. Matches the `fmenu-out` keyframes in the stylesheet. */
const CLOSE_MS = 220;

/* The section the reader is in when the menu opens: the last one whose top has
   passed 40% of the viewport. */
function currentSection() {
  let current = LINKS[0].href;
  for (const l of LINKS) {
    const el = document.querySelector(l.href);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.href;
  }
  return current;
}

/**
 * The navigation is a single black pill fixed to the bottom of the viewport —
 * the one piece of chrome on the page. It replaces a header entirely, which is
 * what lets the hero word run to the very top edge of the screen.
 *
 * The menu is a popover that unfolds out of the pill, not a page: the site stays
 * visible and scrollable behind it, and a click anywhere outside puts it away.
 *
 * The left slot is a live count of what the consultancy currently markets,
 * standing in for the template's cart badge. It is a real number read from the
 * project list, not decoration.
 */
export default function FloatingNav({ count }) {
  const [open, setOpen] = useState(false);
  /* The panel stays mounted through its exit animation, then is hidden. */
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(LINKS[0].href);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (open) {
      setCurrent(currentSection());
      setMounted(true);
      return undefined;
    }
    const t = setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  /* Escape, a click outside the pill and panel, or scrolling on puts it away.
     The flag on <body> tells the intro curtain the menu is open. */
  useEffect(() => {
    if (!open) return undefined;
    document.body.dataset.navOpen = 'true';

    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => {
      if (navRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const startY = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - startY) > 120 && setOpen(false);

    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      delete document.body.dataset.navOpen;
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  return (
    <>
      <nav className="fnav" aria-label="Primary" ref={navRef} data-open={open || undefined}>
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
        ref={menuRef}
        className="fmenu on-dark"
        data-state={open ? 'open' : 'closing'}
        hidden={!mounted}
      >
        <div className="fmenu__head">
          <span className="mono-sm">
            <span className="fmenu__dot" aria-hidden="true" /> Navigate
          </span>
          <span className="mono-sm fmenu__hint">Esc to close</span>
        </div>

        <ul className="fmenu__list">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a
                href={l.href}
                aria-current={current === l.href ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="fmenu__num mono-sm">{String(i + 1).padStart(2, '0')}</span>
                <span className="fmenu__label">{l.label}</span>
                <svg className="fmenu__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="fmenu__foot">
          <a className="fmenu__btn fmenu__btn--primary" href={tel}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            Call now
          </a>
          <a className="fmenu__btn" href={site.whatsapp} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            WhatsApp
          </a>
        </div>
        <p className="fmenu__rera mono-sm">
          {site.phoneDisplay} &middot; MahaRERA {site.rera}
        </p>
      </div>
    </>
  );
}
