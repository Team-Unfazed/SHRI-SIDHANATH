// Live data from the admin panel's Supabase project.
//
// `projects.js` stays the source of truth for the 42 projects that pipeline
// already knows about (existingProjects + the MahaRERA search + the client's
// register) and their image rights, which the admin panel's own three-value
// `licence` column cannot fully represent. For those 42, Supabase only
// overlays the fields the admin panel actually edits -- price, configuration,
// the one-line detail, developer, name -- never image or licence, so a
// developer-artwork credit or a placeholder flag can never be silently lost.
//
// A property created in the admin panel with no matching slug in that static
// list is a different case: there is nothing static to preserve, so it needs
// a *complete* entry -- image included -- or it would simply never appear on
// the site, which defeats the entire point of the admin panel being able to
// add listings. buildLiveProject() below does that full mapping.
//
// Same request pattern as src/lib/enquiries.js: a plain fetch against
// PostgREST, no SDK, matching the rest of this dependency-light site.

const url = import.meta.env.VITE_SUPABASE_URL || 'https://aimiaugyokllclljabwh.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_GQVyrV1sjvX8Vj6VRjRDEA_yXRoNuY6';

const FIELDS = [
  'slug', 'name', 'developer', 'category', 'config_display', 'summary',
  'price_display', 'featured', 'locality', 'area_label', 'address_line',
  'licence', 'source', 'verified',
  'media:property_media(storage_path,external_url,alt_text,is_primary)',
].join(',');

const titleCase = (value) => value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// The admin panel's licence vocabulary ('first-party' | 'placeholder' |
// 'licensed') is narrower than the static pipeline's. 'licensed' has no
// direct equivalent there -- closest in spirit, and in what it permits, is
// 'client-supplied'. A brand-new listing with nothing recorded at all is
// withheld from showing a photo at all (`image: null`) rather than assumed
// safe to publish -- the same "never guessed" rule the static data follows.
const LICENCE_MAP = { 'first-party': 'first-party', placeholder: 'placeholder', licensed: 'client-supplied' };

function primaryImageUrl(media) {
  const primary = media?.find((m) => m.is_primary) ?? media?.[0];
  if (!primary) return null;
  if (primary.external_url) return primary.external_url;
  if (primary.storage_path) return `${url}/storage/v1/object/public/properties/${primary.storage_path}`;
  return null;
}

function buildLiveProject(row) {
  const image = primaryImageUrl(row.media);
  const primary = row.media?.find((m) => m.is_primary) ?? row.media?.[0];
  return {
    id: row.slug,
    name: row.name,
    location: row.address_line ? `${row.area_label ?? row.locality ?? ''}, ${row.address_line}`.replace(/^, /, '') : (row.area_label ?? row.locality ?? null),
    area: row.area_label ?? row.locality ?? null,
    category: row.category ? titleCase(row.category) : null,
    developer: row.developer ?? null,
    config: row.config_display ?? null,
    detail: row.summary ?? null,
    priceFrom: row.price_display ?? null,
    image,
    imageAlt: image ? (primary?.alt_text ?? row.name) : null,
    // No image, no licence question -- there is nothing to clear.
    licence: image ? (LICENCE_MAP[row.licence] ?? null) : null,
    source: row.source ?? 'admin-panel',
    verified: Boolean(row.verified),
    featured: Boolean(row.featured),
  };
}

/**
 * `{ overlay: { [slug]: patch }, additions: [project, …] }`, or null if the
 * fetch failed, timed out, or returned nothing -- the caller keeps the
 * static data exactly as it is in every one of those cases. `overlay` only
 * ever contains fields the admin panel actually had a value for, so
 * `{...staticProject, ...patch}` can never blank out a good static value
 * with a key that is merely present but null. `additions` is every
 * published property whose slug the static pipeline does not already know.
 */
export async function fetchLiveProperties(knownSlugs) {
  try {
    const response = await fetch(
      `${url}/rest/v1/properties?select=${FIELDS}&status=eq.published`,
      { headers: { apikey: key }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return null;

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) return null;

    const overlay = {};
    const additions = [];
    for (const row of rows) {
      if (!row.slug) continue;
      if (knownSlugs.has(row.slug)) {
        const patch = {};
        if (row.name) patch.name = row.name;
        if (row.developer) patch.developer = row.developer;
        if (row.config_display) patch.config = row.config_display;
        if (row.summary) patch.detail = row.summary;
        if (row.price_display) patch.priceFrom = row.price_display;
        if (typeof row.featured === 'boolean') patch.featured = row.featured;
        overlay[row.slug] = patch;
      } else {
        additions.push(buildLiveProject(row));
      }
    }
    return { overlay, additions };
  } catch {
    // Offline, Supabase unreachable, or the 8s timeout -- the static array
    // is the fallback, not an error state the visitor should ever see.
    return null;
  }
}
