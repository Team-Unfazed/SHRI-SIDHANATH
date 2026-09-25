import { useState } from 'react';
import Label from '../components/Label';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { faqs } from '../data/content';
import { site } from '../data/site';
import './Faq.css';

/**
 * One panel open at a time. A native <details> would be less code, but the
 * plus-to-minus mark has to animate and the open row has to push the ones below
 * it smoothly — neither is reliable across browsers on a <details>.
 */
export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq on-dark" id="faq">
      <div className="wrap">
        <Reveal className="faq__head">
          <Label>Frequently asked questions</Label>
          <p className="mono-sm">Need help?</p>
        </Reveal>

        <hr className="faq__rule" />

        <div className="faq__grid">
          <Reveal className="faq__aside">
            <figure className="faq__plate">
              <img
                src="/images/services/faq-apartment-interior-1400.webp"
                srcSet="/images/services/faq-apartment-interior-900.webp 900w, /images/services/faq-apartment-interior-1400.webp 1400w"
                sizes="(max-width: 980px) 100vw, 34vw"
                alt="A bright, modern apartment interior with a balcony."
                width="1400"
                height="1000"
                loading="lazy"
              />
              <figcaption className="mono-sm">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                </svg>
                {site.address.line2}, {site.address.line3}
              </figcaption>
            </figure>
            <p className="faq__open mono-sm">Open {site.google.hoursLabel}</p>
            <Pill tone="white" href={site.whatsapp} target="_blank" rel="noreferrer" className="pill--block-sm">
              Ask on WhatsApp
            </Pill>
          </Reveal>

          <ul className="faq__list">
            {faqs.map((f, i) => (
              <li className="faq__item" key={f.q}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? -1 : i)}
                  >
                    <span className="h5">{f.q}</span>
                    <span className="faq__mark" data-open={open === i || undefined} aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                </h3>
                <div className="faq__a" data-open={open === i || undefined}>
                  <p>{f.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
