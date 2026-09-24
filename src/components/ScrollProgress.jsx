import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import './ScrollProgress.css';

/**
 * A two-pixel accent rule across the top of the viewport that fills with
 * reading progress. This page is 21,000px tall and its only chrome is a pill at
 * the bottom, so the rule is the sole wayfinding a visitor gets — and it costs
 * a single scrubbed scaleX.
 *
 * Hidden under reduced motion: a bar that tracks scroll is motion whether or
 * not it eases.
 */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return <div className="progress" aria-hidden="true" ref={ref} />;
}
