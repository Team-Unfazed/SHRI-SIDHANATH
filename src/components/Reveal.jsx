import { useEffect, useRef } from 'react';
import { revealUp, revealFlip } from '../lib/motion';

/**
 * Generic scroll reveal. Wraps children and rises them into place once.
 * `stagger` animates direct children instead of the wrapper itself, which is
 * what turns a grid of cards into a run of beats rather than one block fading.
 *
 * `delay` is in seconds — this is a GSAP tween, not a CSS transition.
 * `depth` is how far back the block leans before it tips upright (degrees);
 * `flip` turns it over on its left edge instead.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  stagger = false,
  delay = 0,
  y = 26,
  depth = 14,
  flip = false,
  start = 'top 82%',
  className = '',
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger ? Array.from(el.children) : el;
    const tween = flip
      ? revealFlip(targets, { trigger: el, delay, start })
      : revealUp(targets, { trigger: el, delay, y, depth, start });
    return () => {
      if (tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, [stagger, delay, y, depth, flip, start]);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
