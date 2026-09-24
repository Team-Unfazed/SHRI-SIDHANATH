import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Exposed in development only, so a debugging script can read real trigger
// ranges instead of inferring them from sampled transforms.
if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__gsap = gsap;
  window.__ScrollTrigger = ScrollTrigger;
}

/**
 * True when motion should be suppressed.
 *
 * `?nomotion` is a QA escape hatch: a full-page screenshot cannot drive
 * scroll-linked reveals reliably, so scripts/shoot.mjs loads the page with
 * everything already in its final state.
 *
 * The OS reduced-motion flag deliberately does not switch motion off: Windows
 * reports it whenever "Animation effects" is disabled, which is common, and the
 * site's motion is its character. See lib/intro.js.
 */
export const reducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('nomotion');
};

export const EASE = 'power3.out';
export const EASE_CINEMA = 'expo.out';

/**
 * The house reveal: a block rises out of depth and tips upright — it starts
 * leaning back from its lower edge, a little below and behind its resting
 * place. Never a bounce. `depth` is the starting lean in degrees; 0 gives the
 * old flat rise.
 *
 * The transform is cleared once it lands, so text is rasterised flat again and
 * anything that tilts the element later starts from a clean slate.
 * Returns the tween so callers can add it to a timeline.
 */
export function revealUp(target, options = {}) {
  const {
    y = 26,
    depth = 14,
    duration = 1.1,
    stagger = 0.08,
    delay = 0,
    trigger,
    start = 'top 82%',
    once = true,
  } = options;

  if (reducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: y * 1.6,
      z: -depth * 6,
      rotationX: depth,
      transformPerspective: 1100,
      transformOrigin: '50% 100%',
    },
    {
      opacity: 1,
      y: 0,
      z: 0,
      rotationX: 0,
      duration,
      delay,
      stagger,
      ease: EASE_CINEMA,
      clearProps: 'transform',
      scrollTrigger: trigger
        ? { trigger, start, once, toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

/**
 * A card turning over on its left edge, like a departure board — used where a
 * row of cells should arrive one after another rather than rise together.
 */
export function revealFlip(target, options = {}) {
  const { duration = 1.2, stagger = 0.1, delay = 0, trigger, start = 'top 82%' } = options;

  if (reducedMotion()) {
    gsap.set(target, { opacity: 1 });
    return null;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, rotationY: -75, transformPerspective: 1200, transformOrigin: '0% 50%' },
    {
      opacity: 1,
      rotationY: 0,
      duration,
      delay,
      stagger,
      ease: EASE_CINEMA,
      clearProps: 'transform',
      scrollTrigger: trigger
        ? { trigger, start, once: true, toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

/**
 * Pointer tilt for cards: the card turns toward the cursor in 3D and a soft
 * glare follows it across the surface. Fine pointers only — on touch there is
 * no hover to respond to. Uses quickTo, so the card eases toward the pointer
 * rather than snapping to it. Returns a cleanup function.
 */
export function tilt(el, options = {}) {
  const { max = 7, lift = 18 } = options;
  if (!el || reducedMotion()) return () => {};
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};

  const glare = document.createElement('span');
  glare.className = 'tilt-glare';
  glare.setAttribute('aria-hidden', 'true');
  el.appendChild(glare);
  el.classList.add('is-tilt');

  const opts = { duration: 0.7, ease: 'power3.out' };
  const rx = gsap.quickTo(el, 'rotationX', opts);
  const ry = gsap.quickTo(el, 'rotationY', opts);
  const tz = gsap.quickTo(el, 'z', opts);

  const move = (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry((px - 0.5) * max * 2);
    rx((0.5 - py) * max * 2);
    tz(lift);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };
  // Set on every entry: a scroll reveal on the same element clears its
  // transform (perspective included) when it lands.
  const enter = () => {
    gsap.set(el, { transformPerspective: 900 });
    el.classList.add('is-tilting');
  };
  const leave = () => {
    rx(0);
    ry(0);
    tz(0);
    el.classList.remove('is-tilting');
  };

  el.addEventListener('pointerenter', enter);
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);

  return () => {
    el.removeEventListener('pointerenter', enter);
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
    gsap.killTweensOf(el, 'rotationX,rotationY,z');
    gsap.set(el, { clearProps: 'transform' });
    el.classList.remove('is-tilt', 'is-tilting');
    glare.remove();
  };
}

/** Wires `tilt` to every `[data-tilt]` inside `root`. Returns one cleanup. */
export function initTilt(root = document) {
  const offs = Array.from(root.querySelectorAll('[data-tilt]')).map((el) =>
    tilt(el, { max: Number(el.dataset.tilt) || undefined })
  );
  return () => offs.forEach((off) => off());
}

/**
 * Masked line reveal. Each line sits inside an overflow-hidden box and rises
 * from below it, which reads as type being set rather than type sliding in.
 */
export function revealLines(lines, options = {}) {
  const { duration = 1.15, stagger = 0.09, delay = 0, trigger, start = 'top 80%' } = options;

  if (reducedMotion()) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    return null;
  }

  return gsap.fromTo(
    lines,
    { yPercent: 108, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: EASE_CINEMA,
      scrollTrigger: trigger
        ? { trigger, start, once: true, toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

/**
 * A slow drift used on large imagery. Deliberately small: the brief is
 * cinematic, not carnival. Disabled entirely under reduced motion and on
 * coarse pointers, where it costs more than it gives.
 */
export function parallax(target, options = {}) {
  const { amount = 60, trigger = target } = options;
  if (reducedMotion()) return null;

  return gsap.fromTo(
    target,
    { yPercent: -amount / 20 },
    {
      yPercent: amount / 20,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
}

/**
 * The house heading reveal, and the one that makes this layout look like the
 * template it was rebuilt from.
 *
 * The source splits every heading three ways — lines, then words, then letters —
 * masks each *line*, and staggers the *letters* up out of that mask. Animating
 * whole lines (which is what this used to do) is the cheap version: it reads as
 * a block sliding, not as type being set. The difference is the entire
 * character of the page.
 *
 * Splitting has to wait for the web fonts. SplitText measures rendered line
 * boxes, so a split performed against the fallback face produces line breaks
 * that are wrong the moment Archivo swaps in — words stranded in the wrong mask,
 * permanently.
 *
 * Returns a cleanup function; call it on unmount. `revert()` puts the original
 * markup back, which matters because the split replaces the element's children
 * with a tree of spans.
 */
export function splitReveal(el, options = {}) {
  const {
    trigger,
    start = 'top 82%',
    delay = 0,
    duration = 1.1,
    stagger = 0.014,
    autoplay = false,
  } = options;

  if (!el) return () => {};

  if (reducedMotion()) {
    gsap.set(el, { opacity: 1 });
    return () => {};
  }

  let split = null;
  let tween = null;
  let cancelled = false;

  const run = () => {
    if (cancelled || !el.isConnected) return;

    split = new SplitText(el, {
      type: 'lines,words,chars',
      // Each line gets its own overflow-hidden wrapper, so letters rise out of
      // the line they belong to rather than out of the element as a whole.
      mask: 'lines',
      linesClass: 'split__line',
      wordsClass: 'split__word',
      charsClass: 'split__char',
    });

    // The element was held invisible to cover the gap between paint and split.
    gsap.set(el, { opacity: 1 });

    // Each letter rises out of its line and swings upright off its baseline
    tween = gsap.from(split.chars, {
      yPercent: 108,
      rotationX: -95,
      transformPerspective: 600,
      transformOrigin: '50% 100%',
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: EASE_CINEMA,
      scrollTrigger: autoplay
        ? undefined
        : { trigger: trigger || el, start, once: true, toggleActions: 'play none none none' },
    });
  };

  // `document.fonts.ready` resolves as soon as the fonts in use have loaded.
  if (document.fonts?.ready) document.fonts.ready.then(run);
  else run();

  return () => {
    cancelled = true;
    if (tween) {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
    split?.revert();
  };
}

export { gsap, ScrollTrigger, SplitText };
