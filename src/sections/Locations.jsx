import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { locations } from '../data/content';
import './Locations.css';

/**
 * The template runs a blog grid here. There is no blog, so the same card grid
 * carries the markets instead — it is the section the page was missing anyway,
 * and a market card has the identical shape: one image, two lines of meta, a
 * title, and one action.
 */
export default function Locations() {
  return (
    <section className="loc band" id="locations">
      <div className="wrap">
        <Reveal className="loc__head">
          <div>
            <Label>Locations</Label>
            <SplitReveal as="h2" className="h1 loc__title">
              Where we work, and
              <br />
              how well we know it
            </SplitReveal>
          </div>
          <Pill href="#contact" className="pill--block-sm">
            Talk to the desk
          </Pill>
        </Reveal>

        <ul className="loc__grid">
          {locations.map((l, i) => (
            <Reveal as="li" className="loc__item" key={l.id} delay={(i % 2) * 0.07} depth={22} data-tilt="5">
              <img
                className="loc__img"
                src={l.imageSmall || l.image}
                alt={l.imageAlt}
                width="300"
                height="300"
                loading="lazy"
              />
              <div className="loc__body">
                <p className="loc__meta mono-sm">
                  <span>{l.role}</span>
                  <span aria-hidden="true">&mdash;</span>
                  <span>{l.name}</span>
                </p>
                <h3 className="h5">{l.note}</h3>
                <Pill as="a" href="#contact" tone="ghost" size="sm" className="loc__cta">
                  Enquire
                </Pill>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
