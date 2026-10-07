import { useState, useEffect, useRef } from 'react';
import { introComplete } from '../lib/intro';
import { site } from '../data/site';
import { gsap } from '../lib/motion';
import { saveEnquiry } from '../lib/enquiries';
import './EnquiryModal.css';

const TRANSACTION_TYPES = [
  { id: 'Buy', label: 'Buy' },
  { id: 'Rent', label: 'Rent' },
  { id: 'Sell', label: 'Sell' },
  { id: 'Invest', label: 'Invest' },
];

const CONFIGURATIONS = [
  '1 BHK',
  '2 BHK',
  '3 BHK Luxury',
  'Commercial / Shop',
  'Land / Plot',
];

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  // The hero carries its own "Enquire now" CTA (see Hero.jsx), so the docked
  // launcher stays out of the way while the hero is in view rather than
  // competing with it, and reappears once the visitor has scrolled on.
  const [heroVisible, setHeroVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState('Buy');
  const [selectedConfig, setSelectedConfig] = useState('2 BHK');
  const [budgetNote, setBudgetNote] = useState('');

  const modalRef = useRef(null);
  const cardWrapRef = useRef(null);
  const overlayRef = useRef(null);

  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflowY;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflowY = previousRootOverflow;
    };
  }, [isOpen]);

  // Offer the enquiry only while the visitor stays on the hero. Never interrupt a swipe.
  useEffect(() => {
    // If QA test hatch (?nomotion) is present, skip auto-popup
    const isQA = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nomotion');
    if (isQA) return undefined;

    let timer;
    let cancelled = false;
    const cancelOffer = () => {
      cancelled = true;
      clearTimeout(timer);
    };
    const onScroll = () => { if (window.scrollY > 8) cancelOffer(); };
    window.addEventListener('hero-scroll-start', cancelOffer);
    window.addEventListener('scroll', onScroll, { passive: true });
    introComplete.then(() => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (!cancelled && window.scrollY < 8 && !document.documentElement.dataset.heroScrolling) {
          setIsOpen(true);
        }
      }, 3000);
    });

    return () => {
      cancelOffer();
      window.removeEventListener('hero-scroll-start', cancelOffer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 3D Entrance Animation from the bottom Taskbar whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);

    // Ensure DOM paint before starting 3D entrance
    const raf = requestAnimationFrame(() => {
      const card = cardWrapRef.current;
      if (!card) return;

      gsap.killTweensOf(card);
      gsap.fromTo(
        card,
        {
          y: window.innerHeight * 0.9,  // originates directly at the bottom taskbar
          rotationX: 55,                // tilted back in 3D depth as if on taskbar shelf
          rotationY: 0,
          z: -260,
          scale: 0.8,
          opacity: 0,
          transformPerspective: 1200,
          transformOrigin: '50% 100%',
        },
        {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
        }
      );
    });

    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  // 3D Exit Animation: retracts smoothly back down to the taskbar
  const handleClose = () => {
    const card = cardWrapRef.current;

    if (card) {
      gsap.to(card, {
        y: window.innerHeight * 0.9,
        rotationX: 45,
        z: -200,
        scale: 0.84,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setIsOpen(false);
          setSubmitted(false);
        },
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Lets any other part of the UI (e.g. the hero's primary CTA) open this
  // modal without the two components needing a shared parent or context —
  // the same window-event pattern already used for `hero-scroll-start`.
  useEffect(() => {
    const onOpenRequest = () => setIsOpen(true);
    window.addEventListener('enquiry:open', onOpenRequest);
    return () => window.removeEventListener('enquiry:open', onOpenRequest);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility: Escape closes modal
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // Form submission with 3D tick animation transition
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const generatedRef = `SS-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(generatedRef);

    // Save lead record in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('sidhanath_enquiries') || '[]');
      existing.push({
        ref: generatedRef,
        name: name.trim(),
        phone: phone.trim(),
        intent,
        config: selectedConfig,
        budgetNote: budgetNote.trim(),
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('sidhanath_enquiries', JSON.stringify(existing));
    } catch {
      // Ignore if localStorage unavailable
    }

    // Attempt saving to remote database if configured
    try {
      saveEnquiry({
        full_name: name.trim(),
        phone: phone.trim(),
        property_type: intent,
        message: `${selectedConfig}. ${budgetNote.trim()}`.trim(),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }

    // Brief tactile transition before revealing 3D tick checkmark
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // Formatted direct WhatsApp message link
  const waMessage = encodeURIComponent(
    `Hello Shri Sidhanath Advisory (Ref: ${refId || 'PANVEL-DIRECT'}),\n\nI submitted an enquiry:\n• Name: ${name}\n• Contact: +91 ${phone}\n• Looking to: ${intent}\n• Typology: ${selectedConfig}\n• Details: ${budgetNote || 'Standard consultation requested'}\n\nPlease share verified inventory.`
  );
  const whatsappUrl = `${site.whatsapp}?text=${waMessage}`;

  return (
    <>
      {/* Docked Taskbar Launcher Button (when modal is closed and the hero's
          own CTA isn't already covering the same job) */}
      {!isOpen && !heroVisible && (
        <button
          type="button"
          className="enquiry-taskbar-dock"
          onClick={handleOpen}
          aria-label="Open Property Advisory Enquiry"
        >
          <span className="enquiry-taskbar-dock__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="enquiry-taskbar-dock__label">Enquire Now</span>
        </button>
      )}

      {/* Fullscreen Overlay with 3D Perspective */}
      <div
        ref={overlayRef}
        className="enquiry-overlay"
        data-open={isOpen ? 'true' : 'false'}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <div className="enquiry-card-3d-wrap" ref={cardWrapRef}>
          <div className="enquiry-modal" ref={modalRef}>
            {/* Close Button */}
            <button
              type="button"
              className="enquiry-modal__close"
              onClick={handleClose}
              aria-label="Close enquiry modal"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!submitted ? (
              <>
                {/* Architectural Editorial Header */}
                <div className="enquiry-header">
                  <div className="enquiry-meta-row">
                    <span className="enquiry-badge">
                      <span className="enquiry-badge__dot" aria-hidden="true" />
                      Direct Advisory Desk
                    </span>
                    <span className="enquiry-rera-tag">MahaRERA {site.rera}</span>
                  </div>

                  <h2 id="enquiry-modal-title" className="enquiry-modal__title">
                    Private Property Enquiry
                  </h2>
                  <p className="enquiry-modal__desc">
                    Connect directly with Ravi Sargar for verified residential &amp; commercial opportunities in Panvel &amp; Navi Mumbai.
                  </p>
                </div>

                {/* Structured Professional Form */}
                <form className="enquiry-form" onSubmit={handleSubmit}>
                  {/* Transaction Intent */}
                  <div>
                    <div className="enquiry-section-title">
                      <span className="enquiry-label">Transaction Purpose</span>
                      <span className="enquiry-label-sub">Select mandate</span>
                    </div>
                    <div className="enquiry-intent-grid" role="radiogroup" aria-label="Transaction Purpose">
                      {TRANSACTION_TYPES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className="enquiry-intent-btn"
                          data-active={intent === t.id ? 'true' : undefined}
                          onClick={() => setIntent(t.id)}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typology */}
                  <div>
                    <div className="enquiry-section-title">
                      <span className="enquiry-label">Configuration</span>
                      <span className="enquiry-label-sub">Space requirement</span>
                    </div>
                    <div className="enquiry-tags-wrap">
                      {CONFIGURATIONS.map((cfg) => (
                        <button
                          key={cfg}
                          type="button"
                          className="enquiry-tag-chip"
                          data-active={selectedConfig === cfg ? 'true' : undefined}
                          onClick={() => setSelectedConfig(cfg)}
                        >
                          {cfg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields: Name & Phone */}
                  <div className="enquiry-input-row">
                    <div className="enquiry-input-group">
                      <label htmlFor="enquiry-name" className="enquiry-label">
                        Your Full Name *
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        className="enquiry-input"
                        placeholder="e.g. Anand Deshmukh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="enquiry-input-group">
                      <label htmlFor="enquiry-phone" className="enquiry-label">
                        WhatsApp Contact *
                      </label>
                      <div className="enquiry-phone-wrap">
                        <span className="enquiry-phone-prefix">+91</span>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          className="enquiry-input enquiry-input--phone"
                          placeholder="98200 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          pattern="[0-9]{10}"
                          title="Please provide a valid 10-digit mobile number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget / Custom Note */}
                  <div className="enquiry-input-group">
                    <label htmlFor="enquiry-budget" className="enquiry-label">
                      Budget &amp; Target Timeline (Optional)
                    </label>
                    <input
                      id="enquiry-budget"
                      type="text"
                      className="enquiry-input"
                      placeholder="e.g. ₹75L – ₹1.1 Cr, ready to move within 3 months"
                      value={budgetNote}
                      onChange={(e) => setBudgetNote(e.target.value)}
                    />
                  </div>

                  {/* Submit Button with 3D Depth */}
                  <button
                    type="submit"
                    className="enquiry-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="enquiry-btn-spinner" aria-hidden="true" />
                        <span>Submitting Mandate...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry &amp; Request Callback</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Trust Banner */}
                  <div className="enquiry-trust-banner">
                    <div className="enquiry-trust-item">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Direct Advisory Desk</span>
                    </div>
                    <div className="enquiry-trust-item">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>Zero Broker Spam</span>
                    </div>
                    <div className="enquiry-trust-item">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Callback &le; 30 Mins</span>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* 3D Success Stage with 3D Animated Tick */
              <div className="enquiry-success-view">
                <div className="enquiry-3d-tick-stage">
                  <div className="enquiry-3d-aura" aria-hidden="true" />
                  <div className="enquiry-3d-medallion">
                    <svg className="enquiry-tick-svg" viewBox="0 0 52 52">
                      <circle
                        cx="26"
                        cy="26"
                        r="23"
                        fill="none"
                        stroke="rgba(228, 237, 100, 0.4)"
                        strokeWidth="2"
                      />
                      <path
                        className="enquiry-tick-path"
                        fill="none"
                        stroke="#e4ed64"
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 26.5 L23 33.5 L36 18.5"
                      />
                    </svg>
                  </div>
                </div>

                <span className="enquiry-success-ref">Ref: {refId}</span>

                <h2 className="enquiry-success-title">
                  Enquiry Submitted Successfully!
                </h2>

                <p className="enquiry-success-summary">
                  Thank you, <strong>{name}</strong>. We have logged your requirement for a{' '}
                  <strong>{selectedConfig}</strong> ({intent}) in <strong>{site.headquarters}</strong>.
                  Ravi Sargar or our senior Panvel advisor will call you shortly on <strong>+91 {phone}</strong>.
                </p>

                <div className="enquiry-success-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="enquiry-wa-direct-btn"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Continue on WhatsApp with Details
                  </a>

                  <button
                    type="button"
                    className="enquiry-return-btn"
                    onClick={handleClose}
                  >
                    Done &middot; Return to Site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
