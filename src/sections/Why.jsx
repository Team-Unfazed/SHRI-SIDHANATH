import { useEffect, useRef, useState } from 'react';
import Label from '../components/Label';
import Pill from '../components/Pill';
import { whyPoints } from '../data/content';
import { site } from '../data/site';
import { gsap, reducedMotion } from '../lib/motion';
import './Why.css';

const pad = (n) => String(n).padStart(2, '0');
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * The dark band. The section is tall and its stage is sticky, so the screen
 * holds still while scrolling deals through a floating deck of cards: the
 * front card lifts off and away, and the one behind it comes forward to take
 * its place. The index on the left follows along and can be clicked.
 *
 * Sticky rather than a GSAP pin, for the same reason as Services:
 * the overlapping sheet (lib/stack.js) must stay transform-free, and a pin
 * would add a transformed spacer inside it.
 *
 * The template put a client testimonial at the top of this section. There are
 * no testimonials on this site and none are invented, so the slot carries the
 * practice's own position instead, unattributed.
 *
 * Three layers, so three motions never fight over one transform:
 *   .why__float  — the slow idle drift that makes the deck feel weightless
 *   .why__tilt   — turns toward the pointer
 *   .why__fcard  — each card's place in the deck, driven by scroll
 */
export default function Why() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const count = whyPoints.length;

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const cards = gsap.utils.toArray('.why__fcard', el);
    const fill = el.querySelector('.why__rail i');
    let last = -1;

    /* Every card's pose is a function of one number: how far through the deck
       we are. `d` is the card's distance from the front — positive means still
       waiting in the stack, negative means already dealt away. */
    const render = (p) => {
      cards.forEach((card, i) => {
        const d = i - p;
        if (d >= 0) {
          const depth = Math.min(d, 3);
          gsap.set(card, {
            yPercent: -depth * 7,
            z: -depth * 110,
            rotationX: depth * 4,
            rotationZ: 0,
            opacity: d > 3 ? 0 : 1,
            '--shade': clamp(depth * 0.28, 0, 0.84),
            // Type stays back until the card is nearly at the front, so the
            // outgoing card never has the next one's words showing through it.
            '--ink': clamp(1 - d * 1.6, 0, 1),
            zIndex: count - i,
            visibility: d > 3.5 ? 'hidden' : 'visible',
          });
        } else {
          const t = clamp(-d, 0, 1);
          gsap.set(card, {
            yPercent: -t * 115,
            z: t * 160,
            rotationX: -t * 22,
            rotationZ: -t * 4,
            opacity: t < 0.35 ? 1 : 1 - (t - 0.35) / 0.65,
            '--shade': 0,
            '--ink': 1 - t,
            zIndex: count + 1,
            visibility: t >= 1 ? 'hidden' : 'visible',
          });
        }
      });
      if (fill) fill.style.transform = `scaleY(${p / (count - 1)})`;
      const now = Math.round(p);
      if (now !== last) {
        last = now;
        setActive(now);
      }
    };

    const ctx = gsap.context(() => {
      /* The photograph drifts behind the stage for the whole band. */
      gsap.fromTo(
        '.why__bg img',
        { scale: 1.14, yPercent: -3 },
        {
          scale: 1,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      );

      /* The deal. Snapping settles each card squarely at the front when the
         reader stops scrolling, rather than leaving two half-dealt. */
      const state = { p: 0 };
      render(0);
      gsap.to(state, {
        p: count - 1,
        ease: 'none',
        onUpdate: () => render(state.p),
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
          snap: { snapTo: 1 / (count - 1), duration: { min: 0.25, max: 0.6 }, ease: 'power2.inOut', delay: 0.08 },
        },
      });

      /* The deck floats: a slow, out-of-phase bob and sway so it never reads
         as pasted onto the page. */
      gsap.to('.why__float', { y: -14, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.why__float', { rotationZ: 0.8, rotationY: -3, duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, el);

    /* Pointer parallax on the deck, fine pointers only. */
    let offPointer = () => {};
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const box = el.querySelector('.why__tilt');
      const stage = el.querySelector('.why__stage');
      const opts = { duration: 0.9, ease: 'power3.out' };
      const rx = gsap.quickTo(box, 'rotationX', opts);
      const ry = gsap.quickTo(box, 'rotationY', opts);
      const move = (e) => {
        const r = box.getBoundingClientRect();
        const px = clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
        const py = clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1);
        ry(px * 10);
        rx(-py * 8);
        box.style.setProperty('--gx', `${50 + px * 50}%`);
        box.style.setProperty('--gy', `${50 + py * 50}%`);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerleave', leave);
      offPointer = () => {
        stage.removeEventListener('pointermove', move);
        stage.removeEventListener('pointerleave', leave);
      };
    }

    return () => {
      offPointer();
      ctx.revert();
    };
  }, [count]);

  /* Jump the deck to a card by scrolling to its share of the section. */
  const go = (i) => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (run * i) / (count - 1) + 1, behavior: 'smooth' });
  };

  return (
    <section className="why on-dark" id="why" ref={root} style={{ '--steps': count }}>
      <div className="why__stage">
        <div className="why__bg" aria-hidden="true">
          <img
            src="/images/office/office-shopfront-night-1400.webp"
            srcSet="/images/office/office-shopfront-night-900.webp 900w, /images/office/office-shopfront-night-1400.webp 1400w"
            sizes="100vw"
            alt=""
            width="1400"
            height="1000"
            loading="lazy"
          />
          <span className="why__scrim" />
          <span className="why__guides">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="why__inner wrap">
          <div className="why__side">
            <div className="why__head">
              <Label>Why choose us</Label>
              <blockquote className="why__quote">
                &ldquo;Start with the requirement, not with what we happen to be holding.
                If the right answer is to wait, we say so.&rdquo;
              </blockquote>
              <p className="why__byline mono-sm">
                {site.fullName} &middot; {site.headquarters}
              </p>
            </div>

            <div className="why__index">
              <span className="why__rail" aria-hidden="true">
                <i />
              </span>
              <ol>
                {whyPoints.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`why__tab${i === active ? ' is-active' : ''}`}
                      aria-current={i === active ? 'step' : undefined}
                      onClick={() => go(i)}
                    >
                      <span className="why__tabnum mono-sm">{pad(i + 1)}</span>
                      <span className="why__tabtitle">{p.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="why__cta">
              <Pill tone="white" href="#contact" className="pill--block-sm">
                Book a consultation
              </Pill>
            </div>
          </div>

          <div className="why__deckwrap">
            <p className="why__count mono-sm" aria-hidden="true">
              <span className="why__countnow">{pad(active + 1)}</span>
              <span className="why__countsep" />
              {pad(count)}
            </p>

            <div className="why__float">
              <div className="why__tilt">
                <ol className="why__deck">
                  {whyPoints.map((p, i) => (
                    <li
                      className={`why__fcard${i === active ? ' is-front' : ''}`}
                      key={p.id}
                    >
                      <span className="why__fglass" aria-hidden="true" />
                      <span className="why__fghost" aria-hidden="true">{pad(i + 1)}</span>
                      <div className="why__ftop">
                        <span className="why__ftag mono-sm">{p.tag}</span>
                        <span className="why__fnum mono-sm">/{pad(i + 1)}</span>
                      </div>
                      <h3 className="why__ftitle">{p.title}</h3>
                      <p className="why__fbody">{p.body}</p>
                      <span className="why__frule" aria-hidden="true" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="why__dots" aria-hidden="true">
              {whyPoints.map((p, i) => (
                <i key={p.id} className={i === active ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
