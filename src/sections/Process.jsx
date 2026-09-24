import { useEffect, useRef } from 'react';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';
import { gsap, reducedMotion } from '../lib/motion';
import './Process.css';

/**
 * Four bars, each a full-bleed band of colour that darkens as the deal
 * progresses — light grey, the accent, charcoal, black. The ladder is the
 * point: you can read the stage you are at off the value of the strip alone.
 *
 * The copy describes how the desk actually works, drawn from the four services
 * in the content layer. It makes no claim about volume, speed or outcome.
 *
 * In depth, the ladder builds itself: each bar hangs folded back from its top
 * edge and swings down into place as it scrolls up, so the stages arrive one
 * after another like steps being laid. The step (`li`) owns the fold; the bar
 * inside it owns the hover lean, so the two never share a transform.
 *
 * The bars are full-bleed, so the shared pointer tilt (lib/motion `tilt`) is
 * deliberately not used: its forward lift scales a 100vw bar past both edges of
 * the screen. The hover here leans the bar about its own centre line instead,
 * which leaves the type exactly where it was.
 */
const STEPS = [
  {
    n: '01',
    title: 'Understand the requirement',
    body: 'Budget, timeline, configuration and what the property has to do for you. We shortlist against that, not against what is easiest to sell.',
  },
  {
    n: '02',
    title: 'See the real options',
    body: 'Site visits arranged around you, with the technical and legal position of each option read out honestly — including the ones we would not recommend.',
  },
  {
    n: '03',
    title: 'Negotiate and structure',
    body: 'Pricing grounded in local transactions, terms put in writing, and a single point of accountability between you, the developer and the owner.',
  },
  {
    n: '04',
    title: 'Close and hand over',
    body: 'Documentation, approvals and registration coordinated through to possession, then tenancy or upkeep if the asset is to be managed.',
  },
];

export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const narrow = window.matchMedia('(max-width: 860px)').matches;
      gsap.utils.toArray('.prc__step', el).forEach((step) => {
        gsap.fromTo(
          step,
          { rotationX: narrow ? -55 : -80, '--fold': 1 },
          {
            rotationX: 0,
            '--fold': 0,
            ease: 'none',
            scrollTrigger: {
              trigger: step,
              start: 'top bottom',
              end: narrow ? 'top 75%' : 'top 62%',
              scrub: 0.6,
              // Lights the step's progress dots once it has landed.
              onLeave: () => step.classList.add('is-in'),
              onEnterBack: () => step.classList.add('is-in'),
            },
          }
        );
      });
    }, el);

    /* A light that follows the pointer across the hovered bar. */
    const bars = Array.from(el.querySelectorAll('.prc__bar'));
    const move = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    bars.forEach((b) => b.addEventListener('pointermove', move));

    return () => {
      bars.forEach((b) => b.removeEventListener('pointermove', move));
      ctx.revert();
    };
  }, []);

  return (
    <section className="prc" id="process" ref={root}>
      <div className="wrap">
        <Reveal className="prc__head">
          <Label align="center">Process</Label>
          <SplitReveal as="h2" className="h1">
            Four stages, and
            <br />
            no surprises between them
          </SplitReveal>
        </Reveal>
      </div>

      <ol className="prc__ladder">
        {STEPS.map((s, i) => (
          <li className="prc__step" key={s.n} style={{ '--i': i }}>
            <button type="button" className="prc__bar">
              <span className="prc__ghost" aria-hidden="true">{s.n}</span>
              <span className="prc__n mono-sm">Step //{s.n}</span>
              <span className="prc__mid">
                <span className="prc__title h3">{s.title}</span>
                <span className="prc__body">{s.body}</span>
              </span>
              <span className="prc__dots" aria-hidden="true">
                {STEPS.map((_, d) => (
                  <i key={d} data-on={d <= i || undefined} style={{ '--d': d }} />
                ))}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
