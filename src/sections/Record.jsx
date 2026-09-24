import { useRef } from 'react';
import Counter from '../components/Counter';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { locations } from '../data/content';
import './Record.css';

/**
 * The template's stats band, with every invented figure removed.
 *
 * Six numbers, each traceable: the Google rating and review count were read off
 * the client's Business Profile on 2026-09-12, the project count and market
 * count are derived from the content layer, the registration is the MahaRERA
 * number, and the hours are the ones on the door. Nothing is rounded up and
 * nothing is restated. If a figure cannot be evidenced it is not here — which
 * is why there is no client count and no years-in-business.
 *
 * Laid out as a statement on the left and a 3 × 2 set of tiles on the right,
 * so the band stays short without squeezing six figures into one thin row.
 */
const STATS = [
  { caption: 'Google rating', value: site.google.rating, foot: `${site.google.reviews} reviews`, rating: true },
  { caption: 'Projects marketed', value: String(projects.length), foot: 'From the current list' },
  { caption: 'Markets covered', value: String(locations.length), foot: 'Mumbai to Pune' },
  { caption: 'Open every day', value: '13h', foot: site.google.hoursLabel },
  // Part of a registration number, not a quantity — it decodes, never counts.
  { caption: 'MahaRERA', value: 'A52', foot: site.rera, mode: 'decode' },
  { caption: 'Headquarters', value: '01', foot: site.headquarters },
];

export default function Record() {
  const meter = useRef(null);

  /* The stars fill in step with the rating as it counts. */
  const onRating = (n) => meter.current?.style.setProperty('--fill', `${(n / 5) * 100}%`);

  return (
    <section className="rec on-dark" id="record">
      <div className="wrap rec__inner">
        <Reveal className="rec__intro">
          <Label>On the record</Label>
          <SplitReveal as="h2" className="h2 rec__title">
            What can be checked, and where to check it
          </SplitReveal>
          <p className="rec__lede">
            Every figure here can be verified by you: on Google, on the MahaRERA register, or at our
            door.
          </p>
          <div className="rec__actions">
            <Pill href={site.google.url} target="_blank" rel="noreferrer">
              See the reviews
            </Pill>
            <p className="rec__rera mono-sm">MahaRERA {site.rera}</p>
          </div>
        </Reveal>

        <div className="rec__grid">
          {STATS.map((s, i) => (
            <Reveal
              className={`rec__cell${s.rating ? ' rec__cell--rating' : ''}`}
              key={s.caption}
              delay={i * 0.07}
              depth={18}
              data-tilt="7"
            >
              <div className="rec__top">
                <p className="rec__caption">{s.caption}</p>
                <span className="rec__index mono-sm" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="rec__value">
                <Counter
                  value={s.value}
                  mode={s.mode}
                  delay={0.2 + i * 0.08}
                  onUpdate={s.rating ? onRating : undefined}
                />
              </p>
              <div className="rec__bottom">
                <p className="rec__foot mono-sm">{s.foot}</p>
                {s.rating && (
                  <span className="rec__stars" ref={meter} aria-hidden="true">
                    <span className="rec__stars-fill">★★★★★</span>
                    ★★★★★
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
