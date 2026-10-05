import { useEffect, useRef } from 'react';
import { site } from '../data/site';
import Pill from '../components/Pill';
import { introDone } from '../lib/intro';
import './Hero.css';

export default function Hero() {
  const root = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    let visible = true;
    const playVideo = () => {
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) promise.catch(() => {});
    };
    const syncPlayback = () => {
      if (visible && !document.hidden) playVideo();
      else video.pause();
    };
    playVideo();
    introDone.then(playVideo);
    const userEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
    const onFirstUserInteraction = () => {
      playVideo();
      userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction, { passive: true }));
    };
    userEvents.forEach((evt) => window.addEventListener(evt, onFirstUserInteraction, { passive: true }));
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.05 });
    if (root.current) observer.observe(root.current);
    document.addEventListener('visibilitychange', syncPlayback);
    const onEnded = () => { video.currentTime = 0; playVideo(); };
    video.addEventListener('ended', onEnded);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.removeEventListener('ended', onEnded);
      userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction));
      video.pause();
    };
  }, []);

  return (
    <section className="banner on-dark" id="top" ref={root} aria-labelledby="hero-title">
      <div className="banner__stage" aria-hidden="true">
        <video ref={videoRef} className="banner__video" autoPlay muted loop playsInline preload="metadata" poster="/videos/main-bg-poster.jpg" tabIndex={-1}>
          <source src="/videos/main-bg-video.mp4" type="video/mp4" />
        </video>
        <div className="banner__atmos" />
      </div>

      <header className="banner__bar">
        <a className="banner__brand" href="#top" aria-label={site.fullName}>
          <img src="/images/branding/logo-mark-trimmed.png" alt="" width="36" height="36" />
          <span className="banner__brand-name">{site.name}</span>
        </a>
        <div className="banner__bar-actions">
          <Pill href={`tel:${site.phoneIntl}`} tone="white" size="sm" className="banner__bar-pill">
            Call {site.phoneDisplay}
          </Pill>
          <Pill href="/projects.html" tone="ghost" size="sm" className="banner__bar-pill">
            View Projects
          </Pill>
        </div>
      </header>

      <div className="banner__center">
        <h1 className="banner__title" id="hero-title">
          The best real estate agent in Panvel, Navi Mumbai
        </h1>
        <p className="banner__rating">
          <span className="banner__stars" aria-hidden="true">★★★★★</span>
          <span className="banner__rating-text">
            {site.google.rating} on Google · {site.google.reviews} reviews
          </span>
          <span className="sr-only">
            Rated {site.google.rating} out of 5 on Google, {site.google.reviews} reviews
          </span>
        </p>
      </div>

      <a className="banner__scroll mono-sm" href="#about" aria-label="Scroll to about">
        <span className="banner__scroll-line" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
