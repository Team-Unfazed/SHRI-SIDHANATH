import { useEffect, useRef } from 'react';
import ProjectRegistration from './ProjectRegistration';
import { site } from '../data/site';
import './PropertyDetail.css';

/**
 * The project card's click target used to BE the enquiry link — the whole
 * card jumped straight to the contact form, so there was never anywhere to
 * actually read about a property, and from /projects.html that jump left the
 * page entirely (a full reload to index.html#contact). This is that missing
 * middle step: a lightweight, same-page panel with what the card couldn't
 * show — the summary, and the full RERA record — with enquiring kept as its
 * own explicit action rather than the only thing a click could do.
 */
export default function PropertyDetail({ project: p, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const onBackdrop = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) onClose();
  };

  const meta = [p.area, p.config].filter(Boolean).join(' · ');
  const waMessage = encodeURIComponent(
    `Hello Shri Sidhanath, I'd like to enquire about ${p.name}${p.area ? ` in ${p.area}` : ''}.`
  );

  return (
    <div className="pdetail-overlay" onMouseDown={onBackdrop} role="presentation">
      <div
        className="pdetail"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdetail-title"
      >
        <button type="button" className="pdetail__close" onClick={onClose} ref={closeRef} aria-label="Close">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="pdetail__media">
          {p.image ? (
            <img src={p.image} alt={p.imageAlt} />
          ) : (
            <span className="pdetail__plate">
              <img src="/images/branding/logo-mark-trimmed.png" alt="" width="52" height="28" />
              <span className="h4">{p.developer || p.area}</span>
            </span>
          )}
          {p.category && <span className="pdetail__tag mono-sm">{p.category}</span>}
        </div>

        <div className="pdetail__body">
          <div className="pdetail__row">
            <h2 id="pdetail-title" className="h3 pdetail__name">{p.name}</h2>
            {p.priceFrom && <span className="pdetail__price mono-sm">From {p.priceFrom}</span>}
          </div>
          {(meta || p.developer) && (
            <p className="pdetail__meta mono-sm">{[p.developer, meta].filter(Boolean).join(' · ')}</p>
          )}

          {p.detail && <p className="pdetail__summary">{p.detail}</p>}

          <div className="pdetail__actions">
            <button
              type="button"
              className="pdetail__cta"
              onClick={() => window.dispatchEvent(new Event('enquiry:open'))}
            >
              Enquire about this property
            </button>
            <a className="pdetail__ghost mono-sm" href={`tel:${site.phoneIntl}`}>Call</a>
            <a
              className="pdetail__ghost mono-sm"
              href={`${site.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <ProjectRegistration project={p} />
        </div>
      </div>
    </div>
  );
}
