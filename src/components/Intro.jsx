import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { finishIntro, introSkipped, setIntroComplete } from '../lib/intro';
import { createIntroScene } from '../lib/introScene';
import { site } from '../data/site';
import './Intro.css';

const MARKETS = ['Mumbai', 'Navi Mumbai', 'Thane', 'Raigad', 'Pune'];
const WORDS = ['Shri', 'Sidhanath'];

/* The curtain stays up at least this long so the build can finish on a warm
   cache, and never longer than the cap so a slow connection is not held shut. */
const FLOOR = 3.6;
const CAP = 6.5;

/**
 * The entrance: a city rises out of the dark, the brand mark assembles over
 * it, the wordmark lands, and the camera flies through the mark while an iris
 * opens onto the hero.
 *
 * The 3D lives in `lib/introScene.js`. This component owns the type, the load
 * counter, and the one master sequence that both halves play on. If WebGL is
 * unavailable the scene is simply absent and the type-only intro still plays.
 */
export default function Intro() {
  const root = useRef(null);
  const stage = useRef(null);
  const counter = useRef(null);
  const fill = useRef(null);
  const exitRef = useRef(() => {});
  const [gone, setGone] = useState(introSkipped);

  useEffect(() => {
    if (introSkipped) return;
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let scene = null;
    try {
      scene = createIntroScene(stage.current);
    } catch {
      scene = null; // no WebGL — the type carries the intro alone
    }

    /* ---- The build ---- */
    const count = { v: 0 };
    const paint = () => {
      const v = Math.round(count.v);
      if (counter.current) counter.current.textContent = String(v).padStart(3, '0');
      if (fill.current) fill.current.style.transform = `scaleX(${count.v / 100})`;
    };

    const build = gsap.timeline();
    if (scene) build.add(scene.enter(), 0);

    build
      .fromTo(
        q('.intro__hud > *'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
        0.35
      )
      .fromTo(
        q('.intro__char'),
        { yPercent: 115, rotateX: -85, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.035,
          ease: 'expo.out',
        },
        2.05
      )
      .fromTo(
        q('.intro__rule'),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'expo.inOut' },
        2.35
      )
      .fromTo(
        q('.intro__tagline'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        2.6
      )
      // The counter runs to 90 with the build; the last ten wait on `load`
      .to(count, { v: 90, duration: FLOOR - 0.4, ease: 'power1.inOut', onUpdate: paint }, 0);

    /* ---- The exit ---- */
    let exiting = false;
    let out = null;

    const exit = () => {
      if (exiting) return;
      exiting = true;
      build.kill();

      out = gsap.timeline({
        onComplete: () => {
          // This component stays mounted after returning null. Stop its hidden
          // WebGL render loop so it cannot compete with scrolling and video.
          scene?.dispose();
          scene = null;
          if (!document.body.dataset.navOpen) document.body.style.overflow = '';
          setGone(true);
          setIntroComplete();
        },
      });

      if (scene) out.add(scene.exit(), 0);

      out
        .to(count, { v: 100, duration: 0.35, ease: 'power2.out', onUpdate: paint }, 0)
        .to(
          q('.intro__char'),
          {
            yPercent: -115,
            opacity: 0,
            duration: 0.5,
            stagger: { each: 0.012, from: 'center' },
            ease: 'power3.in',
          },
          0
        )
        .to(
          q('.intro__rule, .intro__tagline, .intro__hud, .intro__skip'),
          { opacity: 0, y: -8, duration: 0.5, ease: 'power2.in' },
          0.05
        )
        // The hero starts settling underneath before the iris opens onto it
        .add(finishIntro, 0.7)
        .add(() => el.classList.add('is-opening'), 0.75)
        .fromTo(el, { '--iris': 0 }, { '--iris': 1, duration: 0.95, ease: 'power2.inOut' }, 0.75)
        .to(el, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 1.45);
    };
    exitRef.current = exit;

    /* ---- When to leave ---- */
    const loaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });
    const wait = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));
    let alive = true;
    Promise.race([Promise.all([loaded, wait(FLOOR)]), wait(CAP)]).then(() => {
      if (alive) exit();
    });

    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        exit();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      alive = false;
      window.removeEventListener('keydown', onKey);
      build.kill();
      out?.kill();
      scene?.dispose();
      if (!document.body.dataset.navOpen) document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="intro"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome to ${site.name}`}
      onClick={() => exitRef.current()}
    >
      <div className="intro__stage" ref={stage} aria-hidden="true" />
      <div className="intro__vignette" aria-hidden="true" />

      <header className="intro__hud intro__hud--top mono-sm" aria-hidden="true">
        <span>Constructions &amp; Estate Consultant</span>
        <span>
          {site.reraAuthority} {site.rera}
        </span>
      </header>

      <div className="intro__type">
        <p className="intro__wordmark" aria-label={site.name}>
          {WORDS.map((word) => (
            <span className="intro__word" key={word} aria-hidden="true">
              {[...word].map((ch, i) => (
                <span className="intro__char" key={i}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </p>
        <span className="intro__rule" aria-hidden="true" />
        <p className="intro__tagline mono-sm">Real estate advisory · New Panvel</p>
      </div>

      <footer className="intro__hud intro__hud--bottom mono-sm" aria-hidden="true">
        <ul className="intro__markets">
          {MARKETS.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <div className="intro__load">
          <span className="intro__bar">
            <span className="intro__fill" ref={fill} />
          </span>
          <span className="intro__count" ref={counter}>
            000
          </span>
        </div>
      </footer>

      <button
        type="button"
        className="intro__skip mono-sm"
        onClick={(e) => {
          e.stopPropagation();
          exitRef.current();
        }}
      >
        Enter site <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
