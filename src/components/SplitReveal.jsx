import { useEffect, useRef } from 'react';
import { splitReveal } from '../lib/motion';
import './SplitReveal.css';

/**
 * A heading whose letters rise out of their own line.
 *
 *   <SplitReveal as="h2" className="h1">
 *     From requirement to keys —<br />handled end to end
 *   </SplitReveal>
 *
 * Authored `<br />` breaks are kept: SplitText splits on *rendered* lines, so a
 * hard break becomes a mask boundary and the composition holds at every width.
 *
 * `autoplay` runs the reveal immediately instead of on scroll — used for the
 * hero, which is already on screen when the page loads.
 */
export default function SplitReveal({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  stagger = 0.014,
  duration = 1.1,
  start = 'top 82%',
  autoplay = false,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    return splitReveal(ref.current, { delay, stagger, duration, start, autoplay });
  }, [delay, stagger, duration, start, autoplay]);

  return (
    <Tag ref={ref} className={`split ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
