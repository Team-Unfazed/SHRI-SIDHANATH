import { useEffect, useRef, useState } from 'react';
import Pill from './Pill';
import { gsap, reducedMotion } from '../lib/motion';
import './ProjectRing.css';

const pad = (n) => String(n).padStart(2, '0');

/**
 * The projects page showcase: every project stood on a ring in 3D space, the
 * front one in full light and the rest turning away into shadow. Beside it, the
 * details of whichever project faces the viewer.
 *
 * It turns one card at a time on its own, pauses under the pointer or keyboard
 * focus, and can be dragged, clicked, or stepped with the buttons and the
 * arrow keys. The ring's angle is a single number that every input tweens; the
 * frame is derived from it, so no two inputs can disagree about where it is.
 */
export default function ProjectRing({ items, onOpen }) {
  const stage = useRef(null);
  const spin = useRef(null);
  const api = useRef({ next() {}, prev() {}, go() {} });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stage.current;
    const ring = spin.current;
    if (!el || !ring) return;

    const n = items.length;
    const step = 360 / n;
    const cards = Array.from(ring.children);
    const state = { a: 0 };
    let target = 0;
    let radius = 0;
    let shown = -1;

    const layout = () => {
      const w = cards[0].offsetWidth;
      radius = Math.round(w / 2 / Math.tan(Math.PI / n) + w * 0.22);
      cards.forEach((c, i) => {
        c.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
      });
    };

    const render = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${-state.a}deg)`;
      cards.forEach((c, i) => {
        // Angle of this card away from the viewer, -180..180
        const d = ((((i * step - state.a) % 360) + 540) % 360) - 180;
        const facing = (Math.cos((d * Math.PI) / 180) + 1) / 2; // 1 front, 0 back
        c.style.setProperty('--shade', (1 - facing).toFixed(3));
        c.style.zIndex = String(Math.round(facing * 100));
      });
      const idx = ((Math.round(state.a / step) % n) + n) % n;
      if (idx !== shown) {
        shown = idx;
        setActive(idx);
      }
    };

    const go = (k, duration = 1.1) => {
      target = k;
      gsap.to(state, {
        a: k * step,
        duration,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: render,
      });
    };

    // Shortest way round to card i from wherever the ring is now
    const goToIndex = (i) => {
      const current = ((target % n) + n) % n;
      let diff = i - current;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      go(target + diff);
    };

    api.current = {
      next: () => go(target + 1),
      prev: () => go(target - 1),
      go: goToIndex,
    };

    layout();
    render();

    /* ---- Entrance: the ring swings round into place ---- */
    if (!reducedMotion()) {
      gsap.fromTo(
        state,
        { a: -140 },
        { a: 0, duration: 2.4, ease: 'expo.out', onUpdate: render }
      );
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' }
      );
    }

    // Pointer state, read by the auto-advance and the drag handlers below
    let dragging = false;
    let moved = 0;
    let startX = 0;
    let startA = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    const DEG_PER_PX = 0.22;

    /* ---- Auto-advance, paused under the pointer, on focus, or offscreen ---- */
    let paused = false;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const auto = reducedMotion()
      ? null
      : setInterval(() => {
          if (!paused && visible && !dragging && !document.hidden) go(target + 1, 1.4);
        }, 4200);

    const hold = () => (paused = true);
    const release = () => (paused = false);
    el.addEventListener('pointerenter', hold);
    el.addEventListener('pointerleave', release);
    el.addEventListener('focusin', hold);
    el.addEventListener('focusout', release);

    /* ---- Drag ---- */

    const down = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = lastX = e.clientX;
      startA = state.a;
      lastT = performance.now();
      velocity = 0;
      gsap.killTweensOf(state);
      el.setPointerCapture?.(e.pointerId);
      el.classList.add('is-dragging');
    };
    const move = (e) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      state.a = startA - dx * DEG_PER_PX;
      velocity = ((lastX - e.clientX) * DEG_PER_PX) / Math.max(now - lastT, 1);
      lastX = e.clientX;
      lastT = now;
      render();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      // Carry a flick a little further, then settle on the nearest card
      const thrown = state.a + velocity * 260;
      go(Math.round(thrown / step), 0.9);
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);

    // A click that was really the end of a drag must not open a card
    const click = (e) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const card = e.target.closest('.ring__card');
      if (!card) return;
      const i = cards.indexOf(card);
      if (i !== shown) goToIndex(i);
      else onOpen?.(items[i]);
    };
    el.addEventListener('click', click, true);

    const key = (e) => {
      if (e.key === 'ArrowRight') api.current.next();
      if (e.key === 'ArrowLeft') api.current.prev();
    };
    el.addEventListener('keydown', key);

    const resize = () => {
      layout();
      render();
    };
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(auto);
      io.disconnect();
      gsap.killTweensOf(state);
      gsap.killTweensOf(el);
      el.removeEventListener('pointerenter', hold);
      el.removeEventListener('pointerleave', release);
      el.removeEventListener('focusin', hold);
      el.removeEventListener('focusout', release);
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.removeEventListener('click', click, true);
      el.removeEventListener('keydown', key);
      window.removeEventListener('resize', resize);
    };
  }, [items, onOpen]);

  const p = items[active];

  return (
    <div className="ring">
      <div
        className="ring__stage"
        ref={stage}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects in 3D. Drag, or use the left and right arrow keys."
      >
        <div className="ring__tilt">
          <div className="ring__spin" ref={spin}>
            {items.map((it, i) => (
              <button
                type="button"
                className="ring__card"
                key={it.id}
                draggable="false"
                aria-label={i === active ? `View details for ${it.name}` : it.name}
                aria-hidden={i !== active}
                tabIndex={-1}
              >
                {it.image ? (
                  <img src={it.image} alt="" width="320" height="400" draggable="false" />
                ) : (
                  <span className="ring__plate">
                    <img src="/images/branding/logo-mark-trimmed.png" alt="" width="46" height="25" draggable="false" />
                    <span className="h4">{it.developer || it.area}</span>
                  </span>
                )}
                <span className="ring__name mono-sm">{it.name}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="ring__floor" aria-hidden="true" />
      </div>

      <div className="ring__detail" aria-live="polite">
        <p className="ring__index mono-sm">
          {pad(active + 1)} <span>/ {pad(items.length)}</span>
        </p>
        <div className="ring__copy" key={p.id}>
          <h2 className="h2 ring__title">{p.name}</h2>
          <dl className="ring__facts">
            {[
              ['Location', p.location || p.area],
              ['Configuration', p.config],
              ['Developer', p.developer],
              ['MahaRERA number', p.reraNumber],
              ['Starting from', p.priceFrom],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="mono-sm">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
        </div>
        <div className="ring__actions">
          <Pill onClick={() => window.dispatchEvent(new Event('enquiry:open'))}>
            Enquire about this project
          </Pill>
          <div className="ring__arrows">
            <button type="button" className="ring__arrow" onClick={() => api.current.prev()} aria-label="Previous project">
              &larr;
            </button>
            <button type="button" className="ring__arrow" onClick={() => api.current.next()} aria-label="Next project">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
