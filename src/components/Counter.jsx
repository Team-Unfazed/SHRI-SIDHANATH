import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import './Counter.css';

/**
 * A figure that arrives rather than simply appears.
 *
 * `count` runs the number up from zero once it scrolls into view, keeping the
 * original's decimals, zero-padding and any prefix or suffix (`4.8`, `01`,
 * `13h`). `decode` is for identifiers, where counting would be meaningless: the
 * digits cycle and lock into place left to right, letters stay put.
 *
 * The final value is what renders first and what screen readers get, so the
 * figure is correct with no JavaScript and is never announced mid-count.
 * `onUpdate` receives the current number, for anything that should move with it.
 */
export default function Counter({
  value,
  mode = 'count',
  duration = 2.2,
  delay = 0,
  start = 'top 85%',
  onUpdate,
  className = '',
}) {
  const ref = useRef(null);
  const cb = useRef(onUpdate);
  cb.current = onUpdate;

  useLayoutEffect(() => {
    const el = ref.current;
    const text = String(value);
    if (!el || reducedMotion()) {
      cb.current?.(parseFloat(text.replace(/[^\d.]/g, '')) || 0);
      return;
    }

    let tween;
    if (mode === 'decode') {
      const chars = [...text];
      const digits = chars.map((c, i) => (/\d/.test(c) ? i : -1)).filter((i) => i >= 0);
      const scramble = (locked) =>
        chars
          .map((c, i) => {
            const k = digits.indexOf(i);
            return k < 0 || k < locked ? c : String(Math.floor(Math.random() * 10));
          })
          .join('');
      el.textContent = scramble(0);
      const state = { t: 0 };
      tween = gsap.to(state, {
        t: 1,
        duration: duration * 0.7,
        delay,
        ease: 'power1.in',
        onUpdate: () => {
          el.textContent = state.t >= 1 ? text : scramble(Math.floor(state.t * (digits.length + 0.6)));
        },
        scrollTrigger: { trigger: el, start, once: true },
      });
    } else {
      const m = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
      if (!m) return;
      const [, prefix, num, suffix] = m;
      const target = parseFloat(num);
      const decimals = (num.split('.')[1] || '').length;
      // Keep zero-padding only where the original has it (`01`), so `12`
      // counts 1, 2, … rather than 01, 02, …
      const int0 = num.split('.')[0];
      const width = int0.length > 1 && int0.startsWith('0') ? int0.length : 1;
      const format = (n) => {
        const [int, frac] = n.toFixed(decimals).split('.');
        return prefix + int.padStart(width, '0') + (frac ? `.${frac}` : '') + suffix;
      };
      const state = { n: 0 };
      el.textContent = format(0);
      cb.current?.(0);
      tween = gsap.to(state, {
        n: target,
        duration,
        delay,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = format(state.n);
          cb.current?.(state.n);
        },
        onComplete: () => {
          el.textContent = text;
          cb.current?.(target);
        },
        scrollTrigger: { trigger: el, start, once: true },
      });
    }

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      el.textContent = text;
    };
  }, [value, mode, duration, delay, start]);

  return (
    <span className={`counter ${className}`.trim()}>
      <span className="counter__sr">{value}</span>
      <span ref={ref} className="counter__run" aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
