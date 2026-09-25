import { useEffect, useRef } from 'react';
import { site } from '../data/site';
import { gsap, SplitText, reducedMotion } from '../lib/motion';
import { introDone } from '../lib/intro';
import Pill from '../components/Pill';
import './Hero.css';

/* The markets named in the lede, in the order a Panvel buyer thinks of them.
   These are the localities the practice actually covers (see data/content). */
const AREAS = ['New Panvel', 'Kharghar', 'Kamothe', 'Kalamboli', 'Taloja', 'Ulwe'];

/**
 * The hero, written for two readers.
 *
 * For a person: the `Buy. Sell. Rent` masthead at 16.1vw carries the brand, and
 * under it one statement, one paragraph, two actions and one card of proof.
 *
 * For a search engine: the page's only <h1> is the phrase people type —
 * "real estate consultants in Panvel" — and the lede beside it names the
 * services and the localities in plain prose. The card underneath carries the
 * name, address, phone and hours as visible text, matching the structured data
 * in index.html, because consistent name/address/phone is what local ranking is
 * built on. The masthead is deliberately *not* the heading: three verbs tell a
 * crawler nothing about who or where.
 *
 * ---- Motion ----
 * The entrance: sky settles, the estate rises, the masthead letters swing up
 * out of their masks in depth, then the heading, lede, actions and card follow.
 *
 * After that, the background keeps a slow breath — the sky drifts over ~40s and
 * a faint band of light passes across it — and on fine pointers the sky and the
 * estate shift by different amounts, which is what gives the photograph depth.
 * Kept deliberately small: it should be felt, not watched.
 *
 * On scroll the hero scrolls away normally; its copy fades as it leaves.
 */
