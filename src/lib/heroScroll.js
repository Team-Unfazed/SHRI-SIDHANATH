import { reducedMotion } from './motion';

const DURATION = 1500;
const WHEEL_IDLE = 300;

/* The CSS `ease` curve, cubic-bezier(0.25, 0.1, 0.25, 1): a soft start, a quick
   middle and a long settle. It is what a full-screen slider uses between
   slides, and what makes the arrival read as a stop rather than a brake. */
const X1 = 0.25, Y1 = 0.1, X2 = 0.25, Y2 = 1;
const bezier = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
const slope = (t, a, b) => 3 * a * (1 - t) * (1 - 3 * t) + 3 * b * t * (2 - 3 * t) + 3 * t * t;
function ease(progress) {
  let t = progress;
  for (let i = 0; i < 6; i++) {
    const d = slope(t, X1, X2);
    if (Math.abs(d) < 1e-6) break;
    t -= (bezier(t, X1, X2) - progress) / d;
  }
  return bezier(Math.min(Math.max(t, 0), 1), Y1, Y2);
}

/**
 * The full-screen pages at the top of the document — hero, about, proof — move
 * one page per gesture, the way a vertical slider does. Own that one gesture,
 * including its momentum, then return scrolling to the browser. Past the last
 * page the document scrolls normally.
 */
