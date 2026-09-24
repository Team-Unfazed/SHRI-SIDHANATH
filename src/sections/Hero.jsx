import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { featuredProjects } from '../data/projects';
import { gsap, SplitText, ScrollTrigger, reducedMotion } from '../lib/motion';
import { introDone } from '../lib/intro';
import Pill from '../components/Pill';
import './Hero.css';

const SLIDES = featuredProjects.slice(0, 3);

/**
 * The banner word is the whole section. It is set at 16.1vw with 94% leading so
 * it fills the width edge to edge at any viewport and the descenders of one line
 * touch the caps of the next — that tension is what makes it read as a masthead
 * rather than a heading. Nothing here is sized in px.
 *
 * ---- Motion ----
 * One calm entrance, no pointer effects. The sky settles out of a slow push-in,
 * the architecture rises a short way into place, the masthead letters rise out
 * of their line masks, and the meta, claim, actions and card follow in order.
 * Nothing in the hero responds to the cursor — it is a composition, not a toy.
 *
 * On scroll, the hero stays sticky at the top while the rest of the page (.sheet)
 * slides smoothly up over it with depth parallax and receding dusk scrim.
 */
export default function Hero() {
  const root = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const layers =
      '.banner__sky, .banner__arch, .banner__atmos, .banner__word, .banner__meta, .banner__meta > *, .banner__claim, .banner__actions > *, .banner__card';

    /* This is the one animation that plays without being asked for, so it
       answers to the `?nomotion` escape hatch and to the user's own preference
       rather than to a scroll position. */
    const suppress = reducedMotion();

    if (suppress) {
      gsap.set(q(layers), { opacity: 1, y: 0, yPercent: 0, scale: 1 });
      return;
    }

    let tl = null;
    let scrollTl = null;
    let wordSplit = null;
    let claimSplit = null;
    let cancelled = false;

    /* Wait for the fonts (SplitText measures real glyphs) and for the intro to
       start handing over, so the entrance plays as the iris opens rather than
       unseen behind it. `introDone` is already resolved when there is no intro. */
    Promise.all([document.fonts?.ready ?? Promise.resolve(), introDone]).then(() => {
      if (cancelled || !el.isConnected) return;

      /* Masked per line for clean descender clearance */
      wordSplit = new SplitText(q('.banner__word'), {
        type: 'lines,chars',
        mask: 'lines',
        linesClass: 'banner__word-line',
        charsClass: 'banner__char',
      });
      claimSplit = new SplitText(q('.banner__claim'), {
        type: 'lines,chars',
        mask: 'lines',
        linesClass: 'banner__claim-line',
        charsClass: 'banner__claim-char',
      });

      gsap.set(q('.banner__word, .banner__claim, .banner__meta, .banner__actions'), { opacity: 1 });

      tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl
        // The sky, alone, settling out of a slow push-in
        .fromTo(q('.banner__sky'), { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo(q('.banner__atmos'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power1.out' }, 0.2)
        // The architecture rises a short way into place
        .fromTo(
          q('.banner__arch'),
          { opacity: 0, yPercent: 6 },
          { opacity: 1, yPercent: 0, duration: 1.8, ease: 'power3.out' },
          0.5
        )
        // The masthead letters rise straight out of their masks
        .fromTo(
          wordSplit.chars,
          { yPercent: 105 },
          { yPercent: 0, duration: 1.3, stagger: 0.03 },
          0.75
        )
        .fromTo(
          q('.banner__meta > *'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out' },
          1.25
        )
        .fromTo(
          claimSplit.chars,
          { yPercent: 105 },
          { yPercent: 0, duration: 1.1, stagger: 0.01 },
          1.35
        )
        .fromTo(
          q('.banner__actions > *'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
          1.65
        )
        .fromTo(
          q('.banner__card'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          1.75
        );
    });

    /* Scroll-out parallax, dimming and fade as the sheet climbs up over the hero */
    scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sheet',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.3,
      },
    });

    scrollTl
      .to(el, { '--hero-dim': 0.48, ease: 'none', duration: 1 }, 0)
      .to(q('.banner__sky'), { yPercent: 10, scale: 1.05, ease: 'none', duration: 1 }, 0)
      .to(q('.banner__arch'), { yPercent: -4, scale: 1.03, ease: 'none', duration: 1 }, 0)
      .to(q('.banner__word'), { y: -70, opacity: 0, ease: 'power1.in', duration: 0.55 }, 0)
      .to(q('.banner__meta'), { y: -35, opacity: 0, ease: 'power1.in', duration: 0.45 }, 0)
      .to(q('.banner__foot'), { y: -25, opacity: 0, ease: 'power1.in', duration: 0.35 }, 0);

    return () => {
      cancelled = true;
      tl?.kill();
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
      wordSplit?.revert();
      claimSplit?.revert();
    };
  }, []);

  /* Keyed on the slide, so a tab click restarts the clock rather than being
     overridden by a rotation that was already due. */
  useEffect(() => {
    if (reducedMotion() || SLIDES.length < 2) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SLIDES.length), 5200);
    return () => clearTimeout(t);
  }, [i]);

  const slide = SLIDES[i];

  return (
    <section className="banner on-dark" id="top" ref={root}>
      <div className="banner__stage" aria-hidden="true">
        <picture className="banner__sky">
          <source media="(max-width: 900px)" srcSet="/images/hero/sky-mobile2.webp" type="image/webp" />
          <source
            srcSet="/images/hero/sky-800.webp 800w, /images/hero/sky-1200.webp 1200w, /images/hero/sky-1600.webp 1600w, /images/hero/sky-2100.webp 2103w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/images/hero/sky-1600.jpg"
            alt=""
            width="1600"
            height="570"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <picture className="banner__arch">
          <source media="(max-width: 900px)" srcSet="/images/hero/arch-mobile2.webp" type="image/webp" />
          <source
            srcSet="/images/hero/arch-700.webp 700w, /images/hero/arch-900.webp 900w, /images/hero/arch-1200.webp 1200w, /images/hero/arch-1600.webp 1600w, /images/hero/arch-2100.webp 2103w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/images/hero/arch-1600.png"
            alt=""
            width="1600"
            height="570"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className="banner__atmos" />
      </div>

      {/* SplitText builds the per-character masks at runtime; the markup stays
          a plain heading so a crawler and a no-JS visitor get real text. */}
      <h1 className="banner__word">Buy. Sell. Rent</h1>

      <div className="banner__meta">
        <p className="banner__intro">
          <span className="banner__arrow" aria-hidden="true">
            &#8627;
          </span>
          <span>
            Property advisory across Mumbai, Navi Mumbai, Thane, Raigad and Pune.
            <em> Registered with MahaRERA, based in New Panvel.</em>
          </span>
        </p>

        <p className="banner__years mono-sm">MahaRERA {site.rera}</p>

        <p className="banner__where mono-sm">
          {site.address.line2}, {site.address.line3}, {site.address.pincode}
        </p>
      </div>

      <div className="banner__foot">
        <div className="banner__lead">
          <p className="banner__claim h1">
            Curated property
            <br />
            for a considered move
          </p>
          <div className="banner__actions">
            <Pill href="#contact">Book a consultation</Pill>
            <Pill href="#listings" tone="ghost">
              View projects
            </Pill>
          </div>
        </div>

        <div className="banner__card">
          {/* Keyed on the slide so each change cross-fades rather than cuts */}
          <img
            key={slide.id}
            className="banner__card-img"
            src={slide.image}
            alt=""
            width="180"
            height="150"
          />
          <div className="banner__card-body" key={`body-${slide.id}`}>
            <div className="banner__card-top">
              <span className="mono-sm">{slide.category}</span>
              <span className="banner__tabs">
                {SLIDES.map((s, n) => (
                  <button
                    key={s.id}
                    type="button"
                    className="mono-sm"
                    data-on={n === i || undefined}
                    onClick={() => setI(n)}
                  >
                    <span className="sr-only">Show </span>
                    {String(n + 1).padStart(2, '0')}
                  </button>
                ))}
              </span>
            </div>
            <p className="banner__card-name h5">{slide.name}</p>
            <p className="banner__card-where mono-sm">{slide.area}</p>
          </div>
          {/* Time until the next project, restarted on every change */}
          <span className="banner__card-timer" key={`timer-${slide.id}`} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
