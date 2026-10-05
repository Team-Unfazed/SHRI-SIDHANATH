import './ProjectCard.css';
import ProjectRegistration from './ProjectRegistration';

/**
 * One project, as a card: photograph (or a typographic plate where there is no
 * photograph), then name, starting price and location. Shared by the homepage
 * shortlist and the projects page, so the two never drift apart.
 *
 * Only what the content layer records is shown — a missing price or
 * configuration is simply absent, never filled in.
 */
export default function ProjectCard({ project: p, href = '/#contact' }) {
  const meta = [p.area, p.config].filter(Boolean).join(' · ');

  return (
    <article className="pcard-entry">
    <a className="pcard" href={href} data-tilt="6" aria-label={`Enquire about ${p.name}`}>
      <span className="pcard__media">
        {p.image ? (
          <img src={p.image} alt={p.imageAlt} width="560" height="700" loading="lazy" />
        ) : (
          <span className="pcard__plate">
            <img src="/images/branding/logo-mark-trimmed.png" alt="" width="52" height="28" />
            <span className="h4">{p.developer || p.area}</span>
          </span>
        )}
        {p.category && <span className="pcard__tag mono-sm">{p.category}</span>}
        {p.imageCredit && <span className="pcard__credit mono-sm">Illustration: {p.imageCredit}</span>}
        <span className="pcard__enquire mono-sm" aria-hidden="true">
          Enquire &rarr;
        </span>
      </span>

      <span className="pcard__body">
        <span className="pcard__row">
          <span className="pcard__name h5">{p.name}</span>
          {p.priceFrom && <span className="pcard__price mono-sm">From {p.priceFrom}</span>}
        </span>
        <span className="pcard__meta mono-sm">{meta}</span>
        {p.reraNumber && <>
          {p.developer && <span className="pcard__meta mono-sm">{p.developer}</span>}
          <span className="pcard__meta mono-sm">RERA: {p.reraNumber}</span>
          {p.status && <span className="pcard__meta mono-sm">{p.status}</span>}
          {p.completionDate && <span className="pcard__meta mono-sm">Proposed completion: {p.completionDate}</span>}
        </>}
      </span>
    </a>
    <ProjectRegistration project={p} />
    </article>
  );
}
