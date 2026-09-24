import { useEffect, useRef } from 'react';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import ScrollFill from '../components/ScrollFill';
import { gallery } from '../data/content';
import { gsap, reducedMotion } from '../lib/motion';
import './Closer.css';

const STRIP = gallery.slice(0, 4);

/**
 * The closing wordmark. Sized at 27.6vw so it always spans the viewport, with
 * the estate photograph clipped to the glyphs — the letters are a window, not a
 * fill. `background-clip: text` is the whole effect; the fallback is a solid
 * near-black, which is what any browser without it will paint.
 */
export default function Closer() {
  const root = useRef(null);

  /* The wordmark stands up off the page as it scrolls in — it starts laid
     back on its baseline and rises to face the reader. Each plate in the
     closing strip rises at its own rate and tips upright, so the row arrives
     as a fan rather than a shelf. */
  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.clo__word',
        { rotationX: 62, transformPerspective: 1400, transformOrigin: '50% 100%' },
        {
          rotationX: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.clo__word', start: 'top bottom', end: 'top 45%', scrub: 1 },
        }
      );

      gsap.utils.toArray('.clo__strip li').forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            yPercent: 12 + i * 6,
            rotationX: 35,
            transformPerspective: 1000,
            transformOrigin: '50% 100%',
          },
          {
            yPercent: 0,
            rotationX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.clo__strip',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="clo" id="closer" ref={root}>
      <div className="clo__inner wrap">
        <Reveal>
          <p className="clo__word" aria-label="Shri Sidhanath">
            <span aria-hidden="true">
              Sidhanath<sup>&copy;</sup>
            </span>
          </p>
        </Reveal>

        <Reveal className="clo__tail" delay={0.09}>
          <ScrollFill className="clo__lede">
            One desk in New Panvel, accountable from the first site visit to the day
            the keys change hands.
          </ScrollFill>
          <Pill tone="black" href="#contact">
            Start a conversation
          </Pill>
        </Reveal>
      </div>

      <ul className="clo__strip" aria-hidden="true">
        {STRIP.map((g, i) => (
          <li key={g.id} style={{ '--i': i }}>
            <img src={g.img} alt="" width="360" height="260" loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  );
}