export function initHeroScroll(...sections) {
  const pages = sections.filter(Boolean);
  const [hero, about] = pages;
  if (pages.length < 2) return () => {};

  let frame = 0;
  let releaseTimer = 0;
  let animating = false;
  let captured = false;
  let lastWheel = -Infinity;
  let touch = null;
  let suppressClickUntil = 0;
  const html = document.documentElement;

  const blocked = () => !!document.querySelector('.intro, .enquiry-overlay[data-open="true"]');
  const editable = (target) => target instanceof Element && !!target.closest(
    'input, textarea, select, [contenteditable="true"], [role="dialog"], .fmenu:not([hidden])'
  );
  /* On narrow screens the later pages grow past one screen to fit their
     content. Those scroll normally: sliding off a page whose foot is still
     below the fold would make that foot unreachable. The hero is exempt — it
     only ever overhangs by its minimum height. */
  const tall = (i) => i > 0 && pages[i].getBoundingClientRect().height > window.innerHeight + 80;

  // The page the viewport top is currently inside, or -1.
  const current = () => {
    let i = -1;
    pages.forEach((page, k) => { if (page.getBoundingClientRect().top <= 1) i = k; });
    return i;
  };

  /* Where a gesture in `dir` should slide to, or null to leave it to the
     browser. */
  const target = (dir) => {
    if (blocked()) return null;
    const i = current();
    if (i < 0) return null;
    const free = i === pages.length - 1 || tall(i);
    if (dir > 0) return free ? null : pages[i + 1];
    // Parked exactly on a page: back one. Part-way down one: back to its top.
    if (Math.abs(pages[i].getBoundingClientRect().top) <= 1) return i > 0 ? pages[i - 1] : null;
    return free ? null : pages[i];
  };
  const prevent = (event) => { if (event.cancelable) event.preventDefault(); };

  const release = () => {
    clearTimeout(releaseTimer);
    captured = false;
    delete html.dataset.heroScrolling;
  };

  // A trackpad can keep sending momentum after the animation has landed.
  // Only release after that gesture goes quiet AND its finger has lifted.
  const settle = () => {
    clearTimeout(releaseTimer);
    if (animating || touch?.handled) return;
    const remaining = WHEEL_IDLE - (performance.now() - lastWheel);
    if (remaining > 0) releaseTimer = setTimeout(settle, remaining + 1);
    else release();
  };

  const cancel = () => {
    cancelAnimationFrame(frame);
    animating = false;
    touch = null;
    release();
  };

  const glide = (destination = about) => {
    if (animating || blocked()) return;
    clearTimeout(releaseTimer);
    captured = true;
    animating = true;
    html.dataset.heroScrolling = 'true';
    window.dispatchEvent(new Event('hero-scroll-start'));
    const from = window.scrollY;
    const began = performance.now();
    // Match the site's existing motion policy, including its ?nomotion QA switch.
    const duration = reducedMotion() ? 0 : DURATION;
    const tick = (now) => {
      if (blocked()) { cancel(); return; }
      const to = destination.getBoundingClientRect().top + window.scrollY;
      const progress = duration ? Math.min((now - began) / duration, 1) : 1;
      const eased = progress < 1 ? ease(progress) : 1;
      window.scrollTo({ top: from + (to - from) * eased, behavior: 'instant' });
      if (progress < 1) frame = requestAnimationFrame(tick);
      else {
        animating = false;
        settle();
      }
    };
    frame = requestAnimationFrame(tick);
  };

  const onWheel = (event) => {
    if (blocked() || event.ctrlKey || event.shiftKey || editable(event.target)) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
    // Accept small fractional trackpad deltas as well as a mouse-wheel notch.
    const to = captured ? null : target(Math.sign(event.deltaY));
    if (captured || to) {
      prevent(event);
      lastWheel = performance.now();
      if (!captured) glide(to);
      else settle();
    }
  };

  const onTouchStart = (event) => {
    if (event.touches.length !== 1) { cancel(); return; }
    if (blocked() || editable(event.target)) { touch = null; return; }
    // A new touch after arrival is a new gesture and can scroll About normally.
    if (captured && !animating) release();
    const point = event.touches[0];
    // Every full page but the last owns its vertical swipes (`touch-action`
    // is set on them below); the last one scrolls on into the document.
    const i = current();
    const eligible = !blocked() && i >= 0 && i < pages.length - 1 && !tall(i);
    touch = { x: point.clientX, y: point.clientY, eligible, handled: animating };
  };

  const handleTouch = (event, point) => {
    if (!touch || !point) return;
    const dy = touch.y - point.clientY;
    const dx = Math.abs(touch.x - point.clientX);
    if (touch.handled) { prevent(event); return; }
    if (!touch.eligible || Math.abs(dy) < 12 || Math.abs(dy) <= dx) return;
    const to = target(dy > 0 ? 1 : -1);
    if (to) {
      prevent(event);
      touch.handled = true;
      glide(to);
    }
  };

  const onTouchMove = (event) => {
    if (event.touches.length === 1) handleTouch(event, event.touches[0]);
  };
  const onTouchEnd = (event) => {
    handleTouch(event, event.changedTouches[0]);
    if (touch?.handled) suppressClickUntil = performance.now() + 400;
    touch = null;
    settle();
  };
  const onTouchCancel = () => { touch = null; settle(); };

  const onKey = (event) => {
    if (event.key === 'Escape') { cancel(); return; }
    if (blocked() || editable(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof Element && event.target.closest('button, a') && event.key === ' ') return;
    if (captured && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) {
      prevent(event);
    } else if (!event.shiftKey && ['ArrowDown', 'PageDown', ' '].includes(event.key) && target(1)) {
      prevent(event);
      glide(target(1));
    } else if (['ArrowUp', 'PageUp'].includes(event.key) && target(-1)) {
      prevent(event);
      glide(target(-1));
    } else if (['Home', 'End', 'ArrowUp', 'PageUp'].includes(event.key)) cancel();
  };

  const onClick = (event) => {
    if (performance.now() < suppressClickUntil && hero.contains(event.target)) {
      prevent(event);
      return;
    }
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.matches('.banner__scroll') && !blocked()) {
      prevent(event);
      glide();
    } else if (link.hash) cancel();
  };

  const swipePages = pages.slice(0, -1);
  const markSwipe = () => swipePages.forEach((page, i) => {
    if (tall(i)) delete page.dataset.swipeScroll;
    else page.dataset.swipeScroll = 'true';
  });
  markSwipe();
  window.addEventListener('resize', markSwipe);
  const listeners = [
    ['wheel', onWheel, { passive: false }],
    ['touchstart', onTouchStart, { passive: true }],
    ['touchmove', onTouchMove, { passive: false }],
    ['touchend', onTouchEnd, { passive: false }],
    ['touchcancel', onTouchCancel],
    ['keydown', onKey],
    ['click', onClick],
  ];
  listeners.forEach(([name, handler, options]) => window.addEventListener(name, handler, options));
  return () => {
    cancel();
    window.removeEventListener('resize', markSwipe);
    swipePages.forEach((page) => { delete page.dataset.swipeScroll; });
    listeners.forEach(([name, handler, options]) => window.removeEventListener(name, handler, options));
  };
}
