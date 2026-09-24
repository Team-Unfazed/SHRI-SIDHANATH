import { gsap, reducedMotion } from './motion';

/**
 * The overlapping stack.
 *
 * Each band after the hero rides up over the one before it (the geometry is in
 * base.css). This adds the depth: as the next panel climbs over a panel, that
 * panel's `--panel-dim` is scrubbed up, so it recedes rather than simply being
 * covered.
 *
 * Driven off the *incoming* panel's position, not the outgoing one's, because
 * the two are different lengths — several of these bands are 2,000px tall and a
 * trigger tied to the outgoing panel's own box would finish dimming it long
 * before anything had actually arrived.
 *
 * No transforms anywhere. Services stacks its own cards with
 * `position: sticky`, and a transformed ancestor is precisely what breaks
 * sticky positioning.
 */
export function initStack(sheet, tail) {
  if (!sheet || reducedMotion()) return () => {};

  // The footer lives outside the sheet (it is not part of <main>) but is the
  // last panel in the stack, so it is appended here to give the closing section
  // something to recede behind.
  const panels = [...sheet.children, tail].filter(Boolean);
  const ctx = gsap.context(() => {
    panels.forEach((panel, i) => {
      const next = panels[i + 1];
      if (!next) return;

      gsap.fromTo(
        panel,
        { '--panel-dim': 0 },
        {
          '--panel-dim': 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            // Only once the incoming panel has covered half the screen, to the
            // point where it has taken it. Starting at its first appearance
            // greyed out short panels (the project shortlist) while they were
            // still being read.
            start: 'top 50%',
            end: 'top top',
            scrub: 0.4,
          },
        }
      );
    });
  }, sheet);

  return () => ctx.revert();
}
