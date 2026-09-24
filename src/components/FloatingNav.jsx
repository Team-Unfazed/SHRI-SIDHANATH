import { useEffect, useState } from 'react';
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

      <div id="fnav-menu" className="fmenu on-dark" data-open={open || undefined} hidden={!open}>
        <ul className="fmenu__list">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mono-sm">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="fmenu__foot">
          <a className="mono" href={tel}>
            {site.phoneDisplay}
          </a>
          <a className="mono" href={site.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <span className="mono">MahaRERA {site.rera}</span>
        </div>
      </div>
    </>
  );
}
