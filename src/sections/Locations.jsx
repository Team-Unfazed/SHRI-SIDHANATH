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
              {/* The market images are wide banners with the project name set
                  into them, so they are shown whole at their own shape rather
                  than cropped to a square through the lettering. */}
              <div className="loc__media">
                <img
                  className="loc__img"
                  src={l.image}
                  srcSet={l.imageSmall ? `${l.imageSmall} 800w, ${l.image} 1200w` : undefined}
                  sizes="(max-width: 980px) 100vw, 33vw"
                  alt={l.imageAlt}
                  width="1200"
                  height="662"
                  loading="lazy"
                />
                <span className="loc__tag mono-sm">{l.role}</span>
              </div>
              <div className="loc__body">
                <p className="loc__name h4">
                  {l.pagePath ? <a href={l.pagePath}>{l.name}</a> : l.name}
                </p>
                <h3>{l.note}</h3>
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
