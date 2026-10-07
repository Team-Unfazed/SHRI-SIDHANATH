import { useMemo, useState } from 'react';
import Label from '../components/Label';
import SplitReveal from '../components/SplitReveal';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import PropertyDetail from '../components/PropertyDetail';
import { useProjects } from '../hooks/useProjects';
import './Listings.css';

export default function Listings() {
  const { projects } = useProjects();
  const [selected, setSelected] = useState(null);

  /* The homepage carries a shortlist, not the catalogue: the first four
     projects that have a photograph. Everything else lives on
     /projects.html. Which four, and their order, depends only on `image`,
     which the live overlay never touches -- only the live patch's text
     (price, name, …) needs this recomputed when it lands. */
  const SHORTLIST = useMemo(() => projects.filter((p) => p.image).slice(0, 4), [projects]);

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
              <ProjectCard project={p} onOpen={setSelected} />
            </Reveal>
          ))}
        </ul>
      </div>

      {selected && <PropertyDetail project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