export default function Hero() {
  const root = useRef(null);
  const fitWord = useRef(() => {});

  /* The masthead is sized to the hero, not to a vw guess: measure the words at
     the current size and scale so they run exactly gutter to gutter. Runs once
     the fonts are in (a fallback face has different widths) and on resize. */
  useEffect(() => {
    const word = root.current?.querySelector('.banner__word');
    if (!word) return undefined;

    const fit = () => {
      const box = word.parentElement;
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      /* On phones the three words stack, so the widest word sets the size;
         elsewhere the whole line does. */
      const stacked = window.matchMedia('(max-width: 600px)').matches;
      const parts = stacked ? [...word.querySelectorAll('.banner__w')] : [word];
      const width = Math.max(
        ...parts.map((n) => {
          const range = document.createRange();
          range.selectNodeContents(n);
          return range.getBoundingClientRect().width;
        })
      );
      if (!width || !avail) return;
      const size = parseFloat(getComputedStyle(word).fontSize);
      let next = size * (avail / width) * 0.99;

      /* Stacked, the word could also outgrow the height: keep all three lines
         in the sky above the heading, with a clear gap before it. */
      if (stacked) {
        const foot = box.querySelector('.banner__foot');
        const room =
          window.innerHeight -
          parseFloat(cs.paddingTop) -
          (parseFloat(cs.paddingBottom) - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel-radius') || 0)) -
          (foot?.offsetHeight ?? 0) -
          parseFloat(getComputedStyle(word).marginTop) -
          28;
        const lineHeight = parseFloat(getComputedStyle(word).lineHeight) / size;
        next = Math.min(next, room / (3 * lineHeight));
      }
      word.style.fontSize = `${Math.floor(next * 100) / 100}px`;
    };

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    fitWord.current = fit;
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const layers =
      '.banner__sky, .banner__arch, .banner__atmos, .banner__word, .banner__eyebrow, .banner__title, .banner__lede, .banner__actions > *, .banner__card';

    if (reducedMotion()) {
      gsap.set(q(layers), { opacity: 1, y: 0, yPercent: 0, scale: 1 });
      return;
    }

    let tl = null;
    let wave = null;
    let offTilt = () => {};
    let wordSplit = null;

    /* The masthead's living state, once the letters have landed. Kept quiet:
       the word leans a few degrees toward the pointer, and every few seconds a
       slow ripple rolls through it — each letter tips back in depth and settles,
       left to right. No colour, no glow; the depth does the work. */
    const startDepth = (chars) => {
      const word = q('.banner__word')[0];
      /* The line masks were only for the entrance; left on, they would clip
         the ripple and the shadow under the letters. */
      gsap.set(q('.banner__word-line-mask, .banner__word-line'), { overflow: 'visible' });
      gsap.set(word, { transformPerspective: 1400, transformOrigin: '50% 60%' });

      wave = gsap.timeline({ repeat: -1, repeatDelay: 4.5, delay: 1.2 });
      wave.to(chars, {
        keyframes: [
          { rotationX: -28, z: 30, duration: 0.5, ease: 'power2.out' },
          { rotationX: 0, z: 0, duration: 0.9, ease: 'power3.inOut' },
        ],
        transformPerspective: 700,
        transformOrigin: '50% 100%',
        stagger: 0.045,
      });

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const opts = { duration: 1.4, ease: 'power3.out' };
        const tiltY = gsap.quickTo(word, 'rotationY', opts);
        const tiltX = gsap.quickTo(word, 'rotationX', opts);
        const tilt = (e) => {
          tiltY((e.clientX / window.innerWidth - 0.5) * 8);
          tiltX((e.clientY / window.innerHeight - 0.5) * -6);
        };
        el.addEventListener('pointermove', tilt);
        offTilt = () => el.removeEventListener('pointermove', tilt);
      }
    };
    let titleSplit = null;
    let cancelled = false;

    Promise.all([document.fonts?.ready ?? Promise.resolve(), introDone]).then(() => {
      if (cancelled || !el.isConnected) return;

      wordSplit = new SplitText(q('.banner__word'), {
        type: 'lines,chars',
        mask: 'lines',
        linesClass: 'banner__word-line',
        charsClass: 'banner__char',
      });
      titleSplit = new SplitText(q('.banner__title'), {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'banner__title-line',
        wordsClass: 'banner__title-word',
      });

      /* Split letters lose their kerning pairs, so the word is wider now than
         when it was first measured — fit it again. */
      fitWord.current();
      gsap.set(q('.banner__word, .banner__title'), { opacity: 1 });

      tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl
        .fromTo(q('.banner__sky'), { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo(q('.banner__atmos'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power1.out' }, 0.2)
        .fromTo(q('.banner__arch'), { opacity: 0, yPercent: 6 }, { opacity: 1, yPercent: 0, duration: 1.8, ease: 'power3.out' }, 0.5)
        // Masthead letters swing upright out of their masks, off their baselines
        .fromTo(
          wordSplit.chars,
          { yPercent: 105, rotationX: -80, transformPerspective: 700, transformOrigin: '50% 100%' },
          { yPercent: 0, rotationX: 0, duration: 1.4, stagger: 0.03 },
          0.75
        )
        .fromTo(q('.banner__eyebrow'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 1.2)
        .fromTo(titleSplit.words, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.05 }, 1.25)
        .fromTo(q('.banner__lede'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 1.5)
        .fromTo(
          q('.banner__actions > *'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
          1.6
        )
        // The card swings forward out of depth
        .fromTo(
          q('.banner__card'),
          { opacity: 0, y: 30, rotationX: 18, rotationY: -14, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 1.5, ease: 'power3.out', clearProps: 'transform' },
          1.7
        )
        .add(() => startDepth(wordSplit.chars));
    });

    const ctx = gsap.context(() => {
      /* The breath. Runs on the inner images so it never collides with the
         entrance and scroll tweens on the picture wrappers. The sky is held a
         little oversized so neither the drift nor the pointer shift can ever
         expose an edge. */
      gsap.set(q('.banner__sky img'), { scale: 1.1 });
      gsap.to(q('.banner__sky img'), {
        xPercent: -2.5,
        yPercent: 1,
        duration: 40,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      /* Scroll-out: the page climbs over the hero and the hero recedes. The
         sheet lives outside the hero, so it is passed as an element — a
         selector string here would be scoped to the hero and match nothing. */
      gsap
        .timeline({
          scrollTrigger: { trigger: document.querySelector('.sheet'), start: 'top bottom', end: 'top top', scrub: 0.3 },
        })
        .to(el, { '--hero-dim': 0.48, ease: 'none', duration: 1 }, 0)
        .to(q('.banner__sky'), { yPercent: 10, scale: 1.05, ease: 'none', duration: 1 }, 0)
        .to(q('.banner__arch'), { yPercent: -4, scale: 1.03, ease: 'none', duration: 1 }, 0)
        .to(q('.banner__word'), { y: -70, opacity: 0, ease: 'power1.in', duration: 0.55 }, 0)
        .to(q('.banner__foot'), { y: -25, opacity: 0, ease: 'power1.in', duration: 0.35 }, 0);
    }, el);

    /* Depth on the pointer: the far layer (sky) moves least and against the
       near one (estate), the way a real view shifts when you move your head. */
    let offPointer = () => {};
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      gsap.set(q('.banner__arch img'), { scale: 1.04, transformOrigin: '50% 100%' });
      const opts = { duration: 1.6, ease: 'power3.out' };
      const skyX = gsap.quickTo(q('.banner__sky img')[0], 'x', opts);
      const skyY = gsap.quickTo(q('.banner__sky img')[0], 'y', opts);
      const archX = gsap.quickTo(q('.banner__arch img')[0], 'x', opts);
      const move = (e) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        skyX(px * -14);
        skyY(py * -8);
        archX(px * 22);
      };
      el.addEventListener('pointermove', move);
      offPointer = () => el.removeEventListener('pointermove', move);
    }

    return () => {
      cancelled = true;
      offPointer();
      tl?.kill();
      wave?.kill();
      offTilt();
      ctx.revert();
      wordSplit?.revert();
      titleSplit?.revert();
    };
  }, []);

  return (
    <section className="banner on-dark" id="top" ref={root} aria-labelledby="hero-title">
      <div className="banner__stage" aria-hidden="true">
        <picture className="banner__sky">
          <source media="(max-width: 900px)" srcSet="/images/hero/sky-mobile2.webp" type="image/webp" />
          <source
            srcSet="/images/hero/sky-800.webp 800w, /images/hero/sky-1200.webp 1200w, /images/hero/sky-1600.webp 1600w, /images/hero/sky-2100.webp 2103w"
            sizes="100vw"
            type="image/webp"
          />
          <img src="/images/hero/sky-1600.jpg" alt="" width="1600" height="570" fetchPriority="high" decoding="async" />
        </picture>

        {/* A faint band of light that crosses the sky every so often */}
        <span className="banner__light" />

        <picture className="banner__arch">
          <source media="(max-width: 900px)" srcSet="/images/hero/arch-mobile2.webp" type="image/webp" />
          <source
            srcSet="/images/hero/arch-700.webp 700w, /images/hero/arch-900.webp 900w, /images/hero/arch-1200.webp 1200w, /images/hero/arch-1600.webp 1600w, /images/hero/arch-2100.webp 2103w"
            sizes="100vw"
            type="image/webp"
          />
          <img src="/images/hero/arch-1600.png" alt="" width="1600" height="570" fetchPriority="high" decoding="async" />
        </picture>

        <div className="banner__atmos" />
      </div>

      {/* Brand masthead — display type, not the page heading. */}
      <p className="banner__word" aria-label="Buy. Sell. Rent">
        <span className="banner__w">Buy.</span> <span className="banner__w">Sell.</span>{' '}
        <span className="banner__w">Rent</span>
      </p>

      <div className="banner__foot">
        <div className="banner__lead">
          <p className="banner__eyebrow mono-sm">
            <span className="banner__stars" aria-hidden="true">
              ★★★★★
            </span>
            {site.google.rating} on Google &middot; {site.google.reviews} reviews
          </p>

          <h1 className="banner__title" id="hero-title">
            Real estate consultants in <span className="banner__place">Panvel</span>, Navi Mumbai
          </h1>

          <p className="banner__lede">
            MahaRERA-registered property agents for buying, selling, renting and managing
            homes across {AREAS.slice(0, -1).join(', ')} and {AREAS[AREAS.length - 1]}.
          </p>

          <div className="banner__actions">
            <Pill href="#contact">Book a consultation</Pill>
            <Pill href={`tel:${site.phoneIntl}`} tone="ghost">
              Call {site.phoneDisplay}
            </Pill>
          </div>
        </div>

        {/* Name, address, phone and hours as visible text — the same values as
            the structured data in index.html. */}
        <address className="banner__card" data-tilt="6">
          <div className="banner__card-head">
            <img src="/images/branding/logo-mark-trimmed.png" alt="" width="40" height="40" />
            <div>
              <p className="banner__card-name">{site.fullName}</p>
              <p className="banner__card-sub mono-sm">Real estate consultant &middot; New Panvel</p>
            </div>
          </div>

          <dl className="banner__facts">
            <div>
              <dt className="mono-sm">MahaRERA</dt>
              <dd>{site.rera}</dd>
            </div>
            <div>
              <dt className="mono-sm">Google</dt>
              <dd>
                {site.google.rating} / 5 &middot; {site.google.reviews} reviews
              </dd>
            </div>
            <div>
              <dt className="mono-sm">Office</dt>
              <dd>
                {site.address.line2}, {site.address.line3}, {site.address.pincode}
              </dd>
            </div>
            <div>
              <dt className="mono-sm">Open</dt>
              <dd>{site.google.hoursLabel}</dd>
            </div>
          </dl>
        </address>
      </div>
    </section>
  );
}
