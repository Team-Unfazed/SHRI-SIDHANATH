import { useEffect, useMemo, useState } from 'react';
import { projects as staticProjects } from '../data/projects';
import { fetchLiveProperties } from '../data/liveProperties';

/**
 * `projects`/`featuredProjects`, live from the admin panel where it has
 * something to say. Renders the static pipeline's output immediately and
 * unconditionally -- every consumer already imports `projects` as a plain
 * array, so the first render here is pixel-identical to today. If the live
 * fetch lands: existing slugs get patched in place (text fields only, see
 * src/data/liveProperties.js for why), and any admin-panel property whose
 * slug the static pipeline has never heard of is appended -- otherwise a
 * property created only in the admin panel would never appear anywhere on
 * the site, which is the one thing this integration exists to prevent.
 */
export function useProjects() {
  const knownSlugs = useMemo(() => new Set(staticProjects.map((p) => p.id)), []);
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    let cancelled = false;
    fetchLiveProperties(knownSlugs).then((result) => {
      if (cancelled || !result) return;
      const { overlay, additions } = result;
      setProjects((current) => [
        ...current.map((project) => (overlay[project.id] ? { ...project, ...overlay[project.id] } : project)),
        ...additions,
      ]);
    });
    return () => {
      cancelled = true;
    };
  }, [knownSlugs]);

  return { projects, featuredProjects: projects.filter((p) => p.featured) };
}
