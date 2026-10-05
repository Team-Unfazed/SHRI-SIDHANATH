import { useEffect, useRef, useState } from 'react';

const TRAVEL_MS = 1100;
const QUIET_MS = 300;

export function useShowcaseScroll(count, disabled) {
  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);
  const [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('nomotion'));
  const navigate = useRef(() => {});
  const currentIndex = useRef(0);
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduce(media.matches || new URLSearchParams(location.search).has('nomotion'));
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let index = currentIndex.current;
    setMoving(false);
    let locked = false;
    let inFlight = false;
    let endTimer;
    let quietTimer;
    let lastWheel = -Infinity;
    let touch = null;
    let suppressClickUntil = 0;
    const ignored = event => disabledRef.current || (event.target instanceof Element && !!event.target.closest('dialog[open], input, textarea, select, [contenteditable="true"]'));
    const prevent = event => { if (event.cancelable) event.preventDefault(); };
    const release = () => {
      clearTimeout(quietTimer);
      if (inFlight || touch?.handled) return;
      const wait = QUIET_MS - (performance.now() - lastWheel);
      if (wait > 0) quietTimer = setTimeout(release, wait + 1);
      else locked = false;
    };
    const go = target => {
      const next = Math.max(0, Math.min(count - 1, target));
      if (inFlight || next === index) return false;
      const focused = document.activeElement;
      if (focused?.closest('.showcase__panel')) document.querySelector('.showcase__viewport')?.focus({ preventScroll: true });
      index = next;
      currentIndex.current = next;
      locked = true;
      inFlight = true;
      setMoving(true);
      setActive(index);
      endTimer = setTimeout(() => {
        inFlight = false;
        setMoving(false);
        release();
      }, reduce ? 0 : TRAVEL_MS);
      return true;
    };
    navigate.current = go;

    const wheel = event => {
      if (ignored(event) || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      prevent(event);
      lastWheel = performance.now();
      if (locked) release();
      else go(index + Math.sign(event.deltaY));
    };
    const start = event => {
      if (ignored(event) || event.touches.length !== 1) { touch = null; return; }
      if (!inFlight) locked = false;
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, handled: inFlight };
    };
    const handleTouch = (event, point) => {
      if (!touch || !point || ignored(event)) return;
      if (touch.handled) { prevent(event); return; }
      const dy = touch.y - point.clientY;
      const dx = Math.abs(touch.x - point.clientX);
      if (Math.abs(dy) > 18 && Math.abs(dy) > dx) {
        prevent(event);
        touch.handled = true;
        go(index + Math.sign(dy));
      }
    };
    const move = event => { if (event.touches.length === 1) handleTouch(event, event.touches[0]); };
    const end = event => {
      handleTouch(event, event.changedTouches[0]);
      if (touch?.handled) suppressClickUntil = performance.now() + 400;
      touch = null;
      release();
    };
    const cancel = () => { touch = null; release(); };
    const key = event => {
      if (ignored(event) || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === ' ' && event.target.closest?.('button, a')) return;
      let target;
      if (['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)) target = index + 1;
      if (['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)) target = index - 1;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = count - 1;
      if (target !== undefined) { prevent(event); if (!event.repeat) go(target); }
    };
    const click = event => {
      if (performance.now() < suppressClickUntil && event.target.closest?.('.showcase__panel')) {
        prevent(event);
        event.stopPropagation();
      }
    };
    const listeners = [
      ['wheel', wheel, { passive: false }], ['touchstart', start, { passive: true }],
      ['touchmove', move, { passive: false }], ['touchend', end, { passive: false }],
      ['touchcancel', cancel], ['keydown', key], ['click', click, true],
    ];
    listeners.forEach(([name, fn, options]) => window.addEventListener(name, fn, options));
    return () => {
      clearTimeout(endTimer);
      clearTimeout(quietTimer);
      listeners.forEach(([name, fn, options]) => window.removeEventListener(name, fn, options));
    };
  }, [count, reduce]);

  return { active, moving, reduce, goTo: target => navigate.current(target) };
}
