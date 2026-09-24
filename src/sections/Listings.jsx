import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import './Listings.css';

/* The homepage carries a shortlist, not the catalogue: the first four projects
   that have a photograph. Everything else lives on /projects.html. */
const SHORTLIST = projects.filter((p) => p.image).slice(0, 4);

export default function Listings() {
  return (
    <section className="lst band" id="listings">
      <div className="wrap">
        <Reveal className="lst__head">
          <div>
            <Label>Projects</Label>
            <SplitReveal as="h2" className="h2 lst__title">
              A shortlist worth seeing
            </SplitReveal>
          </div>
          <div className="lst__aside">
            <p className="lst__count mono-sm">
              {String(SHORTLIST.length).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}{' '}
              projects
            </p>
            <Pill href="/projects.html" className="pill--block-sm">
              Explore all projects
            </Pill>
          </div>
        </Reveal>

        <ul className="lst__grid">
          {SHORTLIST.map((p, i) => (
            <Reveal as="li" className="lst__item" key={p.id} delay={i * 0.06} depth={20}>
              <ProjectCard project={p} href="#contact" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
