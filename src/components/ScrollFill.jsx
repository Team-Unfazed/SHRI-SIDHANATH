import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import './ScrollFill.css';

/**
 * A paragraph that inks in word by word against the scroll: muted as it enters
 * the viewport, fully set by the time the block sits in the reading zone.
 *
 * The words stay one uninterrupted text run. Nothing is inserted between them
 * and nothing is hidden from the accessibility tree, so a screen reader reads a
 * sentence rather than a list of words, and selection and copy behave normally.
 *
 * The two ends of the fill are custom properties rather than hard values, so a
 * dark section can retune them without this component knowing which ground it
 * has been dropped on.
 */
export default function ScrollFill({ as: Tag = 'p', children, className = '', ...rest }) {
  const ref = useRef(null);
  const text = typeof children === 'string' ? children : String(children ?? '');
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !gsap) return;
    const spans = el.querySelectorAll('.sfill__w');
    if (!spans.length) return;

    // GSAP tweens colours, not var() references, so both ends are resolved to
    // real values here. Computed custom properties come back already
    // substituted, which is what makes the per-section override work.
    const cs = getComputedStyle(el);
    const from = cs.getPropertyValue('--sfill-from').trim();
    const to = cs.getPropertyValue('--sfill-to').trim();
    if (!from || !to) return;

    // Reduced motion gets the finished state, never the resting one. A
    // paragraph frozen at the muted end would be a readability bug dressed up
    // as a style choice.
    if (reducedMotion()) {
      gsap.set(spans, { color: to });
      return;
    }

    const tween = gsap.fromTo(
      spans,
      { color: from },
      {
        color: to,
        duration: 1,
        // Wider than the duration, so each word lands as its own beat instead
        // of the block cross-fading as a whole.
        stagger: 0.6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: 0.5 },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={`sfill ${className}`} {...rest}>
      {words.map((word, i) => (
        <span className="sfill__w" key={i}>
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </Tag>
  );
}
