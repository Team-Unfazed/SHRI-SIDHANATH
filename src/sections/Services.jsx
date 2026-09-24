import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import { services } from '../data/content';
import './Services.css';

/* Short-form tags for the chip row. These restate what is already in each
   service's `points`; they add no claim that the content layer does not make. */
const TAGS = {
  'project-management': ['Liaison', 'Implementation', 'Handover'],
  'exclusive-mandates': ['Positioning', 'Pricing', 'Outreach'],
  'resale-rental': ['Valuation', 'Qualification', 'Documentation'],
  'property-management': ['Tenancy', 'Upkeep', 'Compliance'],
};

/* The word that sits under the rule on the left rail, where the template put a
   growth multiple. A discipline, not a statistic — there is no evidenced
   multiple to print, and inventing one would be the one thing this site does
   not do. */
const RAIL = {
  'project-management': 'Advisory',
  'exclusive-mandates': 'Mandates',
  'resale-rental': 'Resale',
  'property-management': 'Stewardship',
};

export default function Services() {
  return (
    <section className="svc band" id="services">
      <div className="wrap">
        <hr className="rule" />

        <Reveal className="svc__head">
          <div>
            <Label>Services</Label>
            <SplitReveal as="h2" className="h1 svc__title">
              From requirement to keys —
              <br />
              handled end to end
            </SplitReveal>
          </div>
          <Pill href="#listings" className="pill--block-sm">
            Explore projects
          </Pill>
        </Reveal>

        <div className="svc__list">
          {services.map((s, i) => (
            <article className="svc__item" key={s.id} style={{ '--i': i }}>
              <div className="svc__rail">
                <span className="mono-sm">//{s.number}</span>
                <span className="svc__rail-word">
                  <span className="h4">{RAIL[s.id]}</span>
                  <span className="mono-sm">Discipline</span>
                </span>
              </div>

              <img className="svc__img" src={s.image} alt={s.imageAlt} width="420" height="360" />

              <div className="svc__body">
                <h3 className="h4">{s.title}</h3>
                <p className="lede">{s.summary}</p>
                <ul className="svc__tags">
                  {TAGS[s.id].map((t) => (
                    <li className="mono-sm" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <a className="svc__go" href="#contact" aria-label={`Enquire about ${s.title}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 8h11a4 4 0 0 1 4 4v4m0 0-3-3m3 3 3-3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
