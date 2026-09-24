import { useEffect, useRef } from 'react';
import FloatingNav from './components/FloatingNav';
import Intro from './components/Intro';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Why from './sections/Why';
import Record from './sections/Record';
import Listings from './sections/Listings';
import Process from './sections/Process';
import Developers from './sections/Developers';
import Faq from './sections/Faq';
import Locations from './sections/Locations';
import Closer from './sections/Closer';
import Footer from './sections/Footer';
import { ScrollTrigger, initTilt } from './lib/motion';
import { initStack } from './lib/stack';
import { projects } from './data/projects';

/**
 * The LivIn layout, rebuilt.
 *
 * Section for section this is the template's running order, with three
 * substitutions where the original relied on material this practice does not
 * have and will not invent:
 *
 *   success stats  -> Record      only figures that can be checked
 *   testimonials   -> Developers  the marketed-projects list and the Google rating
 *   blog grid      -> Locations   the markets, in the same card grid
 *
 * Everything else — banner, about, services ladder, dark why-us band, listings,
 * process bars, featured deck, FAQ, masked wordmark, footer — maps one to one.
 */
export default function App() {
  const sheet = useRef(null);
  const footer = useRef(null);

  /**
   * Every section's reveal is measured on mount, which happens before the web
   * fonts swap in and before the imagery has height. Those two events move the
   * page by thousands of pixels, leaving triggers pinned to positions that no
   * longer exist — the symptom is whole sections staying at opacity 0 because
   * their start point ended up below the end of the document. Re-measuring
   * after fonts and load fixes it.
   */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    const timers = [setTimeout(refresh, 250), setTimeout(refresh, 1200)];
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    // Any late image settling its height also invalidates the measurements.
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener('load', refresh, { once: true }));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('load', refresh);
    };
  }, []);

  /* The overlapping stack. Set up after the reveals so its triggers are created
     last and therefore refreshed alongside them. */
  useEffect(() => initStack(sheet.current, footer.current), []);

  /* Pointer tilt on every card marked `data-tilt` */
  useEffect(() => initTilt(document.getElementById('main')), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* The 3D brand starting entrance animation */}
      <Intro />

      <ScrollProgress />
      <FloatingNav count={projects.length} />

      <main id="main">
        <Hero />

        {/* One opaque sheet, so the parked hero is covered rather than showing
            through every transparent band that follows it. */}
        <div className="sheet" ref={sheet}>
          <About />
          <Services />
          <Why />
          <Record />
          <Listings />
          <Process />
          <Developers />
          <Faq />
          <Locations />
          <Closer />
        </div>
      </main>

      {/* Outside the sheet, and outside <main>. It is solid black, so it covers
          the parked hero on its own. */}
      <Footer ref={footer} />
    </>
  );
}
