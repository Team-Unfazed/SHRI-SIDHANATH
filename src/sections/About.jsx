import { useEffect, useRef } from 'react';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { site } from '../data/site';
import { gsap, reducedMotion } from '../lib/motion';
import './About.css';

/* Three marks, drawn rather than imported: a pen nib for advisory, a node graph
   for mandates, a leaf for stewardship. Thin strokes at 1.2px so they sit at
   the same weight as the hairlines everywhere else. */
const ICONS = {
  advisory: (
    <path d="M4 20l1.6-4.8L16.2 4.6a1.7 1.7 0 0 1 2.4 0l.8.8a1.7 1.7 0 0 1 0 2.4L8.8 18.4 4 20Zm10.8-13.6 2.8 2.8" />
  ),
  mandate: (
    <>
      <rect x="4" y="4" width="4" height="4" rx="1" />
      <rect x="16" y="4" width="4" height="4" rx="1" />
      <rect x="4" y="16" width="4" height="4" rx="1" />
      <rect x="16" y="16" width="4" height="4" rx="1" />
      <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
    </>
  ),
  care: (
    <>
      <path d="M19 5C11 5 5 8 5 14a5 5 0 0 0 5 5c6 0 9-6 9-14Z" />
      <path d="M9 19c1.5-4 4-6.5 7-8" />
    </>
  ),
};

const PILLARS = [
  { id: 'advisory', line1: 'Project', line2: 'Advisory' },
  { id: 'mandate', line1: 'Exclusive', line2: 'Mandates' },
  { id: 'care', line1: 'Property', line2: 'Management' },
];

export default function About() {
  const root = useRef(null);

  /* The two plates drift at slightly different rates, which is what keeps a
     pair of equal rectangles from reading as a single static block. As the
     pair scrolls in, the plates also swing open like a pair of doors, each
     hinged on its inner edge, and settle flat by the time they are mid-screen. */
  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about__plate img').forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: -4 - i * 2, scale: 1.1 },
          {
            yPercent: 4 + i * 2,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about__plates',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      gsap.utils.toArray('.about__plate').forEach((plate, i) => {
        const side = i === 0 ? 1 : -1;
        gsap.fromTo(
          plate,
          {
            rotationY: side * 28,
            z: -140,
            transformPerspective: 1600,
            transformOrigin: i === 0 ? '100% 50%' : '0% 50%',
          },
          {
            rotationY: 0,
            z: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about__plates',
              start: 'top bottom',
              end: 'top 35%',
              scrub: 1,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about band" id="about" ref={root}>
      <div className="wrap">
        <Reveal className="about__head">
          <Label align="center">About us</Label>
          <SplitReveal as="p" className="about__statement h3" stagger={0.006}>
            Built on judgement rather than inventory, we take a requirement from the
            first conversation to the keys.{' '}
            <em>
              Buyers, sellers, land owners and developers — {site.name} sits between
              all four, and is accountable to the one who asked.
            </em>
          </SplitReveal>
        </Reveal>

        <Reveal className="about__pillars" delay={0.08}>
          {PILLARS.map((p) => (
            <div className="about__pillar" key={p.id}>
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[p.id]}
              </svg>
              <p>
                {p.line1}
                <br />
                {p.line2}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="about__plates" delay={0.14}>
          <figure className="about__plate">
            <img
              src="/images/office/office-shopfront-night-1400.webp"
              srcSet="/images/office/office-shopfront-night-900.webp 900w, /images/office/office-shopfront-night-1400.webp 1400w"
              sizes="(max-width: 860px) 100vw, 44vw"
              alt="The Shri Sidhanath shopfront in New Panvel at night."
              width="1400"
              height="1000"
            />
            <span className="about__mark" aria-hidden="true">
              <img src="/images/branding/logo-mark-trimmed.png" alt="" width="52" height="28" />
            </span>
            <figcaption>
              <Pill tone="white" href="#services">
                What we do
              </Pill>
            </figcaption>
          </figure>

          <figure className="about__plate about__plate--dark on-dark">
            <img
              src="/images/office/office-interior-signage-1400.webp"
              srcSet="/images/office/office-interior-signage-900.webp 900w, /images/office/office-interior-signage-1400.webp 1400w"
              sizes="(max-width: 860px) 100vw, 44vw"
              alt="The Shri Sidhanath office interior with brand signage."
              width="1400"
              height="1000"
            />
            <figcaption>
              <p>
                We do not deal only in property — we deal in the decision around it.
                {' '}{site.proprietor} has run this desk from {site.headquarters} since the
                practice began, and the office is open {site.google.hoursLabel}.
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
