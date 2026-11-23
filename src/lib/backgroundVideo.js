/**
 * Muted loop playback for the below-the-fold background videos (about,
 * shortlist). Nothing is requested until the section is actually on screen
 * (the About page sits exactly at the fold, so no look-ahead margin): the two
 * clips are ~13 MB, and starting them at page load put them in the same
 * network queue as the hero and its headline, the page's largest paint, on
 * every phone. The hero runs its own playback in Hero.jsx.
 */
export function useBackgroundVideo(rootRef, videoRef, introDonePromise) {
  const video = videoRef.current;
  const root = rootRef.current;
  if (!video) return () => {};

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  let visible = false;

  const playVideo = () => {
    video.muted = true;
    const promise = video.play();
    if (promise !== undefined) promise.catch(() => {});
  };
  const syncPlayback = () => {
    if (visible && !document.hidden) playVideo();
    else video.pause();
  };

  introDonePromise?.then?.(syncPlayback);

  const userEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
  const onFirstUserInteraction = () => {
    syncPlayback();
    userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction, { passive: true }));
  };
  userEvents.forEach((evt) => window.addEventListener(evt, onFirstUserInteraction, { passive: true }));

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  }, { threshold: 0.01 });
  if (root) observer.observe(root);

  document.addEventListener('visibilitychange', syncPlayback);
  const onEnded = () => { video.currentTime = 0; syncPlayback(); };
  video.addEventListener('ended', onEnded);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', syncPlayback);
    video.removeEventListener('ended', onEnded);
    userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction));
    video.pause();
  };
}
