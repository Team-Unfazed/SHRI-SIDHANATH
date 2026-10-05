import { useEffect, useRef } from 'react';
import { site } from '../data/site';
import { introDone } from '../lib/intro';
import { useBackgroundVideo } from '../lib/backgroundVideo';
import './About.css';

const officeLine = `${site.address.line2}, ${site.address.line3}`;

const facts = [
  { label: site.reraAuthority, value: site.rera },
  { label: 'Google', value: `${site.google.rating} / 5 · ${site.google.reviews} reviews` },
  { label: 'Office', value: officeLine },
  { label: 'Hours', value: site.google.hoursLabel },
];

export default function About() {
  const root    = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    return useBackgroundVideo(root, videoRef, introDone);
  }, []);

  /* The slab's entrance is held in CSS until the section is actually on screen —
     on load it is still a full viewport below the hero. */
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.dataset.inview = 'true';
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about on-dark" id="about" ref={root}>

      {/* full-bleed video — nothing layered over it */}
      <div className="about__stage" aria-hidden="true">
        <div className="about__video-shell">
          <video
            ref={videoRef}
            className="about__video"
            autoPlay muted loop playsInline
            preload="metadata"
            poster="/videos/about-us-poster.jpg"
            tabIndex={-1}
          >
            <source src="/videos/about-us-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* one horizontal slab, hinged up out of the floating nav beneath it */}
      <div className="about__line">
        <div className="about__rise">
          <div className="about__slab" data-tilt="5">
            <div className="about__scroll">

              <h2 className="about__name">
                <img
                  src="/images/branding/logo-mark-trimmed.png"
                  alt=""
                  width="20"
                  height="20"
                  className="about__name-logo"
                />
                {site.fullName}
              </h2>

              <dl className="about__facts">
                {facts.map((fact, i) => (
                  <div className="about__fact" key={fact.label} style={{ '--i': i }}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
